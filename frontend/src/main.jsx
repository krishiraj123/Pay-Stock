import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import SendMoneySection from "./components/SendMoneySection.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/transfer" element={<SendMoneySection />} />
    </Routes>
  </BrowserRouter>
);
