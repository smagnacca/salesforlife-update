# CHANGELOG — salesforlife-update

All changes to this site are logged here, newest first.

---

## v1.1.0 — Netlify Lead Capture Wired to quiz.html (2026-03-21)
**What changed:** Added hidden Netlify form (`sfl-quiz-leads`) to `quiz.html`. Added inline `postToNetlify()`, `handleContactSubmit()`, and `submitPopupForm()` functions to `quiz.html` — the previously referenced `main.js` did not exist in this repo, leaving those forms broken. All capture points in quiz.html now POST to Netlify Forms → Google Sheets. Note: `index.html` bottom-contact form was already correctly wired with `data-netlify="true"` and the `netlify/functions/submission-created.js` Google Sheets forwarder was already in place.
**Why:** quiz.html popup and contact forms were broken (missing main.js) and unconnected to any backend. Leads were going nowhere.
**Files changed:** quiz.html, CHANGELOG.md
**Git commit:** `Add Netlify lead capture to quiz.html contact form and popups (2026-03-21)` | hash: `c8e5914`
**Status:** ✅ Deployed (requires Netlify site to be unpaused)

---
