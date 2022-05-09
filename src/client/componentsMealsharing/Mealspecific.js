import React, { useEffect, useState } from "react";
import "./Meal.css";
import ReservationSpecific from "./ReservationSpecific";

let id = 0;
let max_reservations = 0;
function Mealspecific({ match }) {
  const [fetchItem, setFetchItem] = useState([]);
  const id = match.params.id;
  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch(`http://localhost:3000/api/meals/${id}`);
    const data = await response.json();
    setFetchItem(data);
  };
  max_reservations = fetchItem.map((max) => max.max_reservations)[0];

  const titles = fetchItem.map((items, index) => (
    <div className=" mealSpecificTitle" key={index}>
      <div>
        <h2 className="specificMealTitle">{items.title}</h2>
      </div>
      <div className=" mealInfo">
        <h3>meal id : {items.id}.</h3>
        <h3>Description : {items.description}.</h3>
        <h3>location : {items.location}.</h3>
        <h3>when : {items.when}.</h3>
        <h3>price : {items.price}.</h3>
        <h3>created_date : {items.created_date}.</h3>
        <h2>max_reservations : {items.max_reservations}.</h2>
      </div>
    </div>
  ));

  return (
    <div className="mealspecific">
      <img src="https://www.hotel7dublin.com/wp-content/uploads/Hotel-7-Dublin-Outdoor-Area.jpg" />
      {titles}
      <ReservationSpecific id={id} max_reservations={max_reservations} />
    </div>
  );
}

export default Mealspecific;
