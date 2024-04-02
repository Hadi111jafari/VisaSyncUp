import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="sm:mt-60 text-center">
        <h1 className=" text-5xl font-bold text-white mb-8 animate-bounce">
          Welcome to Visa Registration Portal
        </h1>
        <p className=" text-lg text-white mb-8 animate-pulse">
          Register for your visa with ease and convenience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 m-5 sm:m-10">
          <Link
            to="/login"
            className="sm:col-start-4 sm:col-span-3 bg-slate-200 text-blue-600 text-center  font-semibold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-slate-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="sm:col-start-7 sm:col-span-3 bg-slate-200 text-blue-600 text-center  font-semibold py-2 px-4 rounded-full hover:bg-blue-600 hover:text-slate-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </Link>
          <Link
            to="/form"
            className="sm:col-start-4 sm:col-span-6 bg-slate-200 text-blue-600 text-center  font-semibold py-2 px-4 rounded-full hover:bg-blue-600 hover:text-slate-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Skip
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
