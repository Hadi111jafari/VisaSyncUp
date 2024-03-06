import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import CheckVisaRequirements from './components/VisaApplication/CheckVisaRequirements';
import FillVisaInformationForm from './components/VisaApplication/FillVisaInformationForm';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={<CheckVisaRequirements />} />
          <Route path="/visa-form" element={<FillVisaInformationForm />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
