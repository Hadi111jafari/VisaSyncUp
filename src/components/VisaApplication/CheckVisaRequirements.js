import React from 'react';
import InputDropdown from './InputDropdown';
import {
  visaTypes,
  passportTypes,
  nationality,
  visaCenterLocations,
  instructions,
} from './constants.js';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { RxDotFilled } from 'react-icons/rx';
import { FaFlag } from 'react-icons/fa6';

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
          <InputDropdown
            label="نوع ویزه ها"
            options={visaTypes}
            defaultValue="ورود"
          />
          <InputDropdown
            label="ملیت"
            options={nationality}
            defaultValue="افغان"
          />
          <InputDropdown
            label="نوع پاسپورت"
            options={passportTypes}
            defaultValue="عادی"
          />
          <InputDropdown
            label="مرکز مراجعه ویزه"
            options={visaCenterLocations}
            defaultValue="کابل"
            instruction="سفارت یا نمایندگی ایران که قصد تحویل مدارک و یا دریافت ویزه را دارید"
          />
        </div>

        <Link
          to="/visa-form"
          className="mt-10 inline-block  hover:bg-green-500 hover:text-white text-green-500 border font-bold py-2 px-4 rounded flex items-center"
          style={{ width: '140px' }}
        >
          ثبت و ادامه
          <span className="ml-2">
            <IoIosSave />
          </span>
        </Link>
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
