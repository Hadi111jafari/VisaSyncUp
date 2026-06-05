import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const ranges = ["7d", "30d", "90d"];

const weeklyData = [98, 97, 92, 68, 99, 96, 94];

const Monitor = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [range, setRange] = useState("7d");

  const banner = useMemo(
    () => ({
      status: t("app.monitor.banner.status"),
      classes: "from-[#007A8A] via-[#00979F] to-[#00B8C8]",
      icon: "🟢",
    }),
    [t],
  );

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <section
        className={`rounded-[24px] bg-gradient-to-br ${banner.classes} p-6 text-white shadow-[0_16px_48px_rgba(0,120,140,0.2)]`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/80">
              {t("app.monitor.banner.title")}
            </p>
            <h1 className="mt-1 text-3xl font-black">
              {banner.icon} {banner.status}
            </h1>
            <p className="mt-2 text-sm text-white/80">
              {t("app.monitor.banner.lastChecked", { seconds: 14 })}
            </p>
          </div>
          <button className="rounded-[14px] border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20">
            {t("app.monitor.banner.quickCheck")}
          </button>
        </div>
      </section>

      <section className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black text-[#0D3B42]">
            {t("app.monitor.uptimeChartTitle")}
          </h2>
          <div className="flex gap-2">
            {ranges.map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  range === item
                    ? "bg-[#007A8A] text-white"
                    : "border border-[#00B8C833] text-[#1A6370]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 items-end gap-2">
          {weeklyData.map((value, index) => {
            const color =
              value >= 95
                ? "bg-emerald-500"
                : value >= 70
                  ? "bg-amber-400"
                  : "bg-red-500";
            return (
              <div key={`${value}-${index}`} className="text-center">
                <div className="mx-auto flex h-44 w-10 items-end rounded-t-[10px] bg-[#F5FEFF] p-1">
                  <div
                    className={`w-full rounded-[8px] ${color}`}
                    style={{ height: `${value}%` }}
                    title={`${value}%`}
                  />
                </div>
                <p className="mt-2 text-[11px] text-[#6B9EA6]">
                  {t("app.monitor.day", { day: index + 1 })}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.monitor.incidentsTitle")}
          </h2>
          <div className="overflow-hidden rounded-[14px] border border-[#00B8C822]">
            <table className="w-full text-xs">
              <thead className="bg-[#F5FEFF] text-[#1A6370]">
                <tr>
                  <th className="px-2 py-2 text-right">
                    {t("app.monitor.table.date")}
                  </th>
                  <th className="px-2 py-2 text-right">
                    {t("app.monitor.table.start")}
                  </th>
                  <th className="px-2 py-2 text-right">
                    {t("app.monitor.table.end")}
                  </th>
                  <th className="px-2 py-2 text-right">
                    {t("app.monitor.table.duration")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#00B8C822]">
                  <td className="px-2 py-2">1405/03/09</td>
                  <td className="px-2 py-2">13:05</td>
                  <td className="px-2 py-2">13:18</td>
                  <td className="px-2 py-2 text-amber-700">
                    {t("app.monitor.table.firstDuration")}
                  </td>
                </tr>
                <tr className="border-t border-[#00B8C822]">
                  <td className="px-2 py-2">1405/03/08</td>
                  <td className="px-2 py-2">21:10</td>
                  <td className="px-2 py-2">21:16</td>
                  <td className="px-2 py-2 text-emerald-700">
                    {t("app.monitor.table.secondDuration")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#00B8C833] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
          <h2 className="mb-3 text-lg font-black text-[#0D3B42]">
            {t("app.monitor.settingsTitle")}
          </h2>
          <div className="space-y-3 text-sm text-[#1A6370]">
            <label className="block">
              {t("app.monitor.checkInterval")}
              <select className="mt-1 w-full rounded-[12px] border border-[#00B8C833] px-3 py-2">
                <option>{t("app.monitor.interval.10s")}</option>
                <option>{t("app.monitor.interval.30s")}</option>
                <option>{t("app.monitor.interval.1m")}</option>
                <option>{t("app.monitor.interval.5m")}</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />{" "}
              {t("app.monitor.notifyOffline")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />{" "}
              {t("app.monitor.notifyOnline")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />{" "}
              {t("app.monitor.notifySlot")}
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Monitor;
