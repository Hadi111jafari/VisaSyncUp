import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateFormData } from "../state/formSlice.js";
import InputField from "./InputField.jsx";
import { instructions, formFields } from "./constants.js";
import Instructions from "./Instructions.jsx";

const RequirementsCheckStep = ({ handleNext }) => {
  const { t } = useTranslation();
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    dispatch(updateFormData({ name, value }));
  };

  const fields_1_to_4 = formFields.slice(0, 4);
  const lastInstruction = instructions.slice(-1)[0];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-2 pb-24 sm:grid-cols-12 sm:gap-8 sm:px-4 sm:pb-8">
        <div className="rounded-[20px] border border-[#00B8C833] bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)] sm:col-span-6 sm:col-start-1 sm:p-6">
          <h1 className="mb-2 text-right text-xl font-black text-[#0D3B42] sm:text-2xl">
            {t("app.requirements.title")}
          </h1>
          <p className="mb-5 text-right text-sm leading-8 text-[#1A6370]">
            {t("app.requirements.description")}
          </p>
          {fields_1_to_4.map((field) => {
            return (
              <InputField
                key={field.id}
                value={formData[field.props.name]}
                onInputChange={handleChange}
                {...field.props}
              />
            );
          })}

          <div className="hidden justify-end pt-2 sm:flex">
            <button
              type="button"
              onClick={handleNext}
              className="min-h-12 rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-8 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
            >
              {t("app.shared.actions.submitAndContinue")}
            </button>
          </div>
        </div>
        <Instructions
          title={lastInstruction.title}
          instructions={lastInstruction.content}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex h-[72px] items-center justify-between border-t border-[#00B8C833] bg-white px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 sm:hidden">
        <button
          type="button"
          className="min-h-12 rounded-[14px] px-4 py-2 text-sm font-semibold text-[#1A6370]"
          disabled
        >
          {t("app.shared.actions.back")}
        </button>
        <p className="text-xs font-bold text-[#1A6370]">
          {t("app.requirements.mobileStep")}
        </p>
        <button
          type="button"
          onClick={handleNext}
          className="min-h-12 rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-5 py-2 text-sm font-bold text-white"
        >
          {t("app.shared.actions.continue")}
        </button>
      </div>
    </>
  );
};

export default RequirementsCheckStep;
