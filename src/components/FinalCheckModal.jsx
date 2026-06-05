import React from "react";
import ReactDom from "react-dom";
import { useTranslation } from "react-i18next";

const FinalCheckModal = ({ open, children, onClose, handleSubmit }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const direction = isRTL ? "rtl" : "ltr";
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <div
          dir={direction}
          className="custom-scrollbar relative mx-auto flex max-h-[calc(100vh-56px)] w-full max-w-[960px] flex-col overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t("app.shared.actions.edit")}
            className="absolute right-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
          >
            ×
          </button>

          <div className="overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
            {children}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
            <button
              onClick={onClose}
              className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {t("app.shared.actions.edit")}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-full border border-transparent bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-8 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,184,200,0.28)] transition hover:-translate-y-[1px]"
            >
              {t("app.shared.actions.confirm")}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default FinalCheckModal;
