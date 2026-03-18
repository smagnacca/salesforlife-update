# Claude Code Instructions

## Manual Intervention Rule

Only ask the user to do something manually when it is **absolutely impossible** to do it any other way (e.g. browser-only GitHub actions like merging a PR).

When manual action IS required, always provide:
1. The **exact URL** to go to — no guessing, no navigation steps
2. **Simple, plain-English instructions** — no jargon, no technical terms
3. Keep it to the fewest possible steps

Example format:
> Go to this URL: `https://github.com/smagnacca/salesforlife-update/compare/main...claude/BRANCH-NAME`
> Click **"Create pull request"** → Click **"Create pull request"** again → Click **"Merge pull request"** → Click **"Confirm merge"**

## Repository
- Owner: smagnacca
- Repo: salesforlife-update
- Work branch prefix: `claude/`
- Deploy branch: `main`
- Proxy blocks direct pushes to `main` — always push to `claude/` branch, then PR to main
