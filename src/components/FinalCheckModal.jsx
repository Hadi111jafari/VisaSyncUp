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
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black opacity-70" />
      <div
        dir={direction}
        className="custom-scrollbar fixed left-1/2 top-1/2 z-50 flex max-h-96 -translate-x-1/2 -translate-y-1/2 transform flex-col overflow-y-auto bg-white"
      >
        {children}
        <div className="m-8 flex">
          <button
            onClick={onClose}
            className="transform rounded-full border px-8 pb-1 transition duration-300 ease-in-out hover:scale-105"
          >
            {t("app.shared.actions.edit")}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mr-4 transform rounded-full border bg-blue-900 px-14 pb-1 text-white transition duration-300 ease-in-out hover:scale-105"
          >
            {t("app.shared.actions.confirm")}
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default FinalCheckModal;
