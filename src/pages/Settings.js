import React from "react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div
      className="grid gap-5 lg:grid-cols-[220px,1fr]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <aside className="rounded-[20px] border border-[#00B8C833] bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
        <ul className="space-y-2 text-sm font-semibold text-[#1A6370]">
          <li className="rounded-[10px] bg-[#E0F7FA] px-3 py-2">
            {t("app.settings.menu.account")}
          </li>
          <li className="rounded-[10px] px-3 py-2">
            {t("app.settings.menu.notifications")}
          </li>
          <li className="rounded-[10px] px-3 py-2">
            {t("app.settings.menu.monitorConfig")}
          </li>
          <li className="rounded-[10px] px-3 py-2">
            {t("app.settings.menu.appearance")}
          </li>
          <li className="rounded-[10px] px-3 py-2 text-red-700">
            {t("app.settings.menu.dangerZone")}
          </li>
        </ul>
      </aside>

      <section className="space-y-4">
        <div className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.settings.monitorConfigTitle")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              defaultValue="evisatraveller.mfa.ir"
            />
            <select className="rounded-[12px] border border-[#00B8C833] px-3 py-2">
              <option>10s</option>
              <option>30s</option>
              <option>1min</option>
              <option>5min</option>
            </select>
          </div>
          <div className="mt-3 space-y-2 text-sm text-[#1A6370]">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />{" "}
              {t("app.settings.autoSubmit")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> {t("app.settings.requireConfirmation")}
            </label>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.settings.appearanceTitle")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="rounded-[12px] border border-[#00B8C833] px-3 py-2">
              <option>{t("app.settings.language.fa")}</option>
              <option>{t("app.settings.language.en")}</option>
            </select>
            <select className="rounded-[12px] border border-[#00B8C833] px-3 py-2">
              <option>{t("app.settings.theme.light")}</option>
              <option>{t("app.settings.theme.dark")}</option>
              <option>{t("app.settings.theme.system")}</option>
            </select>
          </div>
        </div>

        <div className="rounded-[20px] border border-red-300 bg-red-50 p-5">
          <h2 className="mb-3 text-lg font-black text-red-700">
            {t("app.settings.dangerTitle")}
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <button className="rounded-[12px] border border-red-400 px-3 py-2 text-sm font-semibold text-red-700">
              {t("app.settings.actions.stopMonitor")}
            </button>
            <button className="rounded-[12px] border border-red-400 px-3 py-2 text-sm font-semibold text-red-700">
              {t("app.settings.actions.clearHistory")}
            </button>
            <button className="rounded-[12px] border border-red-500 bg-red-600 px-3 py-2 text-sm font-bold text-white">
              {t("app.settings.actions.deleteAccount")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
