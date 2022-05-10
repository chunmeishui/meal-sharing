import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllReservations() {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("/api/reservations");
    const data = await response.json();
    setFetchData(data);
  };

  //it seems like not working????
  const onDeleteBookInfo = (meal_id) => {
    fetch(`http://localhost:3000/api/meals/${meal_id}`, {
      method: "DELETE",
    });
  };

  const titles = fetchData.map((items, index) => {
    return (
      <div className="reservationsout" key={index}>
        <div className="reservations">
          <div className="reservation">
            <h4>meal_id : {items.meal_id}.</h4>
            <h4>No of Guests: {items.number_of_guests}.</h4>
            <h4>created_date: {items.created_date} .</h4>
            <h4>phonenumber: {items.contact_phonenumber}.</h4>
            <h4>email: {items.contact_email}.</h4>

            {/* not working ???? */}
            <button onClick={onDeleteBookInfo(items.id)}>
              Delete reservation
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="reservations allReservations">
      <Link  to="/reservations">
        <button>All reservations history</button>
      </Link>
      <img src="https://messen-aars.dk/images/ImageRotation/ee2b1164-bc62-4220-a681-72ee012975f8.jpg"></img>
      <h1>
        Welcome <br />
        to <br />
        history
        <br /> Reservations
      </h1>
      {titles}
    </div>
  );
}

export default AllReservations;
