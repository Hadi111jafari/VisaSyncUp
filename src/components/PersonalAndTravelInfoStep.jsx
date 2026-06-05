import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import CustomDatePicker from "./DatePicker";
import CustomDropzone from "./Dropzone";
import Instructions from "./Instructions";
import { formFields, instructions } from "./constants";
import { updateFormData } from "../state/formSlice";
import { toggleCheckbox } from "../state/formSlice";
import FinalCheckModal from "./FinalCheckModal";
import { VscChecklist } from "react-icons/vsc";

const PersonalAndTravelInfoStep = ({
  isOpen,
  onClose,
  step,
  setIsOpen,
  handlePrev,
  onFormSubmitted,
  onProgressStepChange,
}) => {
  const { t } = useTranslation();
  const [selectedFilesByField, setSelectedFilesByField] = useState({});
  const activeProgressRef = useRef(2);
  const formData = useSelector((state) => state.form.formData);
  const isChecked = formData.urgentRequest;
  const dispatch = useDispatch();

  const handlePreview1 = (name, files, error = null) => {
    setSelectedFilesByField((prev) => ({
      ...prev,
      [name]: {
        files,
        error,
      },
    }));
  };

  const handleChange = (name, value) => {
    dispatch(updateFormData({ name, value }));
  };

  const handleCheckboxChange = () => {
    dispatch(toggleCheckbox());
  };
  const instructionIdMap = { 16: 100, 23: 200, 28: 300, 38: 400 };
  const progressStepByInstructionId = { 100: 2, 200: 3, 300: 4, 400: 5 };
  const idsToRenderHrAfter = Object.keys(instructionIdMap).map(Number);

  let costAndLocationInModal = [];
  let otherFieldsInModal = [];

  const renderFieldComponent = (fieldDetail) => {
    switch (fieldDetail.type) {
      case "InputField":
        return (
          <InputField
            key={fieldDetail.id}
            value={formData[fieldDetail.props.name]}
            isChecked={isChecked}
            onInputChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            {...fieldDetail.props}
          />
        );
      case "CustomDatePicker":
        return (
          <CustomDatePicker
            key={fieldDetail.id}
            value={formData[fieldDetail.props.name]}
            name={fieldDetail.props.name}
            onDateChange={handleChange}
            {...fieldDetail.props}
          />
        );
      case "CustomDropzone":
        return (
          <CustomDropzone
            key={fieldDetail.id}
            selectedFiles={
              selectedFilesByField[fieldDetail.props.name]?.files || []
            }
            error={selectedFilesByField[fieldDetail.props.name]?.error || null}
            handlePreview={handlePreview1}
            label={fieldDetail.label}
            {...fieldDetail.props}
          />
        );
      default:
        return null;
    }
  };

  const renderSections = () => {
    let sections = [];
    let currentSectionFields = [];

    formFields.forEach((field, index) => {
      if (field.id >= 5 && field.id <= 38) {
        currentSectionFields.push(
          <div key={`currentSectionFields-${field.id}`}>
            {renderFieldComponent(field)}
          </div>,
        );
      }
      if (idsToRenderHrAfter.includes(field.id)) {
        const instruction = instructions.find(
          (instr) => instr.id === instructionIdMap[field.id],
        );
        sections.push(
          <div
            key={`section-${field.id}`}
            data-progress-step={progressStepByInstructionId[instruction.id]}
            className="form-section-block relative z-10 grid grid-cols-1 gap-6 px-2 pb-4 sm:grid-cols-12 sm:gap-8 sm:px-4"
          >
            <div className="rounded-[20px] border border-[#00B8C833] bg-white p-4 shadow-[0_2px_8px_rgba(0,120,140,0.08)] sm:col-span-6 sm:col-start-1 sm:p-6">
              {currentSectionFields}
            </div>
            <Instructions
              key={instruction.id}
              title={instruction.title}
              id={instruction.id}
              step={instruction.step}
              instructions={instruction.content}
            />
          </div>,
        );

        if (index < formFields.length - 2) {
          sections.push(
            <div key={`hr-${field.id}`} className="mx-auto my-3 w-11/12">
              <hr className="h-px w-full rounded border-0 bg-[#00B8C833]" />
            </div>,
          );
        }

        currentSectionFields = [];
      }
      // Modal
      let fieldValuesInModal;
      let checkboxValue;
      let type;
      let visaCost;

      const lookupOptionLabel = (valueToLookup) => {
        if (!Array.isArray(field.props.options)) {
          return valueToLookup;
        }

        const optionEntry = field.props.options.find((option) =>
          typeof option === "string"
            ? option === valueToLookup
            : option.value === valueToLookup,
        );

        if (!optionEntry) {
          return valueToLookup;
        }

        const optionLabel =
          typeof optionEntry === "string" ? optionEntry : optionEntry.label;
        return t(optionLabel, optionLabel);
      };

      if (formData[field.props.name] == null) {
        return null;
      }
      if (formData[field.props.name] instanceof dayjs) {
        const formattedDate = formData[field.props.name].format("YYYY-MM-DD");
        fieldValuesInModal = formattedDate;
      } else {
        fieldValuesInModal = lookupOptionLabel(formData[field.props.name]);
      }
      if (isChecked) {
        checkboxValue = t("app.shared.yes");
      } else {
        checkboxValue = t("app.shared.no");
      }
      if (field.id === 31) {
        fieldValuesInModal = checkboxValue;
      }

      if (field.id >= 5 && field.id <= 38) {
        otherFieldsInModal.push(
          <div
            className="mt-4 flex text-slate-700"
            key={`111field-${field.id}`}
          >
            <p className="flex-1" key={`label-${field.id}`}>
              {t(field.props.label, field.props.label)}
            </p>
            <p className="mr-5 flex-1" key={`value-${field.id}-${index}`}>
              {fieldValuesInModal}
            </p>
          </div>,
        );
      }

      if (field.id === 1) {
        type = formData.visaType;
      }

      if (field.id === 4 || field.id === 39) {
        let i;
        switch (type) {
          case "Entry":
            i = 0;
            break;
          case "Tourist":
            i = 1;
            break;
          case "Pilgrimage":
            i = 2;
            break;
          case "Political":
            i = 3;
            break;
          case "Transit":
            i = 4;
            break;
          case "Business":
            i = 5;
            break;
          case "Relative visit":
            i = 6;
            break;
          case "Tourist (Urgent)":
            i = 7;
            break;
          default:
            i = -1;
        }
        if (i !== -1) {
          visaCost = formData.visaCost[i];
        }
        costAndLocationInModal.push(
          <div className="relative mt-4 flex">
            <p key={`costAndLocation-${field.id}-label`}>
              {t(field.props.label, field.props.label)}
            </p>
            <p
              key={`costAndLocation-${field.id}-value`}
              className={`mr-8 font-semibold ${
                field.id === 39 ? "text-green-500" : null
              }`}
            >
              {field.id === 4
                ? lookupOptionLabel(formData[field.props.name])
                : visaCost}
            </p>
          </div>,
        );
      }
    });

    return sections;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    if (onFormSubmitted) {
      onFormSubmitted(formData);
    }
  };
  useEffect(() => {
    activeProgressRef.current = 2;
    onProgressStepChange?.(2);
  }, [onProgressStepChange]);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll(".form-section-block"));
    if (!blocks.length || !onProgressStepChange) {
      return undefined;
    }

    let ticking = false;

    const updateByScrollPosition = () => {
      const viewportAnchor = window.innerWidth < 640 ? 180 : 220;
      let nextProgressStep = 2;

      blocks.forEach((block) => {
        const blockTop = block.getBoundingClientRect().top;
        const mappedStep = Number(block.getAttribute("data-progress-step"));

        if (!Number.isNaN(mappedStep) && blockTop <= viewportAnchor) {
          nextProgressStep = mappedStep;
        }
      });

      if (nextProgressStep !== activeProgressRef.current) {
        activeProgressRef.current = nextProgressStep;
        onProgressStepChange(nextProgressStep);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateByScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateByScrollPosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onProgressStepChange]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col pb-24 sm:pb-0">
        {renderSections()}
        {step === 2 && (
          <>
            <div className="mb-8 hidden justify-end gap-3 px-4 sm:flex">
              <button
                className="min-h-12 rounded-[14px] border border-[#00B8C8] bg-white px-5 py-3 text-sm font-semibold text-[#1A6370] transition hover:bg-[#E0F7FA]"
                type="button"
                onClick={handlePrev}
              >
                {t("app.shared.actions.backToPrevious")}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="min-h-12 rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-7 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)] transition hover:-translate-y-[1px]"
              >
                {t("app.shared.actions.submitAndContinue")}
              </button>
            </div>
          </>
        )}
      </div>

      {step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 flex h-[72px] items-center justify-between border-t border-[#00B8C833] bg-white px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 sm:hidden">
          <button
            type="button"
            onClick={handlePrev}
            className="min-h-12 rounded-[14px] px-4 py-2 text-sm font-semibold text-[#1A6370]"
          >
            {t("app.shared.actions.back")}
          </button>
          <p className="text-xs font-bold text-[#1A6370]">
            {t("app.personalTravel.mobileStep")}
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="min-h-12 rounded-[14px] bg-gradient-to-br from-[#00B8C8] to-[#007A8A] px-5 py-2 text-sm font-bold text-white"
          >
            {t("app.shared.actions.submit")}
          </button>
        </div>
      )}

      <div className="flex">
        <div className="relative z-10 w-full">
          <FinalCheckModal
            open={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                    {t("app.shared.actions.confirm")}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-900">
                    {t("app.personalTravel.finalCheckQuestion")}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {t("app.personalTravel.reviewSummary")}
                  </p>
                </div>
                {/* close button moved into modal shell for consistent top-right placement */}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-6">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t("app.personalTravel.reviewDetailsTitle")}
                    </h3>
                    <div className="mt-5 space-y-4 text-slate-700">
                      {otherFieldsInModal}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t("app.personalTravel.costAndLocationTitle")}
                    </h3>
                    <div className="mt-4 space-y-4 text-slate-700">
                      {costAndLocationInModal}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {t("app.personalTravel.uploadedDocsTitle")}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {t("app.personalTravel.uploadedDocsSubtitle")}
                        </p>
                      </div>
                      <VscChecklist size={28} className="text-slate-500" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {Object.values(selectedFilesByField)
                        .flatMap((entry) => entry.files || [])
                        .map((file, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
                          >
                            <img
                              className="h-28 w-full object-cover"
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                            />
                          </div>
                        ))}
                      {!Object.values(selectedFilesByField).flatMap(
                        (entry) => entry.files || [],
                      ).length && (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                          {t("app.personalTravel.noUploadsYet")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600 shadow-sm">
                    {t("app.personalTravel.reviewNote")}
                  </div>
                </div>
              </div>
            </div>
          </FinalCheckModal>
        </div>
      </div>
    </>
  );
};

export default PersonalAndTravelInfoStep;
