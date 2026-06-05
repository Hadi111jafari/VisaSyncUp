import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const filters = ["all", "pending", "approved", "rejected", "draft"];

const initialApps = [
  {
    id: "IRN-20260601-81231",
    visaTypeKey: "app.applications.samples.pending.visaType",
    submittedAt: "1405/03/10",
    status: "pending",
    timelineKeys: [
      "app.applications.samples.pending.timeline.0",
      "app.applications.samples.pending.timeline.1",
      "app.applications.samples.pending.timeline.2",
    ],
    docKeys: [
      "app.applications.samples.pending.docs.0",
      "app.applications.samples.pending.docs.1",
    ],
  },
  {
    id: "IRN-20260517-48390",
    visaTypeKey: "app.applications.samples.approved.visaType",
    submittedAt: "1405/02/27",
    status: "approved",
    expiry: "1405/08/01",
    timelineKeys: [
      "app.applications.samples.approved.timeline.0",
      "app.applications.samples.approved.timeline.1",
      "app.applications.samples.approved.timeline.2",
    ],
    docKeys: [
      "app.applications.samples.approved.docs.0",
      "app.applications.samples.approved.docs.1",
      "app.applications.samples.approved.docs.2",
    ],
  },
  {
    id: "IRN-20260508-12993",
    visaTypeKey: "app.applications.samples.rejected.visaType",
    submittedAt: "1405/02/18",
    status: "rejected",
    reasonKey: "app.applications.samples.rejected.reason",
    timelineKeys: [
      "app.applications.samples.rejected.timeline.0",
      "app.applications.samples.rejected.timeline.1",
      "app.applications.samples.rejected.timeline.2",
    ],
    docKeys: [
      "app.applications.samples.rejected.docs.0",
      "app.applications.samples.rejected.docs.1",
    ],
  },
  {
    id: "IRN-DRAFT-55812",
    visaTypeKey: "app.applications.samples.draft.visaType",
    submittedAt: "-",
    status: "draft",
    timelineKeys: ["app.applications.samples.draft.timeline.0"],
    docKeys: [],
  },
];

const chipClass = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-700",
  draft: "bg-slate-100 text-slate-600",
};

const Applications = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [expandedId, setExpandedId] = useState(null);

  const apps = useMemo(() => {
    if (activeFilter === "all") {
      return initialApps;
    }

    return initialApps.filter((app) => app.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-5" dir={isRTL ? "rtl" : "ltr"}>
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0D3B42]">
            {t("app.applications.title")}
          </h1>
          <p className="mt-1 text-sm text-[#1A6370]">
            {t("app.applications.subtitle")}
          </p>
        </div>
        <Link
          to="/form"
          className="rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)]"
        >
          {t("app.applications.newButton")}
        </Link>
      </section>

      <section className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
              activeFilter === filter
                ? "bg-[#007A8A] text-white"
                : "border border-[#00B8C833] bg-white text-[#1A6370] hover:bg-[#E0F7FA]"
            }`}
          >
            {t(`app.applications.filters.${filter}`)}
          </button>
        ))}
      </section>

      {apps.length === 0 ? (
        <section className="rounded-[20px] border border-[#00B8C833] bg-white p-10 text-center shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
          <div className="text-6xl">🛂✈️</div>
          <h2 className="mt-4 text-xl font-black text-[#0D3B42]">
            {t("app.applications.empty.title")}
          </h2>
          <p className="mt-2 text-sm text-[#1A6370]">
            {t("app.applications.empty.subtitle")}
          </p>
          <Link
            to="/form"
            className="mt-5 inline-block rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-5 py-3 text-sm font-bold text-white"
          >
            {t("app.applications.empty.cta")}
          </Link>
        </section>
      ) : (
        <section className="space-y-3">
          {apps.map((app) => {
            const expanded = expandedId === app.id;
            return (
              <div
                key={app.id}
                className="rounded-[20px] border border-[#00B8C833] bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#0D3B42]">
                      {t(app.visaTypeKey)}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[#1A6370]">
                      {app.id}
                    </p>
                    <p className="mt-1 text-xs text-[#6B9EA6]">
                      {t("app.applications.submittedAt", {
                        date: app.submittedAt,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${chipClass[app.status]}`}
                    >
                      {t(`app.applications.status.${app.status}`)}
                    </span>
                    {app.expiry && (
                      <span className="text-xs text-emerald-700">
                        {t("app.applications.until", { date: app.expiry })}
                      </span>
                    )}
                    {app.reasonKey && (
                      <span className="text-xs text-red-600">
                        {t("app.applications.rejectionReason", {
                          reason: t(app.reasonKey),
                        })}
                      </span>
                    )}
                    {app.status === "draft" && (
                      <Link
                        to="/form"
                        className="rounded-[10px] border border-[#00B8C8] px-3 py-1 text-xs font-semibold text-[#1A6370]"
                      >
                        {t("app.applications.continue")}
                      </Link>
                    )}
                    <button
                      onClick={() => setExpandedId(expanded ? null : app.id)}
                      className="rounded-[10px] border border-[#00B8C833] px-2 py-1 text-xs text-[#1A6370]"
                    >
                      {expanded
                        ? t("app.applications.collapse")
                        : t("app.applications.details")}
                    </button>
                  </div>
                </div>

                {expanded && (
                  <div className="mt-4 grid gap-4 border-t border-[#00B8C822] pt-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-bold text-[#0D3B42]">
                        {t("app.applications.timeline")}
                      </p>
                      <ul className="space-y-1 text-xs text-[#1A6370]">
                        {app.timelineKeys.map((item, index) => (
                          <li
                            key={`${item}-${index}`}
                            className="rounded-[10px] bg-[#F5FEFF] px-3 py-2"
                          >
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-bold text-[#0D3B42]">
                        {t("app.applications.documents")}
                      </p>
                      <ul className="space-y-1 text-xs text-[#1A6370]">
                        {app.docKeys.map((doc, index) => (
                          <li
                            key={`${doc}-${index}`}
                            className="rounded-[10px] bg-[#F5FEFF] px-3 py-2"
                          >
                            {t(doc)}
                          </li>
                        ))}
                      </ul>
                      {app.status === "approved" && (
                        <button className="mt-3 rounded-[12px] bg-[#007A8A] px-4 py-2 text-xs font-bold text-white">
                          {t("app.applications.downloadPdf")}
                        </button>
                      )}
                      {app.status === "rejected" && (
                        <Link
                          to="/form"
                          className="mt-3 inline-block rounded-[12px] border border-[#00B8C8] px-4 py-2 text-xs font-bold text-[#1A6370]"
                        >
                          {t("app.applications.reapply")}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Applications;
