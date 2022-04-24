import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FancyBorder } from "./FancyBorder";

function Meals() {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("api/meals");
    const Data = await response.json();
    setFetchData(Data);
  };
  const titles = fetchData.map((items, index) => {
    return (
      <div className="mealTitle" key={index}>
        <FancyBorder>
          <Link exact to={`meals/${items.id}`}>
            <h2> {items.title}</h2>
            <h2> Id: {items.id}.</h2>

            <img src="https://www.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg" />
            <h4> {items.description}</h4>
            <h4>Price : {items.price}Kr</h4>
          </Link>
          <Link exact to={`/reviews`}>
            <button className="addMealreview">add review</button>
          </Link>
        </FancyBorder>
      </div>
    );
  });

  return (
    <div className="meals">
      <h1 className="content">Meals Menu</h1>
      <Link exact to={"/add"}> 
      <button>
      ADD MEAL
      </button>
      </Link>
      <div className="allMeals">{titles}</div>
    </div>
  );
}

export default Meals;
