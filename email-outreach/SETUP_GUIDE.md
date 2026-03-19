# Email Outreach System — Setup Guide

## What You Are Doing
Building an automated cold email system that sends 50 personalised emails per
day to sales and marketing professionals, tracks who opens and clicks, and logs
everything to a Google Sheet — all at zero ongoing cost.

## Why You Are Doing It
To generate a steady pipeline of sales training leads through direct email
outreach. By targeting 20,000 people in sales, marketing, and adjacent roles
and reaching out consistently (50/day), you create a repeatable, low-cost lead
generation engine that surfaces interested prospects without manual effort.

---

## Exact Steps to Make It Functional

### STEP 1 — Get Your 20,000 Contacts ($49, one time)
1. Go to **apollo.io** and sign up for the Basic plan ($49/mo)
2. Filter by: Job Title = "Sales", "Account Executive", "BDR", "SDR",
   "Marketing Manager", "VP Sales", "Director of Marketing"
3. Export all results as a CSV/Excel file
4. Cancel Apollo after the export (you won't need it again)
5. Make sure your Excel file has these column headers exactly:
   `first_name`, `last_name`, `email`, `job_title`, `company`

---

### STEP 2 — Create a Free SendGrid Account
1. Go to **sendgrid.com** → Sign Up (free = 100 emails/day)
2. Settings → API Keys → Create API Key → Full Access
3. Copy the key — you only see it once
4. Go to Settings → Tracking → enable **Open Tracking** and **Click Tracking**

---

### STEP 3 — Set Up Google Sheets
1. Create a new Google Sheet
2. Add two tabs: name them **Contacts** and **Sent Log**
3. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit`

---

### STEP 4 — Connect Google Sheets API
1. Go to **console.cloud.google.com**
2. Create a new project → Enable "Google Sheets API"
3. Go to Credentials → Create Credentials → Service Account
4. Download the JSON key file → rename it **credentials.json**
5. Put credentials.json in the same folder as these scripts
6. In your Google Sheet → Share → paste the service account email → Editor

---

### STEP 5 — Configure the System
Open **config.py** and fill in:
- `SENDGRID_API_KEY` — from Step 2
- `FROM_EMAIL` — your Gmail address
- `FROM_NAME` — your name
- `SPREADSHEET_ID` — from Step 3
- `UNSUBSCRIBE_URL` — a page on your website (required by law)
- `PHYSICAL_ADDRESS` — your business address (required by law)

---

### STEP 6 — Install and Run (One Time)
Open Terminal in the email-outreach folder and run:

```bash
pip install -r requirements.txt
python import_contacts.py
```

This uploads all 20,000 contacts to your Google Sheet.

---

### STEP 7 — Send Emails Daily
Run this every morning (or set up a cron job to run it automatically at 9 AM):

```bash
python send_emails.py        # sends 50 emails
python update_tracking.py    # updates opens/clicks in sheet
```

**Cron job (automatic daily at 9 AM):**
```
0 9 * * * python3 /path/to/email-outreach/send_emails.py
5 9 * * * python3 /path/to/email-outreach/update_tracking.py
```

---

## What You Will See in Google Sheets

| Column | What It Means |
|--------|--------------|
| status | pending / sent |
| sent_date | date email was sent |
| opened | "yes" if they opened it |
| clicked | "yes" if they clicked a link |
| replied | "bounced" if email was invalid |

---

## Timeline & Expected Results

| Metric | Number |
|--------|--------|
| Contacts | 20,000 |
| Emails/day | 50 |
| Months to reach everyone | ~13 months |
| Typical cold email open rate | 20–40% |
| Typical reply/interest rate | 1–5% |
| Estimated warm leads generated | 200–1,000 |

---

## Files in This Folder

| File | Purpose |
|------|---------|
| config.py | Your API keys and settings |
| import_contacts.py | One-time Excel → Google Sheets upload |
| send_emails.py | Sends 50 emails per day |
| update_tracking.py | Updates open/click data in sheet |
| email_template.html | The email people receive (edit freely) |
| requirements.txt | Python packages to install |
| credentials.json | (You add this) Google API key file |
