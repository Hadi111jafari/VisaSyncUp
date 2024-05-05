import React from 'react';
import { IoIosSave } from 'react-icons/io';

const Button = ({ type, handleNext }) => {
  return (
    <div >
      <button
        type={type}
        onClick={handleNext}
        className='flex sm:w-[315px] w-full justify-center mt-2 hover:text-white text-blue-600 font-bold border rounded-full py-2 px-4 hover:bg-blue-600  transition duration-300 ease-in-out transform hover:scale-105'
      >
        ثبت و ادامه
        <span className="ml-2 mt-0.5">
          <IoIosSave />
        </span>
      </button>
    </div>
  );
};

export default Button;
