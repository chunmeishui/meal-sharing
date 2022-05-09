import "./Meal.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AddMeal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxreservation, setMaxreservation] = useState("");
  const [price, setPrice] = useState("");
  const [created, setCreated] = useState([]);
  const [meals, setMeals] = useState([]);
  const [succeed, setSucceed] = useState("");

  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("http://localhost:3000/api/meals");
    const data = await response.json();
    setMeals(data);
  };

  const onHandleReservation = async (e) => {
    const addId = meals.length + 1;
    const current = new Date();
    e.preventDefault();
    const newObj = {
      id: addId,
      title: title,
      description: description,
      location: "lyngby",
      when: current,
      max_reservations: maxreservation,
      price: price,
      created_date: created,
    };
    try {
      if (!isNaN(title) || !isNaN(description)) {
        alert("pls check the input format ");
      } else {
        setSucceed("");
        const fetchPost = await fetch("http://localhost:3000/api/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        });
        await fetchPost.json();

        //this is to judge wether succeed or not???? not working

        if (fetchPost.status === 200) {
          setSucceed(" added meal succeed");
          setTitle("");
          setDescription("");
          setMaxreservation("");
          setPrice("");
          setCreated("");
          setMeals("");
        } else {
          setSucceed("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" formMeal">
      <h1>Add meals</h1>
      <form onSubmit={onHandleReservation}>
        <div>
          <label>
            Meal Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </label>
        </div>

        <div>
          <label>
            Max seats:
            <input
              type="number"
              value={maxreservation}
              onChange={(e) => setMaxreservation(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Meal Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Meal Date:
            <input
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <div>
          <h3>Description:</h3>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add meal</button>
        <Link to="/meals">
          <button>BACK TO MEAL</button>
        </Link>
      </form>
      <h3>{succeed}</h3>
    </div>
  );
};
