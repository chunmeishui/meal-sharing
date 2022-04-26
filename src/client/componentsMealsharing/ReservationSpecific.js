import React, { useEffect, useState } from "react";
import "./Meal.css";
import { Link } from "react-router-dom";

function ReservationSpecific({ id, max_reservations }) {
  const [fetchReservations, setFetchReservations] = useState([]);
  const [seat, setSeat] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [reservation, setReservation] = useState([]);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    fetchReservationResult();
  }, []);

  const fetchReservationResult = async () => {
    const response = await fetch(`http://localhost:3000/api/reservations`);
    const Data = await response.json();
    setFetchReservations(Data);
  };
  // get the number of guests
  const titles = fetchReservations
    .filter((item) => item.meal_id == id)
    .map((items) => Number(items.number_of_guests));
  const totalGuests = titles.reduce((current, total) => current + total, 0);
  const seatsLeft = max_reservations - totalGuests;

  const addReservation = async (e) => {
    e.preventDefault();
    const newObj = {
      number_of_guests: seat,
      contact_phonenumber: phone,
      contact_name: name,
      contact_email: mail,
      created_date: "2022-04-22",
      meal_id: id,
    };
    try {
      if (
        newObj.number_of_guests === "" ||
        newObj.contact_phonenumber === "" ||
        newObj.contact_name === "" ||
        newObj.contact_email === ""
      ) {
        alert("fill the form");
      } else {
        const fetchPost = await fetch("api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        });
        await fetchPost.json();
        if (fetchPost.status === 200) {
          setFeedback(" booked succeed");
        } else {
          setFeedback("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // display of reservation
  function bookSeats() {
    setReservation((previous) => [
      ...previous,
      {
        number_of_guests: seat,
        contact_phonenumber: phone,
        contact_name: name,
        contact_email: mail,
      },
    ]);
  }

  const addinfo = reservation.map((items, index) => (
    <div className="dispayReservation" key={index}>
      <h3>seats: {items.number_of_guests}</h3>
      <h3>phone: {items.contact_phonenumber}</h3>
      <h3>Name: {items.contact_name}</h3>
      <h3>email: {items.contact_email}</h3>
    </div>
  ));
  const apiDelete = `http://localhost:3000/api/meals/${id}`;
  const onDeleteMeal = () => {
    fetch(apiDelete, {
      method: "DELETE",
    });
    console.log(apiDelete);
  };
  return (
    <div className="ReservationsSpecific">
      <div className=" mealInfo">
        <h2>booked guests No : {totalGuests}.</h2>
        <h2>Avaliable Seats : {seatsLeft}.</h2>
        <h1>book seats now</h1>
        {seatsLeft > 0 ? (
          <div>
            <form onSubmit={addReservation} className=" reservationForm">
              <div>
                <label>
                  seat NO:
                  <input
                    type="number"
                    value={seat}
                    onChange={(e) => setSeat(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label>
                  phone NO:
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label>
                  Full name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label>
                  email Adress:
                  <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  ></input>
                </label>
              </div>
              <button onClick={bookSeats} type="submit">
                book seat
              </button>
              <p>{feedback}</p>
            </form>
            {addinfo}
          </div>
        ) : (
          <h1>No seats left now</h1>
        )}
        <Link exact to={`/meals`}>
          <button>back to meal</button>
        </Link>
        <button onClick={onDeleteMeal} className="deleteMealbtn">
          Delete meal
        </button>
      </div>
    </div>
  );
}
export default ReservationSpecific;
