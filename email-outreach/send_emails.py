"""
send_emails.py
--------------
Sends up to DAILY_LIMIT emails per day from your Google Sheets contact list.
Logs every send, open, and click back to Google Sheets via SendGrid webhooks.

Run daily (manually or via cron):  python send_emails.py

Cron example (runs every day at 9 AM):
  0 9 * * * /usr/bin/python3 /path/to/send_emails.py
"""

import gspread
import sendgrid
from sendgrid.helpers.mail import Mail, To, From, HtmlContent, TrackingSettings, ClickTracking, OpenTracking
from google.oauth2.service_account import Credentials
from datetime import date
from config import (
    SENDGRID_API_KEY, FROM_EMAIL, FROM_NAME,
    SPREADSHEET_ID, CONTACTS_SHEET, LOG_SHEET,
    DAILY_LIMIT, UNSUBSCRIBE_URL, PHYSICAL_ADDRESS
)

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

EMAIL_SUBJECT = "Quick question about sales training for your team"


def load_template():
    with open("email_template.html", "r") as f:
        return f.read()


def personalise(template, row, sender_name, sender_email):
    return (
        template
        .replace("{{first_name}}",      str(row.get("first_name", "there")))
        .replace("{{job_title}}",        str(row.get("job_title", "your role")))
        .replace("{{company}}",          str(row.get("company", "your company")))
        .replace("{{sender_name}}",      sender_name)
        .replace("{{sender_email}}",     sender_email)
        .replace("{{unsubscribe_url}}", UNSUBSCRIBE_URL)
        .replace("{{physical_address}}", PHYSICAL_ADDRESS)
    )


def get_sheet(gc, tab_name):
    return gc.open_by_key(SPREADSHEET_ID).worksheet(tab_name)


def main():
    creds  = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
    gc     = gspread.authorize(creds)
    sheet  = get_sheet(gc, CONTACTS_SHEET)
    log    = get_sheet(gc, LOG_SHEET)
    sg     = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)

    records  = sheet.get_all_records()
    headers  = sheet.row_values(1)
    template = load_template()

    today     = str(date.today())
    sent      = 0
    skipped   = 0
    errors    = 0

    # Ensure log sheet has headers
    if not log.row_values(1):
        log.append_row(["date", "email", "first_name", "company", "status"])

    for i, row in enumerate(records, start=2):   # row 1 = header
        if sent >= DAILY_LIMIT:
            break
        if str(row.get("status", "")).strip().lower() != "pending":
            skipped += 1
            continue

        email = str(row.get("email", "")).strip()
        if not email or "@" not in email:
            skipped += 1
            continue

        html_body = personalise(template, row, FROM_NAME, FROM_EMAIL)

        message = Mail(
            from_email=From(FROM_EMAIL, FROM_NAME),
            to_emails=To(email),
            subject=EMAIL_SUBJECT,
            html_content=HtmlContent(html_body),
        )

        # Enable SendGrid open + click tracking
        tracking = TrackingSettings()
        tracking.click_tracking  = ClickTracking(enable=True, enable_text=False)
        tracking.open_tracking   = OpenTracking(enable=True)
        message.tracking_settings = tracking

        try:
            response = sg.send(message)
            if response.status_code in (200, 202):
                # Mark contact as sent in Contacts sheet
                status_col = headers.index("status") + 1
                date_col   = headers.index("sent_date") + 1
                sheet.update_cell(i, status_col, "sent")
                sheet.update_cell(i, date_col,   today)

                # Append row to Sent Log
                log.append_row([today, email, row.get("first_name", ""), row.get("company", ""), "sent"])
                sent += 1
                print(f"  Sent {sent}/{DAILY_LIMIT} → {email}")
            else:
                print(f"  WARNING: unexpected status {response.status_code} for {email}")
                errors += 1
        except Exception as e:
            print(f"  ERROR sending to {email}: {e}")
            errors += 1

    print(f"\nDone. Sent: {sent}  |  Skipped: {skipped}  |  Errors: {errors}")


if __name__ == "__main__":
    main()
