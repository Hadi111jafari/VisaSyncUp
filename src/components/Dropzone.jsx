import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiCamera, FiUploadCloud, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const CustomDropzone = ({
  handlePreview,
  selectedFiles,
  error,
  required,
  name,
  label,
}) => {
  const { t, i18n } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const firstError =
          fileRejections[0].errors[0]?.message ||
          t("app.shared.dropzone.invalidFile");
        handlePreview(name, [], firstError);
        return;
      }
      handlePreview(name, acceptedFiles, null);
    },
    [handlePreview, name, t],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 2 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  const uploadedFile = selectedFiles?.[0];
  const uploadError = error;

  const handleRemove = (e) => {
    e.stopPropagation();
    handlePreview(name, [], null);
  };

  const displayLabel = t(label, label);

  return (
    <div className="mb-5" dir={i18n.language === "fa" ? "rtl" : "ltr"}>
      <label className="mb-[6px] block text-[0.85rem] font-semibold text-[#0D3B42]">
        {required && <span className="mr-1 text-[#EF4444]">*</span>}
        {displayLabel}
      </label>
      <div
        {...getRootProps()}
        className={`relative overflow-hidden rounded-[20px] border-2 p-4 text-center transition ${
          uploadError
            ? "border-dashed border-[#EF4444] bg-[#FEE2E2]"
            : isDragActive
              ? "scale-[1.01] border-[#00B8C8] bg-[#E0F7FA]"
              : "border-dashed border-[#00B8C8] bg-[rgba(0,184,200,0.12)]"
        }`}
      >
        <input {...getInputProps()} required={required} />

        {!uploadedFile ? (
          <div className="flex flex-col items-center gap-2 py-5 text-[#007A8A]">
            <FiCamera className="text-4xl" />
            <p className="text-sm font-bold">
              {t("app.shared.dropzone.defaultLabel")}
            </p>
            <p className="text-xs text-[#1A6370]">
              {t("app.shared.dropzone.clickOrDrop")}
            </p>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#007A8A]">
              <FiUploadCloud />
              {t("app.shared.dropzone.typesMax")}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-fit flex-col items-center gap-2">
            <div className="relative">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt={uploadedFile.name}
                className="h-24 w-24 rounded-xl border border-[#00B8C833] object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -right-2 -top-2 rounded-full bg-[#0D3B42] p-1 text-white transition hover:bg-[#EF4444]"
                aria-label={t("app.shared.dropzone.removeFile")}
              >
                <FiX className="text-xs" />
              </button>
            </div>
            <p className="max-w-[220px] truncate text-xs font-semibold text-[#0D3B42]">
              {uploadedFile.name}
            </p>
          </div>
        )}
      </div>

      <p className="mt-[5px] text-[0.78rem] text-[#1A6370]">
        {t("app.shared.dropzone.hint")}
      </p>
      {uploadError && (
        <p className="mt-[5px] flex items-center gap-1 text-[0.78rem] text-[#EF4444]">
          <span>⚠</span>
          <span>{uploadError}</span>
        </p>
      )}
    </div>
  );
};

export default CustomDropzone;
