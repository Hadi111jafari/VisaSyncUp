import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Monitor from "./pages/Monitor";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Form from "./components/Form";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicOnlyRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="mt-16 text-center text-white">Checking session...</div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute isAuthenticated={isSignedIn}>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute isAuthenticated={isSignedIn}>
                <Signup />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Applications />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitor"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Monitor />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Notifications />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Settings />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute isAuthenticated={isSignedIn}>
                <AuthenticatedLayout>
                  <Form />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sso-callback"
            element={
              <AuthenticateWithRedirectCallback
                signInForceRedirectUrl="/dashboard"
                signUpForceRedirectUrl="/dashboard"
              />
            }
          />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
