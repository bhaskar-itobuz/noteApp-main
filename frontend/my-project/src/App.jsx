
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogIn } from "./pages/Login";

import { RegistrationForm } from "./pages/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </>
  );
};

export default App