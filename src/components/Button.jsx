import React from "react";
import { IoIosSave } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Button = ({ type, handleNext }) => {
  const { t } = useTranslation();

  return (
    <div>
      <button
        type={type}
        onClick={handleNext}
        className="mt-2 flex w-full transform justify-center rounded-full border px-4 py-2 font-bold text-blue-600 transition duration-300  ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white sm:w-[315px]"
      >
        {t("app.shared.actions.submitAndContinue")}
        <span className="ml-2 mt-0.5">
          <IoIosSave />
        </span>
      </button>
    </div>
  );
};

export default Button;
