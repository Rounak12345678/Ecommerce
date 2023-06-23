import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Header from "../Layout/Header";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";

export default function Routing() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}
