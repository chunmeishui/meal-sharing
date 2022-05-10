import React from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FaUtensils } from "react-icons/fa";


function Nav() {
  return (
    <nav className="nav">
      <div className="logo">
        <FaUtensils />
      </div>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/meals">
          <li>Menu</li>
        </Link>
        <Link to="/reservation">
          <li>Reservations</li>
        </Link>
        <Link to="/reviews">
          <li>Reviews</li>
        </Link>
        <Link to="/contact">
          <li>Contact </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
