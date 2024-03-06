import React from 'react';
import InputElement from './inputElement';
import {
  visaTypes,
  passportTypes,
  nationality,
  visaCenterLocations,
  instructions,
} from './constants.js';

import { RxDotFilled } from 'react-icons/rx';
import { FaFlag } from 'react-icons/fa6';
import SaveButton from './Button.js';

const CheckVisaRequirements = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center ">
      <div className="sm:w-1/2 p-4 m-5 md:m-20">
        <h1 className="text-center m-2 text-green-500 text-2xl">
          شایستگی دریافت ویزه ها
        </h1>
        <p className="text-right text-gray-500 text-sm">
          .در این مرحله، امکان دریافت ویزه ها برای ملیت انتخاب شده بررسی خواهد
          شد. لطفا قبل از تکمیل فرم درخواست، نکات مندرج در ستون سمت راست را
          مطالعه نمایید
        </p>
        <div className="flex flex-wrap justify-end mt-10 ">
          <InputElement
            label="نوع ویزه ها"
            options={visaTypes}
            defaultValue="ورود"
          />
          <InputElement
            label="ملیت"
            options={nationality}
            defaultValue="افغان"
          />
          <InputElement
            label="نوع گذرنامه"
            options={passportTypes}
            defaultValue="عادی"
          />
          <InputElement
            label="مرکز مراجعه ویزه"
            options={visaCenterLocations}
            defaultValue="کابل"
            instruction="سفارت یا نمایندگی ایران که قصد تحویل مدارک و یا دریافت ویزه را دارید"
          />
        </div>
        <SaveButton link="/visa-form" />
      </div>

      <div className="sm:w-1/2 p-4 text-gray-500 md:p-10 instruction" dir="rtl">
        <div>
          <h2 dir="rtl" className="text-2xl flex mb-2">
            <span className="ml-2 mt-2 text-green-500">
              <FaFlag />
            </span>
            نکاتی که قبل از درخواست ویزه ها باید بدانید:
          </h2>

          <ul>
            {instructions.map((instruction, index) => (
              <div className="flex">
                <RxDotFilled className="mt-2" />
                <li key={index}>{instruction}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckVisaRequirements;
