import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllReservations() {
  const [fetchData, setFetchData] = useState([]);
//   const [success, setSuccess] = useState();
  //   const [seat, setSeat] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [name, setName] = useState("");
  //   const [mail, setMail] = useState("");
  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("http://localhost:3000/api/reservations");
    const Data = await response.json();
    setFetchData(Data);
  };
  const onDeleteBookInfo = (e) => {
    //    const [id, setId] = useState();

    fetch(`http://localhost:3000/api/meals/${e}`, {
      method: "DELETE",
    });
    // setSuccess("delete success");
  };

  const titles = fetchData.map((items, index) => {
    return (
      <div className="reservationsout" key={index}>
        {/* <Link exact to={`meals/${items.id}`}> */}
        <div className="reservations">
          <div className="reservation">
            <h4>meal_id : {items.meal_id}.</h4>
            <h4>No of Guests: {items.number_of_guests}.</h4>
            <h4>created_date: {items.created_date} .</h4>
            <h4>phonenumber: {items.contact_phonenumber}.</h4>
            <h4>email: {items.contact_email}.</h4>
            <button onClick={onDeleteBookInfo(items.id)}>
              Delete reservation
            </button>
            {/* <h3>{success}</h3> */}
            {/* {addBookInfo} */}
          </div>
        </div>
        {/* </Link> */}
      </div>
    );
  });

  return (
    <div className="reservations">
      <Link exact to={"/reservations"}>
        <button>All reservations history</button>
      </Link>
      <img src="https://messen-aars.dk/images/ImageRotation/ee2b1164-bc62-4220-a681-72ee012975f8.jpg"></img>
      <h1>
        Welcome <br />
        to <br />
        histery
        <br /> Reservations
      </h1>
      {titles}
    </div>
  );
}

export default AllReservations;
