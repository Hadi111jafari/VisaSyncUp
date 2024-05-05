import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CustomLabel from './CustomLabel';

const CustomDropzone = ({
  handlePreview,
  selectedFiles,
  required,
  label,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      handlePreview(label, acceptedFiles);
    },
    [handlePreview, label]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="grid sm:grid-cols-10 grid-cols-12 sm:mt-2 mt-2">
      <div
        {...getRootProps()}
        className="sm:col-start-1 sm:col-span-7 col-start-1 col-span-8 sm:mt-1"
      >
        <div className="grid sm:grid-cols-2 grid-cols-2">
          <input className="" {...getInputProps()} required={required} />
          <div className="text-xs sm:text-xs text-slate-400 ml-2 mt-1.5">
            {selectedFiles.length > 0
              ? selectedFiles[0].name
              : 'عکس اپلود نشده'}
          </div>
          <button
            style={btn}
            className="sm:py-2  py-2 rounded-full border-0 text-xs sm:font-semibold
            text-white"
          >
            اپلود عکس
          </button>
        </div>
      </div>
      <CustomLabel label={label} />
    </div>
  );
};

const btn = {
  // backgroundColor: '#312e81',
  backgroundColor: 'rgb(37 99 235)',
};

export default CustomDropzone;
