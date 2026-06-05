# VisaSync — Design Instructions for Coding Assistant
> App purpose: Automates visa registration & monitors evisatraveller.mfa.ir availability.
> Stack: React · Tailwind (or CSS-in-JS) · RTL Persian + LTR English bilingual support

---

## 0. Design Tokens (Use Everywhere)

```css
:root {
  /* Brand */
  --teal:        #00B8C8;
  --teal-dark:   #007A8A;
  --teal-mid:    #00979F;
  --teal-light:  #E0F7FA;
  --teal-glass:  rgba(0, 184, 200, 0.12);

  /* Text */
  --text-dark:   #0D3B42;
  --text-mid:    #1A6370;
  --text-muted:  #6B9EA6;

  /* Feedback */
  --success:     #22C55E;
  --error:       #EF4444;
  --warning:     #F59E0B;
  --info:        #3B82F6;

  /* Surface */
  --white:       #FFFFFF;
  --off-white:   #F5FEFF;
  --border:      rgba(0, 184, 200, 0.2);
  --border-strong: rgba(0, 184, 200, 0.45);

  /* Typography */
  --font-display: 'Sora', sans-serif;      /* headings */
  --font-body:    'DM Sans', sans-serif;   /* body / UI */
  --font-persian: 'Vazirmatn', sans-serif; /* all Persian text */

  /* Radii */
  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  20px;
  --radius-xl:  28px;

  /* Shadows */
  --shadow-sm:  0 2px 8px rgba(0, 120, 140, 0.08);
  --shadow-md:  0 6px 24px rgba(0, 120, 140, 0.12);
  --shadow-lg:  0 16px 48px rgba(0, 120, 140, 0.16);
  --shadow-teal: 0 8px 24px rgba(0, 184, 200, 0.35);
}
```

**Fonts to import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap" rel="stylesheet">
```

---

## 1. Global UI Rules

### Buttons
```
Primary:   bg gradient(teal → teal-dark), white text, radius-md, shadow-teal
           hover → translateY(-1px), stronger shadow
           active → translateY(0)

Secondary: bg white, border 1.5px var(--teal), teal-dark text, radius-md
           hover → bg teal-light

Danger:    bg #FEE2E2, border #EF4444, text #B91C1C
Ghost:     no border, no bg, teal text, hover → teal-glass bg

Disabled:  opacity 0.45, cursor not-allowed, no hover effects
```

### Input Fields  ← FIX CURRENT FORM
```
Default:
  background: white
  border: 1.5px solid var(--border)
  border-radius: var(--radius-md)
  padding: 12px 16px
  font-size: 0.95rem
  color: var(--text-dark)
  transition: border 0.2s, box-shadow 0.2s

Focus:
  border-color: var(--teal)
  box-shadow: 0 0 0 3px rgba(0, 184, 200, 0.15)
  outline: none

Error:
  border-color: var(--error)
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12)

Success/Valid:
  border-color: var(--success)

Disabled:
  background: #F1F5F5
  color: var(--text-muted)
  cursor: not-allowed
```

### Labels
```
font-size: 0.85rem
font-weight: 600
color: var(--text-dark)
margin-bottom: 6px
Required asterisk: color var(--error), margin-left 3px
```

### Error Messages (below each field)
```
font-size: 0.78rem
color: var(--error)
margin-top: 5px
display: flex, align-items: center, gap: 4px
icon: ⚠ or × before text
```

### Cards
```
background: white
border: 1px solid var(--border)
border-radius: var(--radius-lg)
box-shadow: var(--shadow-sm)
padding: 24px
hover (interactive cards): translateY(-3px), shadow-md, border-color var(--teal)
transition: all 0.22s ease
```

### RTL / Persian Text
```
All Persian text: font-family var(--font-persian), direction rtl, text-align right
All English text: font-family var(--font-body), direction ltr
Bilingual wrapper pattern:
  <div dir="rtl" lang="fa"> ... </div>   ← form pages
  <div dir="ltr" lang="en"> ... </div>   ← dashboard pages
```

### Spacing System
```
4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px · 80px
Between form fields: 20px gap
Between sections: 48–64px
Card internal padding: 24–28px
Page horizontal padding: 24px (mobile) → 40px (tablet) → max-width 1100px centered (desktop)
```

---

## 2. Fix: Multi-Step Visa Application Form

### 2a. Step Progress Indicator (ADD AT TOP — currently missing)

Replace the subtle "گام اول" text with a proper stepper component at the **top** of every form page:

```
Design:
- Horizontal stepper with 5 steps (see steps list below)
- Each step: circle (40×40px) with step number or ✓ icon
- Active step: filled gradient circle (teal → teal-dark), white number, label below in bold
- Completed step: solid teal circle, white checkmark ✓
- Upcoming step: white circle, border 2px var(--border), muted number
- Connector line between circles: 2px, dashed for upcoming, solid teal for completed
- Step labels: Persian below circle, 0.75rem, var(--text-mid)
- Entire stepper: white card, border-bottom 1px var(--border), sticky top 68px (below nav)
- Mobile: show only current step name + "Step X of 5", hide circles

