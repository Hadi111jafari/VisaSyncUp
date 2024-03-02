import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

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
        redirect('/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto flex justify-center items-center h-screen">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Ex: hadi@gmail.com"
              className="w-full px-4 py-2 rounded-full border"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-full border"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600  transition duration-300 ease-in-out transform hover:scale-105"
          >
            Continue
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-gray-600 bold">
            Sign up
          </Link>
        </p>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
