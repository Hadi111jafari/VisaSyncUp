import React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { FaFlag } from 'react-icons/fa6';

const Instructions = ({ title, step, instructions }) => {
  return (
    <div
      className="sm:col-start-8 sm:col-span-5 text-white sm:h-fit h-fit instruction"
      dir="rtl"
    >
      <div>
        <h2 className="text-slate-200 animate-bounce">{step}</h2>
        <h1 dir="rtl" className="text-lg sm:text-2xl flex mb-2 font-semi-bold">
          <span className=" ml-2 mt-2">
            <FaFlag />
          </span>
          <span className="sm:mb-2 mb-1">{title}</span>
        </h1>

        <ul>
          {instructions.map((instruction, index) => (
            <li key={index} className="flex text-slate-200 text-sm">
              <FaDotCircle className="sm:size-2 mt-2 ml-2 sm:ml-2 sm:mt-2.5" />
              {instruction}
            </li>
          ))}
        </ul>
        {step === 'گام چهارم' ? (
          <div></div>
        ) : (
          <div className="flex text-slate-400">
            <p className="mt-8 sm:mt-8 ">مرحله بعدی</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mt-9 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;
