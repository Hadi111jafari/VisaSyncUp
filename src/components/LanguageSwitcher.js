import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language;
  const isRTL = currentLang === "fa";

  const toggleLanguage = () => {
    const newLang = currentLang === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: "transparent",
        border: "1px solid #D0E0DD",
        color: "#5A6C7D",
        padding: "6px 14px",
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Vazirmatn', 'Segoe UI', sans-serif",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(0,168,150,0.08)";
        e.target.style.borderColor = "#00A896";
        e.target.style.color = "#00A896";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "transparent";
        e.target.style.borderColor = "#D0E0DD";
        e.target.style.color = "#5A6C7D";
      }}
    >
      {isRTL ? "EN" : "FA"}
    </button>
  );
};

export default LanguageSwitcher;
