import React from "react";
import { Navigate } from "react-router-dom";
import { Router } from "../../utils/path";

const Landing = () => {
  return <Navigate to={Router.login} />;
};

export default Landing;
