
import { VerifyEmail } from "./pages/Verification";
import { NotePage } from "./pages/Note";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogIn } from "./pages/Login";
import { Navbar } from "./components/Navbar";

import { RegistrationForm } from "./pages/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/notepage" element={<NotePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </>
  );
};

export default App