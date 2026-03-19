"""
import_contacts.py
-----------------
ONE-TIME STEP: Reads your Excel contact list and uploads it to Google Sheets.

Required Excel columns (case-insensitive):
  first_name, last_name, email, job_title, company

Run once:  python import_contacts.py
"""

import pandas as pd
import gspread
from google.oauth2.service_account import Credentials
from config import SPREADSHEET_ID, CONTACTS_SHEET, CONTACTS_EXCEL_FILE

SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


def main():
    print(f"Reading {CONTACTS_EXCEL_FILE}...")
    df = pd.read_excel(CONTACTS_EXCEL_FILE)
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    required = {"first_name", "last_name", "email", "job_title", "company"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Excel file is missing columns: {missing}")

    df = df[list(required)].dropna(subset=["email"])
    df["status"] = "pending"
    df["sent_date"] = ""
    df["opened"] = ""
    df["clicked"] = ""
    df["replied"] = ""

    creds = Credentials.from_service_account_file("credentials.json", scopes=SCOPES)
    gc    = gspread.authorize(creds)
    sheet = gc.open_by_key(SPREADSHEET_ID).worksheet(CONTACTS_SHEET)

    sheet.clear()
    sheet.update([df.columns.tolist()] + df.values.tolist())
    print(f"Uploaded {len(df)} contacts to Google Sheets tab '{CONTACTS_SHEET}'.")


if __name__ == "__main__":
    main()
