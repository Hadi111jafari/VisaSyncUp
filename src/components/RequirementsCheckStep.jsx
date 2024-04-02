import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../state/formSlice.js';
import InputField from './InputField.jsx';
import { instructions, formFields } from './constants.js';
import Instructions from './Instructions.jsx';
import Button from './Button.jsx';
const RequirementsCheckStep = ({ handleNext }) => {
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    dispatch(updateFormData({ name, value }));
  };

  const fields_1_to_4 = formFields.slice(0, 4);
  const lastInstruction = instructions.slice(-1)[0];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 m-5 sm:m-10 text-sm">
        <div className="sm:col-start-2 sm:col-span-5 ">
          <h1 className="text-center m-2 text-white text-2xl font-black">
            شایستگی دریافت ویزه ها
          </h1>
          <p className="text-right text-slate-200 text-sm sm:mb-4 mb-4">
            .در این مرحله، امکان دریافت ویزه ها برای ملیت انتخاب شده بررسی خواهد
            شد. لطفا قبل از تکمیل فرم درخواست، نکات مندرج در ستون سمت راست را
            مطالعه نمایید
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
          {<Button type="button" handleNext={handleNext} />}
        </div>
        <Instructions
          title={lastInstruction.title}
          instructions={lastInstruction.content}
        />
      </div>
    </>
  );
};

export default RequirementsCheckStep;
