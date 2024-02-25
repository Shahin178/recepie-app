// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useDispatch } from "react-redux";
import { setSearchedRecipes } from "./../redux/Action";
import "./Navbar.css";

const Navbar = ({ searchRecipes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("app-user");
    navigate("/login");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (inputData.trim() === "") {
      return;
    } else {
      const data = inputData.trim();
      searchRecipes(data);
    }
    setInputData("");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left" onClick={navigateHome}>
        <img src={Logo} alt="Logo" className="navbar__logo" />
        <h2 className="navbar__title" style={{ textDecoration: "none" }}>
          Delighted
        </h2>
      </div>
      <form onSubmit={handleInput} className="navbar__mid">
        <input
          type="text"
          name="search"
          value={inputData}
          placeholder="What do you want to cook today?"
          className="navbar__search"
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul className="navbar__right">
        <li>
          <Link to="/saved">Saved Recipe</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