Steps:
  1. اطلاعات شخصی       (Personal Info)
  2. اطلاعات گذرنامه    (Passport Details)
  3. اطلاعات سفر        (Travel Details)
  4. آپلود مدارک         (Document Upload)
  5. بررسی و ارسال       (Review & Submit)
```

### 2b. Form Field Fixes

```
1. Increase vertical gap between fields from ~8px → 20px
2. Add proper focus ring (see Input Fields spec above)
3. Add floating label OR persistent label above input (not placeholder-only)
4. All field borders must be visible at rest — not just on focus
5. Field height: min 48px for touch targets
6. Date of birth: use 3 separate dropdowns (Day / Month / Year) or a Persian calendar picker,
   not a plain text input with placeholder "تاریخ تولد"
7. Marital status (وضعیت تاهل): styled radio button group, NOT a text input
   Options: مجرد · متأهل · بیوه · مطلقه  (with icons ideally)
8. Nationality / Previous Nationality: searchable dropdown with flag emoji prefix
9. Occupation (شغل): dropdown with common categories, not free text
```

### 2c. Photo Upload — Replace Current Button

```
Remove: plain button + "عکس اپلود نشده" grey text pattern

Replace with dashed upload zone:
  - Dashed border: 2px dashed var(--teal), border-radius var(--radius-lg)
  - Background: var(--teal-glass)
  - Center content: camera icon (large, teal), Persian label "عکس پرسنلی", sub-label requirements
  - Drag-over state: bg teal-light, border solid, scale(1.01)
  - After upload: show thumbnail preview (square, rounded), overlay with ✕ remove button
  - Below zone: show requirements in small text (max 2MB · JPG/PNG · white background · 3×4cm)
  - Error state: red dashed border + error message if wrong format/size
```

### 2d. Instruction Block (Bottom of Form)

```
Current issues: text too small, too dense, no visual hierarchy

Fix:
  - Wrap in white card (not teal background — reduces contrast on mobile)
  - Section title: bold, teal icon prefix (📋 or ℹ)
  - Each bullet: min font-size 13px, line-height 1.85
  - Add colored left border accent (3px solid var(--teal)) on card
  - Separate into 2 groups: "مدارک مورد نیاز" (Required Docs) and "نکات مهم" (Important Notes)
  - Important/warning items: amber background chip instead of plain bullet
```

### 2e. Form Footer Navigation

```
Add sticky bottom bar on mobile:
  - Back button (ghost, left side)
  - Step indicator text center: "مرحله ۲ از ۵"
  - Next/Submit button (primary, right side)
  - Height: 72px, bg white, border-top 1px var(--border), safe-area padding

Desktop: buttons inline at bottom of form, right-aligned
```

### 2f. Success State (after submit)

```
Full-page success screen:
  - Large animated checkmark (SVG, teal, stroke animation)
  - Heading: "درخواست شما ثبت شد" (Application Submitted)
  - Application reference number in monospace, teal chip background
  - Timeline: what happens next (3 steps: Under Review → Decision → Notification)
  - Two buttons: "مشاهده داشبورد" (Go to Dashboard) · "ارسال درخواست جدید" (New Application)
```

---

## 3. New Pages to Build

---

### PAGE 1: Dashboard (Home after login)

**Route:** `/dashboard`

```
Layout: sidebar (desktop) or bottom tab bar (mobile)

Top section — Status Summary Cards (3 cards in a row):
  Card 1: Site Status
    - Large dot indicator (green=online / red=offline / yellow=degraded)
    - "evisatraveller.mfa.ir" label
    - Last checked timestamp
    - Uptime % this week
  Card 2: Active Applications
    - Count number (large, bold)
    - Breakdown: X pending · X approved · X rejected
    - Quick link → Applications page
  Card 3: Monitor Status
    - Toggle on/off
    - "Monitoring active" or "Paused"
    - Next check countdown

Middle section — Recent Activity Feed:
  - Chronological list of events
  - Each item: icon · event description · timestamp
  - Icons: 🟢 site online, 🔴 site offline, 📋 form submitted, ✅ approved, 🔔 slot detected
  - Max 10 items, "View all" link

