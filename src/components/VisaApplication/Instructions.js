import React from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { FaFlag } from 'react-icons/fa6';
import { instructions } from './constants';

const Instructions = ({ title, step }) => {
  return (
    <div className="sm:w-1/2 p-4 text-gray-500 md:p-10 instruction" dir="rtl">
      <div>
        <h2>{step}</h2>
        <h1 dir="rtl" className="text-2xl flex mb-2">
          <span className="ml-2 mt-2 text-green-500">
            <FaFlag />
          </span>
          {title}
        </h1>

        <ul>
          {instructions.map((instruction, index) => (
            <div className="flex">
              <RxDotFilled className="mt-2" />
              <li key={index}>{instruction}</li>
            </div>
          ))}
        </ul>
      </div>
      {step === 'گام چهارم' ? <div></div> : <p>مرحله بعدی</p>}
    </div>
  );
};

export default Instructions;
