import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useTranslation } from "react-i18next";

const getPasswordValidationError = ({
  password,
  firstName,
  lastName,
  email,
  t,
}) => {
  const trimmedFirstName = firstName.trim().toLowerCase();
  const trimmedLastName = lastName.trim().toLowerCase();
  const emailLocalPart = email.split("@")[0]?.trim().toLowerCase();
  const normalizedPassword = password.toLowerCase();

  if (password.length < 8) {
    return t("Password must be at least 8 characters.");
  }

  if (!/[a-z]/.test(password)) {
    return t("Password must include a lowercase letter.");
  }

  if (!/[A-Z]/.test(password)) {
    return t("Password must include an uppercase letter.");
  }

  if (!/[0-9]/.test(password)) {
    return t("Password must include a number.");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return t("Password must include a symbol.");
  }

  if (
    trimmedFirstName &&
    trimmedFirstName.length >= 3 &&
    normalizedPassword.includes(trimmedFirstName)
  ) {
    return t("Password cannot include your first name.");
  }

  if (
    trimmedLastName &&
    trimmedLastName.length >= 3 &&
    normalizedPassword.includes(trimmedLastName)
  ) {
    return t("Password cannot include your last name.");
  }

  if (
    emailLocalPart &&
    emailLocalPart.length >= 3 &&
    normalizedPassword.includes(emailLocalPart)
  ) {
    return t("Password cannot include your email name.");
  }

  return "";
};

const getSignUpRequirementDetails = (signUpResource) => {
  const missingFields = signUpResource?.missingFields || [];
  const unverifiedFields = signUpResource?.unverifiedFields || [];

  return [...missingFields, ...unverifiedFields].join(", ");
};

const Signup = () => {
  const navigate = useNavigate();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const direction = isRTL ? "rtl" : "ltr";
  const isLoaded = signInLoaded && signUpLoaded;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const isVerificationSubmitting = useRef(false);

  const signInAfterVerifiedSignUp = async () => {
    if (!signInLoaded || !signIn) {
      return false;
    }

    const signInAttempt = await signIn.create({
      identifier: signupData.email.trim(),
      password: signupData.password,
    });

    if (signInAttempt.status === "complete" && signInAttempt.createdSessionId) {
      await setActive({ session: signInAttempt.createdSessionId });
      navigate("/dashboard", { replace: true });
      return true;
    }

    return false;
  };

  const activateSignUpSession = async (signUpResource) => {
    if (signUpResource.createdSessionId) {
      await setActive({ session: signUpResource.createdSessionId });
      navigate("/dashboard", { replace: true });
      return true;
    }

    return signInAfterVerifiedSignUp();
  };

  const completeSignUpIfReady = async (
    signUpResource,
    { reload = false } = {},
  ) => {
    let currentSignUp = signUpResource;

    if (reload && signUp?.id) {
      currentSignUp = await signUp.reload();
    }

    if (currentSignUp?.status === "complete") {
      return activateSignUpSession(currentSignUp);
    }

    return false;
  };

  const handleSignupChange = (e) => {
    if (error) {
      setError("");
    }

    if (localError) {
      setLocalError("");
    }

    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setLocalError(t("Passwords do not match."));
      return;
    }

    const passwordError = getPasswordValidationError({
      password: signupData.password,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      t,
    });

    if (passwordError) {
      setLocalError(passwordError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        emailAddress: signupData.email,
        password: signupData.password,
      };

      const signUpAttempt = await signUp.create(payload);

      if (await completeSignUpIfReady(signUpAttempt)) {
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (clerkError) {
      const message =
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        t("Signup failed. Please try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded || isVerificationSubmitting.current) {
      return;
    }

    isVerificationSubmitting.current = true;
    setLoading(true);
    setError("");

    try {
      if (await completeSignUpIfReady(signUp, { reload: true })) {
        return;
      }

      const verification = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      });

      if (await completeSignUpIfReady(verification)) {
        return;
      }

      if (await completeSignUpIfReady(signUp, { reload: true })) {
        return;
      }

      const currentSignUp = signUp?.id ? await signUp.reload() : verification;
      const requirementDetails = getSignUpRequirementDetails(currentSignUp);

      if (verification.status !== "complete") {
        setError(
          requirementDetails
            ? t("Verification is incomplete. Missing: {{fields}}", {
                fields: requirementDetails,
              })
            : t("Verification failed. Please check the code and try again."),
        );
        return;
      }
    } catch (clerkError) {
      if (await completeSignUpIfReady(signUp, { reload: true })) {
        return;
      }

      const message =
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        t("Verification failed. Please try again.");
      setError(message);
    } finally {
      isVerificationSubmitting.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FEFF]" dir={direction}>
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1">
        {/*
        <aside className="hidden flex-col justify-between bg-gradient-to-br from-[#007A8A] via-[#00979F] to-[#00B8C8] p-10 text-white lg:flex">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em]">
              VisaSync
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight">
              {t("app.auth.signupHero.title")}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/85">
              {t("app.auth.signupHero.subtitle")}
            </p>
          </div>
          <ul className="space-y-3 text-sm font-semibold text-white/90">
            <li>{t("app.auth.signupHero.points.prefill")}</li>
            <li>{t("app.auth.signupHero.points.fastSubmit")}</li>
            <li>{t("app.auth.signupHero.points.secureStorage")}</li>
          </ul>
        </aside>
        */}

        <main className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-[24px] border border-[#00B8C833] bg-white p-7 shadow-[0_16px_48px_rgba(0,120,140,0.12)] sm:p-8">
            <h2 className="text-3xl font-black text-[#0D3B42]">
              {t("Sign Up")}
            </h2>
            <p className="mt-2 text-sm text-[#1A6370]">
              {t("app.auth.signupIntro")}
            </p>
            {!pendingVerification ? (
              <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      placeholder={t("First Name")}
                      className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-right focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      placeholder={t("Last Name")}
                      className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-right focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
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
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder={t("Password")}
                    className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-left focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                    dir="ltr"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder={t("Confirm Password")}
                    className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-left focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                    dir="ltr"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <p className="text-xs leading-6 text-[#6B9EA6]">
                  {t(
                    "Use at least 8 characters with uppercase, lowercase, number, and symbol.",
                  )}
                </p>
                <div id="clerk-captcha" />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-6 py-3 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
                >
                  {loading ? t("Creating account...") : t("Sign Up")}
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleVerificationSubmit}
                className="mt-6 space-y-4"
              >
                <div className="text-center text-sm text-[#1A6370]">
                  {t("Enter the verification code sent to your email.")}
                </div>
                <div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder={t("Verification Code")}
                    className="w-full rounded-[14px] border border-[#00B8C833] px-4 py-3 text-left focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]"
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-6 py-3 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
                >
                  {loading ? t("Verifying...") : t("Verify Email")}
                </button>
              </form>
            )}
            <p className="mt-4 text-sm text-[#6B9EA6]">
              {t("Already have an account?")}{" "}
              <Link to="/login" className="mr-2 font-bold text-[#007A8A]">
                {t("Login")}
              </Link>
            </p>
            {localError && (
              <div className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 text-sm text-red-600">
                {localError}
              </div>
            )}
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

export default Signup;
