import React from "react";
import { useTranslation } from "react-i18next";

const sectionBox =
  "rounded-[16px] border border-[#00B8C833] bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)]";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className="grid gap-5 lg:grid-cols-2" dir={isRTL ? "rtl" : "ltr"}>
      <section className="space-y-4">
        <div className={sectionBox}>
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.profile.identityTitle")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.firstName")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.lastName")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.birthPlace")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.nationality")}
            />
          </div>
        </div>

        <div className={sectionBox}>
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.profile.passportTitle")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.passportNumber")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.issuerCountry")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.issueDate")}
            />
            <input
              className="rounded-[12px] border border-[#00B8C833] px-3 py-2"
              placeholder={t("app.profile.fields.expiryDate")}
            />
          </div>
          <p className="mt-2 text-xs text-amber-700">
            {t("app.profile.passportWarning")}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className={sectionBox}>
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.profile.documentsTitle")}
          </h2>
          <div className="space-y-2 text-sm text-[#1A6370]">
            <div className="flex items-center justify-between rounded-[12px] bg-[#F5FEFF] px-3 py-2">
              <span>{t("app.profile.samples.photo")}</span>
              <button className="text-red-600">
                {t("app.profile.remove")}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-[#F5FEFF] px-3 py-2">
              <span>passport-front.png</span>
              <button className="text-red-600">
                {t("app.profile.remove")}
              </button>
            </div>
          </div>
        </div>

        <div className={sectionBox}>
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.profile.securityTitle")}
          </h2>
          <div className="space-y-2 text-sm text-[#1A6370]">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />{" "}
              {t("app.profile.enable2fa")}
            </label>
            <button className="w-full rounded-[12px] border border-[#00B8C8] px-3 py-2 text-right">
              {t("app.profile.changePassword")}
            </button>
            <button className="w-full rounded-[12px] border border-red-400 bg-red-50 px-3 py-2 text-right text-red-700">
              {t("app.profile.deleteAllData")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
