import "./Meal.css";
import React, { useEffect, useState } from "react";

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
    const Data = await response.json();
    setMeals(Data);
  };

  const onhandleReservation = async (e) => {
    const addId = meals.length + 1;
    e.preventDefault();
    const newObj = {
      id: addId,
      title: title,
      description: description,
      location: "lyngby",
      when: "2022-02-23",
      max_reservations: maxreservation,
      price: price,
      created_date: created,
    };
    try {
      if (
        newObj.title === "" ||
        newObj.description === "" ||
        newObj.max_reservations === "" ||
        newObj.price === "" ||
        newObj.created_date === ""
      ) {
        alert("Check the form");
      } else {
        const fetchPost = await fetch("http://localhost:3000/api/meals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        });
        await fetchPost.json();
        if (fetchPost.status === 200) {
          setSucceed(" added mealsucceed");
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

      <form onSubmit={onhandleReservation}>
        <div>
          <label>
            Meal Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            ></input>
          </label>
        </div>
        <div>
          <label>
            Meal Price:
            <input
              type="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
          ></textarea>
        </div>
        <button type="submit">Add meal</button>
      </form>
      <h3>{succeed}</h3>
    </div>
  );
};
