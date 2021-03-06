import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Reservations() {
  const [fetchData, setFetchData] = useState([]);
  const [seat, setSeat] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch(
      "/api/meals?availableReservations"
    );
    const data = await response.json();
    setFetchData(data);
  };

  const titles = fetchData.map((items, index) => {
    return (
      <div className="reservations" key={index}>
        <div className="reservation">
          <Link to={`meals/${items.id}`}>
            <h4>meal_id : {items.id}</h4>
            <h4>Meal: {items.title}</h4>
            <h4>Available reservations: {items.AvailableReservation}.</h4>

            <button>Add reservation</button>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="reservations">
      <Link to="/reservations">
        <button>view reservations history</button>
      </Link>
      <img src="https://messen-aars.dk/images/ImageRotation/ee2b1164-bc62-4220-a681-72ee012975f8.jpg"></img>
      <h1>
        Welcome <br />
        to
        <br /> Reservations
      </h1>
      {titles}
    </div>
  );
}

export default Reservations;
