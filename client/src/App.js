import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import DetailPage from "./pages/DetailPage";
import SavedRecipe from "./pages/SavedRecipe";

function App() {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/saved" element={<SavedRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
