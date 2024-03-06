import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';

const SaveButton = ({link}) => {
  return (
    <div>
      <Link
        to={link}
        className="mt-10 inline-block  hover:bg-green-500 hover:text-white text-green-500 border font-bold py-2 px-4 rounded flex items-center"
        style={{ width: '140px' }}
      >
        ثبت و ادامه
        <span className="ml-2">
          <IoIosSave />
        </span>
      </Link>
    </div>
  );
};

export default SaveButton;
