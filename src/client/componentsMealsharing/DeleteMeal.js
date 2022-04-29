import "./Meal.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DeleteMeal = () => {
  const [id, setId] = useState();
  const [success, setSuccess] = useState();
  
  const onDeleteMeal =  () => {
    const inputId = Number(id);
   fetch(`http://localhost:3000/api/meals/${inputId}`, {
      method: "DELETE",
    });
    setSuccess("delete success")
  };

  return (
    <div className="deleteComponent">
      <div>
        <h1>DELETE MEAL</h1>
      </div>
      <div className="deleteImg">
        <img src="https://f057a20f961f56a72089-b74530d2d26278124f446233f95622ef.ssl.cf1.rackcdn.com/Blog/blog-article-header-6.jpg"></img>
      </div>
      <div>
        <h2>
          <label>
            meal_id to delete:
            <input
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
          </label>
        </h2>
      </div>
      <div>
        <button onClick={onDeleteMeal}>DELETE MEAL</button>
        <Link  to="/meals">
          {" "}
          <button>BACK TO MEAL</button>
        </Link>
        <h2>{success}</h2>
      </div>
    </div>
  );
};
