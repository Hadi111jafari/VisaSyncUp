import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const tabs = ["all", "unread", "alerts", "system"];

const data = [
  {
    id: 1,
    icon: "🔴",
    titleKey: "app.notifications.items.offline.title",
    descKey: "app.notifications.items.offline.desc",
    timeKey: "app.notifications.items.offline.time",
    unread: true,
    type: "alerts",
  },
  {
    id: 2,
    icon: "⭐",
    titleKey: "app.notifications.items.slot.title",
    descKey: "app.notifications.items.slot.desc",
    timeKey: "app.notifications.items.slot.time",
    unread: true,
    type: "alerts",
  },
  {
    id: 3,
    icon: "✅",
    titleKey: "app.notifications.items.approved.title",
    descKey: "app.notifications.items.approved.desc",
    timeKey: "app.notifications.items.approved.time",
    unread: false,
    type: "all",
  },
  {
    id: 4,
    icon: "🔧",
    titleKey: "app.notifications.items.systemUpdate.title",
    descKey: "app.notifications.items.systemUpdate.desc",
    timeKey: "app.notifications.items.systemUpdate.time",
    unread: false,
    type: "system",
  },
];

const Notifications = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [activeTab, setActiveTab] = useState("all");

  const rows = useMemo(() => {
    if (activeTab === "all") return data;
    if (activeTab === "unread") return data.filter((item) => item.unread);
    return data.filter((item) => item.type === activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-5" dir={isRTL ? "rtl" : "ltr"}>
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#0D3B42]">
          {t("app.notifications.title")}{" "}
          <span className="rounded-full bg-[#00B8C8] px-2 py-1 text-xs text-white">
            {data.filter((i) => i.unread).length}
          </span>
        </h1>
      </section>

      <section className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-xs font-bold ${activeTab === tab ? "bg-[#007A8A] text-white" : "border border-[#00B8C833] bg-white text-[#1A6370]"}`}
          >
            {t(`app.notifications.tabs.${tab}`)}
          </button>
        ))}
      </section>

      <section className="space-y-3">
        {rows.map((item) => (
          <article
            key={item.id}
            className={`rounded-[16px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)] ${
              item.unread
                ? "border-[#00B8C8] bg-[#F5FEFF]"
                : "border-[#00B8C833]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h2 className="text-sm font-bold text-[#0D3B42]">
                    {t(item.titleKey)}
                  </h2>
                  <p className="mt-1 text-sm text-[#1A6370]">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#6B9EA6]">{t(item.timeKey)}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
        <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
          {t("app.notifications.settingsTitle")}
        </h2>
        <div className="overflow-hidden rounded-[14px] border border-[#00B8C822]">
          <table className="w-full text-xs">
            <thead className="bg-[#F5FEFF] text-[#1A6370]">
              <tr>
                <th className="px-3 py-2 text-right">
                  {t("app.notifications.table.type")}
                </th>
                <th className="px-3 py-2 text-center">In-App</th>
                <th className="px-3 py-2 text-center">Email</th>
                <th className="px-3 py-2 text-center">Push</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#00B8C822]">
                <td className="px-3 py-2">
                  {t("app.notifications.table.siteOffline")}
                </td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
              <tr className="border-t border-[#00B8C822]">
                <td className="px-3 py-2">
                  {t("app.notifications.table.slotDetected")}
                </td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
              <tr className="border-t border-[#00B8C822]">
                <td className="px-3 py-2">
                  {t("app.notifications.table.applicationApproved")}
                </td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
