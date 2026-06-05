import React from "react";
import { useNavigate } from "react-router-dom";
import ComponentHomePage from "../components/HomePage";

const Home = () => {
  const navigate = useNavigate();

  return (
    <ComponentHomePage
      onSignIn={() => navigate("/login")}
      onSignUp={() => navigate("/signup")}
    />
  );
};

export default Home;
