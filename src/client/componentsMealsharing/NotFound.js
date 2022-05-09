import React from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

export const NotFound = ()=>{
return (
  <div className="notFound">
    <h2>Sorry!</h2>
    <h3>Not found this page</h3>
    <Link to={"/"}>
      <button>back to home page</button>
    </Link>
  </div>
);
}