import React from "react";
import { useTranslation } from "react-i18next";
import { formProgressSteps } from "./constants";

const FormStepper = ({ currentStep = 1 }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const boundedStep = Math.min(
    Math.max(currentStep, 1),
    formProgressSteps.length,
  );

  return (
    <div className="sticky top-16 z-20 mb-6 rounded-2xl border border-[#00B8C833] bg-white/95 px-4 py-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)] backdrop-blur sm:top-[68px] sm:px-6">
      <div
        className="flex items-center justify-between sm:hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div>
          <p className="text-[0.78rem] font-semibold text-[#1A6370]">
            {t("app.formStepper.currentStep")}
          </p>
          <h2 className="mt-1 text-sm font-black text-[#0D3B42]">
            {t(
              formProgressSteps[boundedStep - 1].title,
              formProgressSteps[boundedStep - 1].title,
            )}
          </h2>
        </div>
        <div className="rounded-full bg-[#E0F7FA] px-3 py-1 text-xs font-bold text-[#007A8A]">
          {t("app.formStepper.stepOf", {
            step: boundedStep,
            total: formProgressSteps.length,
          })}
        </div>
      </div>

      <div className="hidden sm:block" dir={isRTL ? "rtl" : "ltr"}>
        <div className="relative">
          <div className="absolute inset-x-0 top-5 h-[2px] border-t-2 border-dashed border-[#00B8C84D]" />
          <div
            className="absolute top-5 h-[2px] bg-[#00979F] transition-all duration-300"
            style={{
              width: `${((boundedStep - 1) / (formProgressSteps.length - 1)) * 100}%`,
              [isRTL ? "right" : "left"]: 0,
              [isRTL ? "left" : "right"]: "auto",
            }}
          />
          <div
            className={`relative grid grid-cols-5 items-start gap-2 ${isRTL ? "rtl" : "ltr"}`}
          >
            {formProgressSteps.map((item, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = stepNumber < boundedStep;
              const isActive = stepNumber === boundedStep;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-extrabold transition ${
                      isActive
                        ? "border-transparent bg-gradient-to-br from-[#00B8C8] to-[#007A8A] text-white"
                        : isCompleted
                          ? "border-[#00979F] bg-[#00979F] text-white"
                          : "border-[#00B8C833] bg-white text-[#6B9EA6]"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-[0.73rem] leading-5 ${
                      isActive
                        ? "font-extrabold text-[#0D3B42]"
                        : "font-semibold text-[#1A6370]"
                    }`}
                  >
                    {t(item.title, item.title)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
