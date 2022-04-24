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
  const [reservation, setReservation] = useState([]);
  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch(
      "http://localhost:3000/api/meals?availableReservations"
    );
    const Data = await response.json();
    setFetchData(Data);
  };
  const addBookInfo = () => {return
    <>
      <form>
        <div>
          <label>
            seat:
            <input
              type="number"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            phone:
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            mail:
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            ></input>
          </label>
        </div>
      </form>
      ;
    </>;
  };
  const titles = fetchData.map((items, index) => {
    return (
      <Link exact to={`meals/${items.id}`}>
        <div className="reservations" key={index}>
          <div className="reservation">
            <h4>meal_id : {items.id}</h4>
            <h4>Meal: {items.title}</h4>
            <h4>Available reservations: {items.AvailableReservation} .</h4>
            <button onClick={addBookInfo}>Book</button>
            <Link />
            {addBookInfo}
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="reservations">
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
