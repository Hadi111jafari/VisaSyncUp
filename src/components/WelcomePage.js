import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-5xl font-bold text-white mb-8 animate-bounce">
        Welcome to Visa Registration Portal
      </h1>
      <p className="text-lg text-white mb-8 animate-pulse">
        Register for your visa with ease and convenience.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
