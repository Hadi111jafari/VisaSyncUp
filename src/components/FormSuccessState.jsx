import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const FormSuccessState = ({ onGoDashboard, onNewApplication }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const referenceNumber = useMemo(() => {
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate(),
    ).padStart(2, "0")}`;
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `IRN-${stamp}-${rand}`;
  }, []);

  return (
    <div
      className="mx-auto max-w-3xl rounded-[28px] border border-[#00B8C833] bg-white p-6 text-center shadow-[0_16px_48px_rgba(0,120,140,0.16)] sm:p-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto mb-5 h-24 w-24">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#E0F7FA"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#00B8C8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="327"
            strokeDashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="327"
              to="0"
              dur="0.6s"
              fill="freeze"
            />
          </circle>
          <path
            d="M35 62 L52 78 L86 45"
            fill="none"
            stroke="#007A8A"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            strokeDashoffset="80"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="80"
              to="0"
              dur="0.5s"
              begin="0.4s"
              fill="freeze"
            />
          </path>
        </svg>
      </div>

      <h2 className="text-2xl font-black text-[#0D3B42] sm:text-3xl">
        {t("app.formSuccess.title")}
      </h2>
      <p className="mt-2 text-sm leading-8 text-[#1A6370]">
        {t("app.formSuccess.subtitle")}
      </p>

      <div className="mx-auto mt-5 w-fit rounded-full bg-[#E0F7FA] px-4 py-2 font-mono text-sm font-bold text-[#007A8A]">
        {referenceNumber}
      </div>

      <div className="mt-8 grid gap-3 rounded-[20px] border border-[#00B8C833] bg-[#F5FEFF] p-4 text-right sm:p-5">
        <h3 className="text-sm font-extrabold text-[#0D3B42]">
          {t("app.formSuccess.nextSteps")}
        </h3>
        <div className="flex items-center gap-3 text-sm text-[#1A6370]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F7FA] font-bold text-[#007A8A]">
            1
          </span>
          <span>{t("app.formSuccess.timeline.review")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#1A6370]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F7FA] font-bold text-[#007A8A]">
            2
          </span>
          <span>{t("app.formSuccess.timeline.decision")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#1A6370]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F7FA] font-bold text-[#007A8A]">
            3
          </span>
          <span>{t("app.formSuccess.timeline.notification")}</span>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onGoDashboard}
          className="min-h-12 rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
        >
          {t("app.formSuccess.goDashboard")}
        </button>
        <button
          type="button"
          onClick={onNewApplication}
          className="min-h-12 rounded-[14px] border border-[#00B8C8] bg-white px-6 py-3 text-sm font-semibold text-[#1A6370] transition hover:bg-[#E0F7FA]"
        >
          {t("app.formSuccess.newApplication")}
        </button>
      </div>
    </div>
  );
};

export default FormSuccessState;
