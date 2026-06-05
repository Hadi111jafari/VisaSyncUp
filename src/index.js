import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import store from "./state/store";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import i18n from "./i18n";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const root = ReactDOM.createRoot(document.getElementById("root"));

if (!clerkPublishableKey) {
  root.render(
    <div style={{ padding: "1rem", color: "#fff" }}>
      Missing REACT_APP_CLERK_PUBLISHABLE_KEY in your .env file.
    </div>,
  );
} else {
  root.render(
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/login"
    >
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </I18nextProvider>
      </Provider>
    </ClerkProvider>,
  );
}
