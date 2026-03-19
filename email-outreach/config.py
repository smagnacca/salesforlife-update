# ============================================================
# config.py — Edit these values before running
# ============================================================

# SendGrid API Key (get from sendgrid.com → Settings → API Keys)
SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY"

# Your email address (replies go here)
FROM_EMAIL = "you@gmail.com"
FROM_NAME  = "Your Name"

# Google Sheets
SPREADSHEET_ID      = "YOUR_GOOGLE_SHEET_ID"   # from the sheet URL
CONTACTS_SHEET      = "Contacts"                # sheet tab with your 20k list
LOG_SHEET           = "Sent Log"                # sheet tab for tracking

# Excel file to import contacts from (one-time import step)
CONTACTS_EXCEL_FILE = "contacts.xlsx"

# How many emails to send per day
DAILY_LIMIT = 50

# Your unsubscribe / physical address (CAN-SPAM required)
UNSUBSCRIBE_URL  = "https://yourwebsite.com/unsubscribe"
PHYSICAL_ADDRESS = "Your Company, 123 Main St, City, State, ZIP"
