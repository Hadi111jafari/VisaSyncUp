import React from "react";
import { FaFlag } from "react-icons/fa6";
import { FiInfo, FiFileText } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Instructions = ({ title, step, instructions }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const safeInstructions = Array.isArray(instructions) ? instructions : [];
  const splitIndex = Math.max(1, Math.ceil(safeInstructions.length / 2));
  const docs = safeInstructions.slice(0, splitIndex);
  const notes = safeInstructions.slice(splitIndex);

  return (
    <div
      className="h-fit sm:col-span-6 sm:col-start-7"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="rounded-[20px] border border-l-4 border-[#00B8C833] border-l-[#00B8C8] bg-white p-5 shadow-[0_2px_8px_rgba(0,120,140,0.08)]">
        {step && (
          <p className="text-xs font-bold text-[#1A6370]">{t(step, step)}</p>
        )}
        <h2 className="mt-2 flex items-center gap-2 text-lg font-black text-[#0D3B42] sm:text-xl">
          <FaFlag className="text-[#00B8C8]" />
          <span>{t(title, title)}</span>
        </h2>

        <div className="mt-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#007A8A]">
            <FiFileText />
            <span>{t("app.shared.instructions.requiredDocs")}</span>
          </h3>
          <ul className="space-y-2">
            {docs.map((instruction, index) => (
              <li
                key={`doc-${index}`}
                className="rounded-xl bg-[#F5FEFF] px-3 py-2 text-[13px] leading-[1.85] text-[#1A6370]"
              >
                {t(instruction, instruction)}
              </li>
            ))}
          </ul>
        </div>

        {notes.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#007A8A]">
              <FiInfo />
              <span>{t("app.shared.instructions.importantNotes")}</span>
            </h3>
            <ul className="space-y-2">
              {notes.map((instruction, index) => (
                <li
                  key={`note-${index}`}
                  className="rounded-xl border border-[#F59E0B33] bg-[#FFFBEB] px-3 py-2 text-[13px] leading-[1.85] text-[#92400E]"
                >
                  {t(instruction, instruction)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;
