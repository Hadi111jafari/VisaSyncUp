
This project enhances the evisatraveller.mfa.ir website by automating registration and monitoring site availability.


## Authentication Setup

This project uses Clerk for frontend-only authentication while keeping a custom login and signup UI.

1. Create a `.env` file in the project root.
2. Add your Clerk publishable key:

```bash
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
```

3. In your Clerk dashboard, enable the login/signup methods you want (email/password is supported by the current UI).

Notes:

- The app uses custom forms and Clerk APIs, not Clerk's prebuilt auth pages.
- Protected routes are handled client-side using Clerk session state.



![image](https://github.com/Hadi111jafari/VisaSyncUp/assets/93380132/605f9cb5-a6ab-406c-922d-cea32db15808)


![Screenshot 2024-03-29 180727](https://github.com/Hadi111jafari/VisaSyncUp/assets/93380132/63ab4152-8d1b-434b-8f16-a2e3bb0510cd)