Bottom section — Quick Actions:
  - "Start New Application" button
  - "Update My Profile" button  
  - "Configure Notifications" button
```

---

### PAGE 2: Application Tracker

**Route:** `/applications`

```
Header: "درخواست‌های من" + "New Application" button top right

Filter tabs: All · Pending · Approved · Rejected · Draft

Application list — each row is a card:
  - Flag icon + visa type
  - Application reference number (monospace)
  - Submission date
  - Status chip:
      Pending:  amber bg, "در حال بررسی"
      Approved: green bg, "تأیید شده" + expiry date
      Rejected: red bg, "رد شده" + reason tooltip
      Draft:    grey bg, "پیش‌نویس" + "Continue" button
  - Chevron → expand for details

Expanded detail view (accordion or drawer):
  - All submitted field values
  - Timeline of status changes
  - Attached documents (thumbnail previews)
  - "Download Confirmation PDF" button if approved
  - "Reapply" button if rejected

Empty state:
  - Illustration (passport + plane)
  - "هنوز درخواستی ثبت نکرده‌اید"
  - "شروع درخواست جدید" CTA button
```

---

### PAGE 3: Site Monitor

**Route:** `/monitor`

```
Hero status banner:
  - Full-width, color changes with status:
      Online:  teal gradient bg
      Offline: dark red bg
      Unknown: grey bg
  - Large status text + icon + last-checked time
  - "Check Now" button (manual ping)

Availability Chart:
  - 7-day bar chart (one bar per day)
  - Bar height = uptime % that day
  - Color: green ≥ 95% · amber 70–95% · red < 70%
  - Hover tooltip: exact uptime %, downtime duration
  - Toggle: 7d / 30d / 90d

Incident Log table:
  Columns: Date · Down At · Restored At · Duration · Cause
  Color-coded rows, paginated, exportable to CSV

Monitor Settings card:
  - Check interval: dropdown (Every 10s / 30s / 1min / 5min)
  - Notify on: checkboxes (Site down · Site restored · Slot detected)
  - Notification channels: Email / Push / SMS toggles
```

---

### PAGE 4: Profile & Data Vault

**Route:** `/profile`

```
Two-column layout:
  Left col: Personal info form (pre-filled, used to auto-submit applications)
  Right col: Saved documents + security settings

Personal Info sections (accordion):
  1. اطلاعات هویتی (Identity)
     - Full name (Latin + Persian)
     - Date of birth
     - Place of birth  
     - Nationality / Previous nationality
     - Marital status
     - Occupation

  2. اطلاعات گذرنامه (Passport)
     - Passport number
     - Issue date / Expiry date (with warning if < 6 months remaining)
     - Issuing country
     - Scan upload (front page)

  3. تصاویر و مدارک (Photos & Docs)
     - Personal photo (with standards checklist overlay)
     - Passport first page scan
     - Any supporting documents
     - Each file: thumbnail · file name · size · upload date · ✕ delete

  4. اطلاعات تماس (Contact)
     - Email (verified badge)
     - Phone number
     - Notification preferences

Security section:
  - Change password
  - Two-factor authentication toggle
  - Active sessions list
  - "Delete all my data" danger zone (red, confirmation required)
```

---

### PAGE 5: Notifications Center

**Route:** `/notifications`

```
Header: unread count badge

Filter: All · Unread · Alerts · System

Notification card anatomy:
  - Icon (emoji or svg) matching type
  - Bold title
  - Description
  - Timestamp (relative: "2 minutes ago")
  - Unread indicator: teal left border + slightly tinted bg
  - Read state: no border, white bg

Notification types & icons:
  🔴 Site Offline        — red icon, urgent tone
  🟢 Site Online         — green icon
  ⭐ Slot Detected       — gold icon, most prominent styling
  ✅ Application Approved — green, celebratory
  ❌ Application Rejected — red, shows reason
  📋 Application Submitted — teal
  ⚠️ Passport Expiring   — amber, shows days remaining
  🔧 System Update       — grey, low priority

Notification Settings (sub-page or modal):
  Toggle table:
    Type            | In-App | Email | Push
    Site goes down  |  ✓    |  ✓   |  ✓
    Slot detected   |  ✓    |  ✓   |  ✓
    App approved    |  ✓    |  ✓   |  -
    ...etc
  
  Quiet hours: time range picker (e.g. 11pm–7am)
```

---

### PAGE 6: Auth Pages (Sign In / Sign Up)

**Route:** `/signin` `/signup`

```
Layout:
  - Split screen: left = decorative teal panel, right = form
  - Mobile: form only, logo at top

