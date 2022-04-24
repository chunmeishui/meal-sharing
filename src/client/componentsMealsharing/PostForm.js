import React,{Component,useState} from "react";

export function PostForm() {
    const [seat, setSeat] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [reservation, setReservation] = useState([]);
    bookSeats = ()=> {
       setReservation (prev=>{[
         ...prev,
         {
           number_of_guests: seat,
           // created_date: request.body.created_date,
           contact_phonenumber: phone,
           contact_name: name,
           contact_email: mail,
           // meal_id: request.body.meal_id,
           // number_of_guests: seat,
         },
       ];})

       const options = {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data)
       };
       fetch("http://localhost:3000/api/reservations", options);
    }
    return (
      <form onSubmit={bookSeats}>
        <div>
          <label for="seat">seats : </label>
          <input
            type="num"
            id="seat"
            name="seat"
            placeholder="No of guests"
            value={seat}
            onChange={(e) => setSeat({ [e.target.value]: e.target.value })}
          />
        </div>
        <div>
          <label for="phone"> phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            value={phone}
            onChange={(e) => setPhone({ [e.target.value]: e.target.value })}
          />
        </div>
        <div>
          <label for="lname">name : </label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={name}
            onChange={(e) => setName({ [e.target.value]: e.target.value })}
          />
        </div>
        <div>
          <label for="email">email : </label>
          <input
            type="email"
            id="email"
            name="email"
            value={mail}
            onChange={(e) => setMail({ [e.target.value]: e.target.value })}
          />
        </div>
        <button
          // onClick={bookSeats}
          type="submit"
        >
          book seat
        </button>
      </form>
    );

}