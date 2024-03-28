import React from 'react';
import { IoIosSave } from 'react-icons/io';

const Button = ({ type, step, handleNext }) => {
  return (
    <div >
      <button
        type={type}
        onClick={handleNext}
        className={
          step >= 2
            ? 'flex sm:w-[197px] justify-center w-full bg-gray-100 hover:text-white text-green-500 font-bold border rounded-full py-2 px-4  hover:bg-green-600  transition duration-300 ease-in-out transform hover:scale-105'
            : 'flex sm:w-[315px] w-full justify-center mt-2 bg-gray-100 hover:text-white text-green-500 font-bold border rounded-full py-2 px-4  hover:bg-green-600  transition duration-300 ease-in-out transform hover:scale-105'
        }
      >
        ثبت و ادامه
        <span className="ml-2 mt-1.5">
          <IoIosSave />
        </span>
      </button>
    </div>
  );
};

export default Button;
