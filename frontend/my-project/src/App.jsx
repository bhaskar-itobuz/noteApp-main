import { VerifyEmail } from "./pages/Verification";
import { NotePage } from "./pages/Note";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { RegistrationForm } from "./pages/SignUp";
import ProtectedRoutes from "./components/protectedRoute";
import Chatpage from "./pages/chat";
import FindUsertoChat from "./pages/selectUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/notepage" element={<NotePage />} />
        </Route>
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/chooseUser" element={<FindUsertoChat />} />
      </Routes>
    </>
  );
};

export default App