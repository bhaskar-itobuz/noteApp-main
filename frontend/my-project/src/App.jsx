import { VerifyEmail } from "./pages/Verification";
import { NotePage } from "./pages/Note";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { RegistrationForm } from "./pages/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/notepage" element={<NotePage />} />
      </Routes>
    </>
  );
};

export default App