import React from "react";
import { Link } from "react-router-dom";
import "./Meal.css";

function Nav() {
  return (
    <nav className="nav">
      <h3>Logo</h3>
      <ul className="nav-links">
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <Link to={'/meals'}>
          <li>Meals</li>
        </Link>
        <Link to={'/add'}>
          <li>Add Meal</li>
        </Link>
        <Link to={'/reservation'}>
          <li>Reservations</li>
        </Link>
        <Link to={'/reviews'}>
          <li>Reviews</li>
        </Link>
        <Link to={'/contact'}>
          <li>Contact </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
