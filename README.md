# VisaSync

A React-based frontend for improving visa application workflows and portal monitoring around the `evisatraveller.mfa.ir` experience.

VisaSync provides a polished dashboard, authentication, application tracker, monitoring page, and a guided application form using a modern React + Tailwind UI.

## Key Features

- **Custom Clerk authentication** with email/password signup, login, and email verification.
- **Protected routing** for authenticated pages: dashboard, applications, monitor, profile, notifications, settings, and application form.
- **Dashboard overview** with site status, application counts, monitor shortcuts, and quick action cards.
- **Applications management** with filterable status views, expandable application details, and draft/resubmit flows.
- **Monitoring UI** with uptime highlights, incident logs, status checks, and notification preference options.
- **Multi-step submission flow** with requirements validation and personal/travel information entry.
- **Internationalization support** for English and Persian (Farsi).
- **Responsive layout** with desktop sidebar and mobile bottom navigation.

## Tech Stack

- React 18
- React Router v6
- Clerk React
- Redux Toolkit + Redux Thunk
- Tailwind CSS
- Material UI date pickers
- React i18next
- React Icons
- Day.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Clerk account and a publishable key

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/VisaSync.git
cd VisaSync
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```bash
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
```

4. Configure Clerk in the dashboard:
   - Enable email/password login if you want to use the current UI.
   - Keep the publishable key available for the frontend.

### Run Locally

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build production assets
- `npm test` - Run the test runner
- `npm run eject` - Eject CRA configuration

## Environment Variables

- `REACT_APP_CLERK_PUBLISHABLE_KEY` — required Clerk publishable key used by the frontend.

## Project Structure

- `src/`
  - `index.js` — bootstraps Clerk, Redux, and i18n providers
  - `App.js` — route definitions and protected/public route wrappers
  - `pages/` — main application pages
  - `components/` — reusable UI components and multi-step form sections
  - `state/` — Redux slices and store configuration
  - `locales/` — English and Farsi translation files

## Notes

- The current implementation is a frontend-focused UI layer. Application and monitoring data are presented as sample content and client-side state in the current version.
- This repository is designed to be extended with real backend integration for automation, persistence, and live monitoring.

## Possible Next Steps

- Add backend APIs for persisting visa applications and monitor alerts
- Integrate live availability polling for `evisatraveller.mfa.ir`
- Implement notification delivery channels (email / SMS / push)
- Expand the application form to collect actual visa application fields

---

