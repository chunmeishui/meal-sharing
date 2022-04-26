import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FancyBorder } from "./FancyBorder";

function Meals() {
  const [fetchData, setFetchData] = useState([]);
  const [input, setInput] = useState("");

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
          <div>
            <Link exact to={`meals/${items.id}`}>
              <h2> {items.title}</h2>
              <h2> Id: {items.id}.</h2>

              <img src="https://www.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg" />
              <h4> {items.description}</h4>
              <h4>Price : {items.price}Kr</h4>
            </Link>
          </div>
          <div>
            <Link exact to={`/reviews/${items.id}`}>
              <button className="addMealreview">reviews</button>
            </Link>
          </div>
        </FancyBorder>
      </div>
    );
  });

  // how to judge the input value is right or not. how about it will fetch nothing???
  useEffect(() => {
    mealSearch();
  }, [input]);

  const mealSearch = async () => {
    try {
      if (isNaN(input) && input !== "") {
        const fatchMeal = await fetch(`api/meals?title=${input}`);
        const data = await fatchMeal.json();
        console.log(data);
        setFetchData(data);
      }
    
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="meals">
      <h1>Meals Menu</h1>

      <input
        type="text"
        placeholder=" search by meal name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <div className="allMeals">
        {titles}
        {fetchData.length === 0 && <p>no such meal</p>}
      </div>
      <div className="addDeleteMeal">
        <Link exact to={"/add"} className="addMeal">
          <button>ADD MEAL</button>
        </Link>
        <Link exact to={"/delete/:id"} className="addMeal">
          <button>DELETE MEAL</button>
        </Link>
      </div>
    </div>
  );
}

export default Meals;