Left decorative panel:
  - Deep teal/dark gradient bg
  - App logo + name large
  - 3 feature bullets with icons
  - Subtle geometric pattern or animated mesh

Sign In form:
  - Email input
  - Password input (show/hide toggle)
  - "Forgot password?" link (right-aligned, small)
  - Sign In button (full width, primary)
  - Divider "or"
  - Google sign in (optional)
  - Footer: "Don't have an account? Sign Up"

Sign Up form:
  - Full name
  - Email
  - Password (with strength meter bar below)
    Strength: Weak (red) · Fair (amber) · Strong (green) · Very Strong (teal)
  - Confirm password
  - Terms checkbox
  - Sign Up button
  - Footer: "Already have an account? Sign In"

Forgot Password flow:
  Step 1: Email input → "Send Reset Link"
  Step 2: "Check your email" confirmation screen with email illustration
  Step 3: New password form (from reset link)
```

---

### PAGE 7: Settings

**Route:** `/settings`

```
Sidebar navigation within settings:
  - Account
  - Notifications (links to /notifications/settings)
  - Monitor Config
  - Appearance
  - Danger Zone

Monitor Config section:
  - Target URL (pre-filled: evisatraveller.mfa.ir, editable)
  - Check interval slider: 10s – 5min
  - Auto-submit toggle (ON = submit automatically when slot found)
  - Auto-submit confirmation: "Require my approval first" sub-toggle
  - Retry attempts: number input (default 3)
  - Retry delay: dropdown

Appearance section:
  - Language toggle: فارسی / English
  - Theme: Light / Dark / System (dark mode support recommended)
  - Compact mode toggle (tighter spacing for power users)

Danger Zone:
  - Red-bordered card
  - "Pause all monitoring" button
  - "Clear application history" button
  - "Delete account" button
  - Each requires a confirmation modal with typed confirmation
```

---

## 4. Navigation Structure

### Desktop Sidebar (collapsed to icons at < 1280px)
```
Logo + app name
─────────────
🏠  Dashboard
📋  Applications
📡  Monitor
👤  Profile
🔔  Notifications   [unread badge]
⚙️  Settings
─────────────
[User avatar + name]
[Sign Out]
```

### Mobile Bottom Tab Bar
```
🏠 Home  |  📋 Apps  |  📡 Monitor  |  🔔 Alerts  |  👤 Profile
```

### Top Nav Bar (all pages)
```
Left:  hamburger (mobile) or nothing (desktop)
Center: page title
Right: notification bell [badge] + avatar dropdown
```

---

## 5. Micro-interactions & Animation Rules

```
Page transitions:     fade + slight upward slide (200ms ease-out)
Card hover:           translateY(-3px) + shadow increase (220ms ease)
Button click:         scale(0.97) for 100ms then release
Input focus:          border color + glow ring (150ms ease)
Status indicator dot: CSS pulse keyframe animation, infinite
Loading spinner:      circular, teal, 1.2s linear infinite rotation
Success checkmark:    SVG stroke-dashoffset animation, 600ms ease
Toast notifications:  slide in from top-right, auto-dismiss 4s, slide out
Skeleton loaders:     shimmer animation on grey rectangles while data loads
Number counters:      count-up animation when stat first appears in viewport
```

---

## 6. Empty & Error States (for every data list)

```
Empty state pattern:
  - Centered illustration (SVG, max 160px wide, teal tones)
  - Heading: clear, friendly, Persian + English
  - Sub-text: what the user should do next
  - CTA button

Error state pattern:
  - Warning icon (amber)
  - "Something went wrong" heading
  - Error detail in small text
  - "Try again" button + "Contact support" link

Loading state:
  - Skeleton cards (exact same layout as loaded content, shimmer effect)
  - Never show spinner alone for more than 1 second without skeleton
```

---

## 7. Responsive Breakpoints

```
Mobile:   < 640px   — single column, bottom tabs, compact cards
Tablet:   640–1024px — 2-col grids, sidebar hidden (drawer)
Desktop:  > 1024px  — full sidebar, 3-col grids, expanded tables
```

---

## 8. Implementation Priority Order

```
1. 🔴 Fix multi-step form (Section 2 above) — existing, broken UX
2. 🔴 Auth pages (Sign In / Sign Up) — needed to access anything
3. 🔴 Dashboard — first thing users see after login
4. 🟡 Application Tracker — core feature
5. 🟡 Profile / Data Vault — needed for auto-submit
6. 🟡 Site Monitor page — core feature
7. 🟢 Notifications Center — enhances experience
8. 🟢 Settings page — polish
```
