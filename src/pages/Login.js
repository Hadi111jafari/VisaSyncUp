import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', loginData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      if (!token) {
        redirect('/');
      } else {
        redirect('/form');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto flex justify-center items-center h-screen">
      <div className="w-full">
        <h2 dir="rtl" className="text-3xl font-bold mb-4">
          {t('Login')}
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="hadi@gmail.com"
              className="w-full px-4 py-2 rounded-full border text-right"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder={t('Password')}
              className="w-full px-4 py-2 rounded-full border text-right"
              required
            />
          </div>
          <button
            dir="rtl"
            type="submit"
            className="w-full bg-slate-200 text-blue-600 text-center  font-semibold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-slate-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t('Continue')}
          </button>
        </form>
        <p dir="rtl" className="m-2 text-slate-400">
          {t("Don't have an account?")}
          <Link to="/signup" className="text-slate-200 bold mr-2">
            {t('Sign up')}
          </Link>
        </p>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
