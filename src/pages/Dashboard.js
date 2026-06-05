import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const statusCards = [
    {
      key: "site",
      title: t("app.dashboard.cards.site.title"),
      value: t("app.dashboard.cards.site.value"),
      dot: "bg-emerald-500",
      subtitle: t("app.dashboard.cards.site.subtitle"),
      meta: t("app.dashboard.cards.site.meta"),
    },
    {
      key: "applications",
      title: t("app.dashboard.cards.applications.title"),
      value: t("app.dashboard.cards.applications.value"),
      dot: "bg-cyan-500",
      subtitle: t("app.dashboard.cards.applications.subtitle"),
      meta: t("app.dashboard.cards.applications.meta"),
      to: "/applications",
    },
    {
      key: "monitor",
      title: t("app.dashboard.cards.monitor.title"),
      value: t("app.dashboard.cards.monitor.value"),
      dot: "bg-emerald-500",
      subtitle: t("app.dashboard.cards.monitor.subtitle"),
      meta: t("app.dashboard.cards.monitor.meta"),
      to: "/monitor",
    },
  ];
  const activities = t("app.dashboard.activities", { returnObjects: true });

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <section className="grid gap-4 md:grid-cols-3">
        {statusCards.map((card) => {
          const body = (
            <div className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)] transition hover:-translate-y-[2px] hover:shadow-[0_6px_24px_rgba(0,120,140,0.12)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1A6370]">
                  {card.title}
                </p>
                <span
                  className={`h-3 w-3 rounded-full ${card.dot} animate-pulse`}
                />
              </div>
              <p className="text-2xl font-black text-[#0D3B42]">{card.value}</p>
              <p className="mt-1 text-sm font-semibold text-[#1A6370]">
                {card.subtitle}
              </p>
              <p className="mt-3 text-xs leading-6 text-[#6B9EA6]">
                {card.meta}
              </p>
            </div>
          );

          return card.to ? (
            <Link key={card.key} to={card.to} className="block">
              {body}
            </Link>
          ) : (
            <div key={card.key}>{body}</div>
          );
        })}
      </section>

      <section className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0D3B42]">
            {t("app.dashboard.recentTitle")}
          </h2>
          <button className="rounded-[14px] border border-[#00B8C8] bg-white px-4 py-2 text-xs font-semibold text-[#1A6370] transition hover:bg-[#E0F7FA]">
            {t("app.dashboard.viewAll")}
          </button>
        </div>
        <ul className="space-y-3">
          {activities.map((event, index) => (
            <li
              key={`${event.text}-${index}`}
              className="flex items-center justify-between rounded-[14px] border border-[#00B8C822] bg-[#F5FEFF] px-4 py-3"
            >
              <div className="flex items-center gap-3 text-sm text-[#1A6370]">
                <span className="text-lg">{event.icon}</span>
                <span>{event.text}</span>
              </div>
              <span className="text-xs text-[#6B9EA6]">{event.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link
          to="/form"
          className="rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-5 py-4 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
        >
          {t("app.dashboard.quickActions.newApplication")}
        </Link>
        <Link
          to="/profile"
          className="rounded-[14px] border border-[#00B8C8] bg-white px-5 py-4 text-center text-sm font-semibold text-[#1A6370] transition hover:bg-[#E0F7FA]"
        >
          {t("app.dashboard.quickActions.updateProfile")}
        </Link>
        <Link
          to="/notifications"
          className="rounded-[14px] border border-[#00B8C8] bg-white px-5 py-4 text-center text-sm font-semibold text-[#1A6370] transition hover:bg-[#E0F7FA]"
        >
          {t("app.dashboard.quickActions.configureNotifications")}
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
