import React from 'react';

const CustomLabel = ({ label }) => {
  return (
    <div>
      <label className="text-gray-500 text-sm font-semibold mb-2">
        {label === 'عکس پشت کارت اقامت' ||
        (label === 'کارت اقامت در صورت نیاز"') ||
          (label === 'کارت اقامت') ||
          (label === 'کد پستی') ||
          (label === 'عکس مهر تمدید اعتبار گذرنامه') ? (
          <span></span>
        ) : (
          <span className="text-red-500">* </span>
        )}
        {label}
      </label>
    </div>
  );
};

export default CustomLabel;
