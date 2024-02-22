import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', signupData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      // Redirect to dashboard or another page upon successful signup
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto flex justify-center items-center h-screen">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={signupData.firstName}
                onChange={handleSignupChange}
                placeholder="First Name"
                className="w-full px-4 py-2 rounded-full border"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={signupData.lastName}
                onChange={handleSignupChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 rounded-full border"
                required
              />
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-full border"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-full border"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-full border"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-gray-600 bold">
            Login
          </Link>
        </p>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Signup;
