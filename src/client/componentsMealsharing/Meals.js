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
    const response = await fetch("http://localhost:3000/api/meals");
    const Data = await response.json();
    setFetchData(Data);
  };
   let titles = null;
if (fetchData.length === 0) {
 titles = <p>no such meal</p>;
} else{
 titles= fetchData.map((items, index) => {
   return (
     <div className="mealTitle" key={index}>
       <FancyBorder>
         <div>
           <Link  to={`meals/${items.id}`}>
             <h2> {items.title}</h2>
             <h2> Id: {items.id}.</h2>
             <img src="https://www.sortiraparis.com/images/80/95878/693086-photos-mohamed-cheikh-top-chef-2021-a-la-pagode-de-cos-de-la-reserve.jpg" />
             <h4> {items.description}</h4>
             <h4>Price : {items.price}Kr</h4>
           </Link>
         </div>
         <div>
           {/* get all of the reviews of the meal */}
           <Link  to={`/reviews/${items.id}`}>
             <button className="addMealreview">reviews</button>
           </Link>
         </div>
       </FancyBorder>
     </div>
   );
 });

}


  // how to judge the input value is right or not. how about it will fetch nothing???
  useEffect(() => {
    mealSearch();
  }, [input]);

  const mealSearch = async () => {
    try {
      if (isNaN(input) && input !== "") {
        const fatchMeal = await fetch(
          `http://localhost:3000/api/meals?title=${input}`
        );
        const data = await fatchMeal.json();
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
      </div>
      <div className="addDeleteMeal">
        <Link  to="/add" className="addMeal">
          <button>ADD MEAL</button>
        </Link>
        <Link  to="/delete/:id" className="addMeal">
          <button>DELETE MEAL</button>
        </Link>
      </div>
    </div>
  );
}

export default Meals;
