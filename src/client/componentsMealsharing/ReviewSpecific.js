import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";

export const ReviewSpecific = ({ match }) => {
  const id = match.params.id;
  const [fetchItem, setFetchItem] = useState([]);
  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    console.log(id);
    const response = await fetch(`http://localhost:3000/api/reviews/${id}`);

    const data = await response.json();
    setFetchItem(data);
  };
  const items = fetchItem.map((items, index) => (
    <div key={index} className="reviewSpecificInner">
      <h2>{items.title}</h2>
      <h3>meal id : {items.meal_id}.</h3>
      <h3>Description : {items.description}.</h3>
      <h3>Rating : {items.stars}.</h3>
    </div>
  ));
  return (
    <div className="reviewSpecific">
      <div className="reviewspecificImg">
        <img src="https://www.pngall.com/wp-content/uploads/9/Star-Review-Transparent.png"></img>
      </div>
      {items}
      <div className="reviewSpecificInner">
        <Link to="/reviews">
          <button>add review</button>
        </Link>
        <Link to="/meals">
          <button>back to meal</button>
        </Link>
      </div>
    </div>
  );
};
