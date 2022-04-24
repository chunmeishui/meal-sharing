import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FancyBorder } from "./FancyBorder";

export function Reviewsa() {
  const [fetchData, setFetchData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [mealId, setMealId] = useState("");
  const [created, setCreated] = useState("");
  const [succeed, setSucceed] = useState("");

  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("http://localhost:3000/api/reviews");
    const Data = await response.json();
    setFetchData(Data);
  };
  const titles = fetchData.map((items, index) => {
    return (
      <div className="mealTitle" key={index}>
        <FancyBorder>
          <div>
            <Link exact to={`/meals`}>
              <h2> {items.title}</h2>
              <h4>meal_id : {items.meal_id}.</h4>
              <h4>Rating : {items.stars} - stars.</h4>
              <h4> {items.description}</h4>
              <h4>created_date : {items.created_date} </h4>
            </Link>
          </div>
        </FancyBorder>
      </div>
    );
  });
console.log(fetchData.length);
const addIdNew = fetchData.length + 1;
  const addReview = async (e) => {
    e.preventDefault();
    // const reviewData = fetchData.map((item) => item);
    // addid = reviewData[reviewData.length - 1].id;
    const addedReview = {
      id: addIdNew,
      title: title,
      description: description,
      stars: stars,
      created_date: created,
      meal_id: mealId,
    };
    console.log(addedReview);
    try {
      if (
        addedReview.title === "" ||
        addedReview.description === "" ||
        addedReview.stars === "" ||
        addedReview.created_date === "" ||
        addedReview.meal_id === ""
      ) {
        alert("Check the form");
      } else {
        const fetchPost = await fetch("http://localhost:3000/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addedReview),
        });
        await fetchPost.json();
        if (fetchPost.status === 200) {
          setSucceed(" add succeed");
          // setTitle("");
          // setDescription("");
          // setStars("");
          // setMealId("");
          // setCreated("");
        } else {
          setSucceed("error");
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="meals">
      <h1 className="content"> ADD REVIEWS</h1>
      <form onSubmit={addReview} className="addreview">
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            stars:
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            created:
            <input
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            mealId:
            <input
              type="number"
              value={mealId}
              onChange={(e) => setMealId(e.target.value)}
            ></input>
          </label>
        </div>
        <button className="addReviews" type="submit" onClick={addReview}>
          add reviews
        </button>
        <h3>{succeed}</h3>
      </form>

      <div className="allMeals">{titles}</div>
    </div>
  );
}
