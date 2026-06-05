import React from "react";
import { useTranslation } from "react-i18next";

const CustomLabel = ({ label, required = true }) => {
  const { t } = useTranslation();
  const displayLabel = t(label, label);

  return (
    <div className="col-span-4 ml-2 mt-2 text-end sm:col-span-3 sm:mt-2 sm:text-end ">
      <label className="mb-2 text-sm font-semibold text-indigo-900">
        {required && <span className="text-red-500">* </span>}
        {displayLabel}
      </label>
    </div>
  );
};

export default CustomLabel;
