import React from 'react';

const CustomLabel = ({ label }) => {
  return (
    <div className="sm:col-span-3 col-span-4 ml-2 sm:mt-2 mt-2 sm:text-end text-end ">
      <label className="text-gray-500 text-sm font-semibold mb-2">
        {label === 'عکس پشت کارت اقامت' ||
        label === 'کارت اقامت در صورت نیاز"' ||
        label === 'کارت اقامت' ||
        label === 'کد پستی' ||
        label === 'فوری' ||
        label === 'عکس مهر تمدید اعتبار گذرنامه' ? (
          <span></span>
        ) : (
          <span className="text-red-500" >* </span>
        )}
        {label}
      </label>
    </div>
  );
};

export default CustomLabel;
