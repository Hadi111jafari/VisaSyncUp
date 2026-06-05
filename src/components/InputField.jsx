import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const InputField = ({
  label,
  name,
  type,
  value,
  isChecked,
  onInputChange,
  handleCheckboxChange,
  options,
  instruction,
  required,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const direction = isRTL ? "rtl" : "ltr";
  const alignment = isRTL ? "text-right" : "text-left";
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState(value || "");
  const dropdownRef = useRef(null);

  const normalizedOptions = (options || []).map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
  const translatedOptions = normalizedOptions.map((option) => ({
    value: option.value,
    label: t(option.label, option.label),
  }));

  const isSearchable = Boolean(
    normalizedOptions.length > 0 && type !== "radio-group",
  );
  const isReadOnlyField =
    name === "nationalityDuplicate" ||
    name === "visaTypeDuplicate" ||
    name === "passportTypeDuplicate";

  const displayLabel = t(label, label);
  const displayInstruction = instruction ? t(instruction, instruction) : null;

  const baseInputClass =
    "w-full min-h-12 rounded-[14px] border border-[#00B8C833] bg-white px-4 py-3 text-sm text-[#0D3B42] shadow-[0_2px_8px_rgba(0,120,140,0.08)] transition placeholder:text-[#6B9EA6] focus:border-[#00B8C8] focus:outline-none focus:ring-4 focus:ring-[#00B8C826]";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const selectedOption = normalizedOptions.find(
      (option) => option.value === value,
    );

    if (selectedOption) {
      setQuery(t(selectedOption.label, selectedOption.label));
    } else {
      setQuery(value || "");
    }
  }, [value, normalizedOptions, t]);

  const handleInputChange = (e) => {
    const { name: fieldName, value: fieldValue } = e.target;
    setQuery(fieldValue);
    onInputChange(fieldName, fieldValue);

    if (isSearchable) {
      setShowDropdown(true);
    }
  };

  const selectOption = (nextValue) => {
    const selectedOption = normalizedOptions.find(
      (option) => option.value === nextValue,
    );
    setQuery(
      selectedOption
        ? t(selectedOption.label, selectedOption.label)
        : nextValue,
    );
    onInputChange(name, nextValue);
    setShowDropdown(false);
  };

  const filteredOptions = translatedOptions.filter((option) =>
    option.label.toLowerCase().includes((query || "").toLowerCase()),
  );

  let input;

  if (type === "radio-group") {
    input = (
      <div className="grid grid-cols-2 gap-2">
        {normalizedOptions.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onInputChange(name, option.value)}
              className={`min-h-12 rounded-[14px] border px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-transparent bg-gradient-to-br from-[#00B8C8] to-[#007A8A] text-white shadow-[0_8px_24px_rgba(0,184,200,0.35)]"
                  : "border-[#00B8C833] bg-white text-[#1A6370] hover:bg-[#E0F7FA]"
              }`}
            >
              {t(option.label, option.label)}
            </button>
          );
        })}
      </div>
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        className={`${baseInputClass} max-h-56 min-h-[110px] resize-y`}
        value={value || ""}
        name={name}
        onClick={() => isSearchable && setShowDropdown(true)}
        onChange={handleInputChange}
        dir={direction}
        required={required}
        disabled={isReadOnlyField}
      />
    );
  } else if (type === "checkbox") {
    const knobPositionClass = isRTL
      ? isChecked
        ? "left-1"
        : "right-1"
      : isChecked
        ? "right-1"
        : "left-1";

    input = (
      <label
        className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-[#00B8C833] bg-white px-4 py-3 text-sm font-semibold text-[#1A6370]"
        dir={direction}
      >
        <span className="min-w-0 flex-1 break-words">
          {t("app.inputField.urgentRequest")}
        </span>
        <span
          className={`relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition ${
            isChecked ? "bg-[#00979F]" : "bg-[#D1EDEE]"
          }`}
        >
          <span
            className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition ${knobPositionClass}`}
          />
        </span>
        <input
          type={type}
          name={name}
          className="hidden"
          checked={isChecked}
          onChange={handleCheckboxChange}
          dir={direction}
          required={required}
        />
      </label>
    );
  } else {
    input = (
      <input
        disabled={isReadOnlyField}
        type={type}
        name={name}
        className={`${baseInputClass} ${
          isReadOnlyField
            ? "cursor-not-allowed bg-[#F1F5F5] text-[#6B9EA6]"
            : ""
        }`}
        value={query || ""}
        onClick={() => isSearchable && setShowDropdown(true)}
        onChange={handleInputChange}
        dir={direction}
        required={required}
      />
    );
  }

  const showRequired = Boolean(required);

  return (
    <div className="mb-5" dir={direction}>
      <label className="mb-[6px] block text-[0.85rem] font-semibold text-[#0D3B42]">
        {showRequired && <span className="mr-1 text-[#EF4444]">*</span>}
        {displayLabel}
      </label>
      <div className="relative" ref={dropdownRef}>
        {input}
        {isSearchable && showDropdown && (
          <div className="custom-scrollbar absolute z-10 mt-2 max-h-52 w-full overflow-y-auto rounded-[14px] border border-[#00B8C833] bg-white shadow-[0_6px_24px_rgba(0,120,140,0.12)]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  type="button"
                  dir={direction}
                  key={`${option.value}-${index}`}
                  className={`block w-full border-b border-[#00B8C81A] px-4 py-3 ${alignment} text-sm font-medium text-[#1A6370] transition last:border-b-0 hover:bg-[#E0F7FA]`}
                  onClick={() => selectOption(option.value)}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-[#6B9EA6]">
                {t("app.inputField.noOptionFound")}
              </p>
            )}
          </div>
        )}
      </div>
      {instruction && (
        <p className="mt-[5px] flex items-center gap-1 text-[0.78rem] text-[#1A6370]">
          <span>ℹ</span>
          <span>{displayInstruction}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
