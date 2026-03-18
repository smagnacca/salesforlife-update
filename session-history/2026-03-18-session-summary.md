# Session Summary — March 18, 2026

## Project
**salesforlife-update** — `github.com/smagnacca/salesforlife-update`

---

## What Was Accomplished

### 1. Flywheel Graphic Redesign (`index.html` + `flywheel-animated.html`)
- **Removed** all 3 gold connector arrows between sections
- **Replaced lightbulb** with a pulsing star pinpoint: bright white core dot + 8 colored rays (gold, orange, blue, purple, violet, white) that shoot outward and fade in a 2s loop
- **Covered "STORY" text** on the book section with a dark fill polygon over the PNG layer
- **Replaced 3 blue momentum arrows** with a single clockwise arc that builds over 3 seconds using stroke-dashoffset animation, arrowhead appears at completion, then resets and repeats
- Added `fwBlueGlow` / `blueGlow` SVG filters to both files for the momentum arc

### 2. Instructor Section (`index.html`)
- **Removed** duplicate small avatar photo (instructor-avatar-sm) next to "Meet Your Instructor" badge
- **HARVARD** → red, bold, pulsing red/crimson text-shadow glow animation
- **Babson MBA** → bold, pulsing vivid green-to-white glow animation
- **Bio card photos** → `object-position: 50% 15%` so tops of heads are fully visible in circular crop

### 3. Bullet Points (`styles.css`)
- Replaced `?` markers with solid blue circle dots (7px, with blue glow)
- Added staggered fade-in animation: each list item slides in one by one (0.3s, 0.7s, 1.1s, 1.5s delays)

### 4. Global Memory Files Created
- **`/home/user/CLAUDE.md`** — Global instructions for all projects:
  - Manual intervention rule: only ask user when absolutely necessary, always provide exact URL + plain-English steps
  - Usage estimation rule: estimate daily/weekly usage at start of every project
  - Model selection rule: Haiku → simple tasks, Sonnet → most work, Opus → only deep reasoning
- **`/home/user/salesforlife-update/CLAUDE.md`** — Repo-specific context (branch prefix, deploy branch, proxy restrictions)

---

## Key Technical Details
- **Deploy branch:** `main`
- **Work branch:** `claude/fix-page-top-alignment-BOwtz`
- **Proxy restriction:** Cannot push directly to `main` — must use `claude/` branch + GitHub PR
- **PR merge URL pattern:** `https://github.com/smagnacca/salesforlife-update/compare/main...claude/BRANCH-NAME`
- SVG viewBox: 630×630
- Star pinpoint center: (202, 313)
- Momentum arc: center (500, 415), r=62, 300° clockwise arc, 3s build cycle
- Book polygon cover points: `365,48 500,25 568,90 545,192 415,210 348,138`

---

## Commits This Session
- `615bc07` — Redesign flywheel graphic and update instructor section UI
- `c847a02` — Same (rebased on main)
- `3616d4b` — Add CLAUDE.md with manual intervention and repo instructions

---

## Pending / Notes
- User merged all PRs successfully into main
- Site is live and reflecting all changes
- No open PRs or pending work at end of session
