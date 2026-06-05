import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const handleLoginChange = (e) => {
    if (error) {
      setError("");
    }

    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: loginData.identifier.trim(),
        password: loginData.password,
      });

      if (
        signInAttempt.status !== "complete" ||
        !signInAttempt.createdSessionId
      ) {
        setError(t("Additional verification is required for this account."));
        return;
      }

      await setActive({ session: signInAttempt.createdSessionId });
      navigate("/dashboard", { replace: true });
    } catch (clerkError) {
      const message =
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        t("Login failed. Please try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FEFF]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1">
        {/*
        <aside className="hidden flex-col justify-between bg-gradient-to-br from-[#007A8A] via-[#00979F] to-[#00B8C8] p-10 text-white lg:flex">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]">
              VisaSync
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight">
              {t("app.auth.loginHero.title")}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/85">
              {t("app.auth.loginHero.subtitle")}
            </p>
          </div>
          <ul className="space-y-3 text-sm font-semibold text-white/90">
            <li>{t("app.auth.loginHero.points.monitoring")}</li>
            <li>{t("app.auth.loginHero.points.notifications")}</li>
            <li>{t("app.auth.loginHero.points.autoSubmit")}</li>
          </ul>
        </aside>
        */}

        <main className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-[24px] border border-[#00B8C833] bg-white p-7 shadow-[0_16px_48px_rgba(0,120,140,0.12)] sm:p-8">
            <h2 className="text-3xl font-black text-[#0D3B42]">{t("Login")}</h2>
            <p className="mt-2 text-sm text-[#1A6370]">
              {t("app.auth.loginIntro")}
            </p>

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="email"
                  name="identifier"
                  value={loginData.identifier}
                  onChange={handleLoginChange}
                  placeholder={t("Email")}
                  className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-left focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                  dir="ltr"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder={t("Password")}
                  className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-left focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                  dir="ltr"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-6 py-3 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
              >
                {loading ? t("Signing in...") : t("Continue")}
              </button>
            </form>

            <p className="mt-4 text-sm text-[#6B9EA6]">
              {t("Don't have an account?")}
              <Link to="/signup" className="mr-2 font-bold text-[#007A8A]">
                {t("Sign up")}
              </Link>
            </p>
            {error && (
              <div className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
