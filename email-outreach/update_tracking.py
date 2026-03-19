"""
update_tracking.py
------------------
Pulls open/click/reply events from SendGrid and updates your Google Sheet.

Run daily AFTER send_emails.py:  python update_tracking.py

SendGrid stores 30 days of event data. Run this script each day to keep
your sheet up to date.
"""

import gspread
import sendgrid
from sendgrid import SendGridAPIClient
from google.oauth2.service_account import Credentials
from config import SENDGRID_API_KEY, SPREADSHEET_ID, CONTACTS_SHEET

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


def main():
    creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
    gc    = gspread.authorize(creds)
    sheet = gc.open_by_key(SPREADSHEET_ID).worksheet(CONTACTS_SHEET)
    sg    = SendGridAPIClient(api_key=SENDGRID_API_KEY)

    records = sheet.get_all_records()
    headers = sheet.row_values(1)

    opened_col  = headers.index("opened")  + 1
    clicked_col = headers.index("clicked") + 1
    replied_col = headers.index("replied") + 1

    # Fetch suppression/bounce lists to mark bad emails
    bounces = {b["email"] for b in sg.client.suppression.bounces.get().to_dict.get("result", [])}
    print(f"Found {len(bounces)} bounced addresses in SendGrid.")

    # Fetch open events (last 1000)
    try:
        opens_resp = sg.client.messages.get(query_params={"limit": 1000})
        messages   = opens_resp.to_dict().get("messages", [])
    except Exception:
        messages = []

    opens   = {m["to_email"] for m in messages if "open" in m.get("status", "").lower()}
    clicks  = {m["to_email"] for m in messages if "click" in m.get("status", "").lower()}

    updated = 0
    for i, row in enumerate(records, start=2):
        email = str(row.get("email", "")).strip().lower()
        changed = False

        if email in opens and not row.get("opened"):
            sheet.update_cell(i, opened_col, "yes")
            changed = True
        if email in clicks and not row.get("clicked"):
            sheet.update_cell(i, clicked_col, "yes")
            changed = True
        if email in bounces and not row.get("replied"):
            sheet.update_cell(i, replied_col, "bounced")
            changed = True

        if changed:
            updated += 1

    print(f"Updated tracking data for {updated} contacts.")


if __name__ == "__main__":
    main()
