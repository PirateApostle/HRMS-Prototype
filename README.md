# St Teresa Hospital HRMS — Frontend Prototype

A responsive React + Vite prototype for three separate portal experiences:
- Administrator
- Employee Self-Service
- Patient / Client

## Design theme
- Dark blue: `#102A43`
- Orange: `#F28C28`
- Background: `#F4F7FA`
- White surfaces and muted blue-grey text

## Requirements
- Node.js (LTS recommended)
- npm

## Run on Windows
1. Extract the ZIP file.
2. Open the extracted `st_teresa_hrms_prototype` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## Prototype interactions
- Switch between the three portals using the selector in the left sidebar.
- Navigate each portal using its own menu.
- Search the Administrator employee directory.
- Open the Add Employee modal.
- Submit a sample appointment request in the Patient / Client portal.
- View employee-specific sample attendance and payslip screens.
- Test responsive layout by narrowing the browser or using device emulation.

## Important limitations
This is a frontend-only prototype. All displayed data is mock/sample data held in browser memory. It does not authenticate users, connect to PostgreSQL, send notifications, create real appointments, process payroll, or modify hospital records. Refreshing the browser resets prototype interactions.

The employee attendance and payslip screens are intentionally personal sample views, separate from the Administrator's hospital-wide attendance and payroll views.

Before production, implement backend authentication, server-side role authorization, PostgreSQL row-level security, validation, audit logging, secure file handling, and applicable Kenyan data-protection and health-sector compliance controls. Verify statutory payroll rules against current official Kenyan requirements before implementation.
