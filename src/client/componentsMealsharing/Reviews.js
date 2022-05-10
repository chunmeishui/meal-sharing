import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Meal.css";
import { FancyBorder } from "./FancyBorder";

export function Reviews() {
  const [fetchData, setFetchData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [mealId, setMealId] = useState("");
  const [created, setCreated] = useState("");
  const [succeed, setSucceed] = useState("");
  const [inputReview, setInputReview] = useState("");

  useEffect(() => {
    fetchDataResult();
  }, []);

  const fetchDataResult = async () => {
    const response = await fetch("http://localhost:3000/api/reviews");
    const data = await response.json();
    setFetchData(data);
  };


    useEffect(() => {
      fetchSearchReviews();
    }, [inputReview]);

    const fetchSearchReviews = async () => {
      const response = await fetch(
        `http://localhost:3000/api/reviews?title=${inputReview}`
      );
      const data = await response.json();
      setFetchData(data);
    };
  const titles = fetchData.map((items, index) => {
    return (
      <div className="mealTitle" key={index}>
        <FancyBorder>
          <div>
            <Link to={`/reviews/${items.id}`}>
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

  const addReview = async (e) => {
    e.preventDefault();

    const addedReview = {
      title: title,
      description: description,
      stars: stars,
      created_date: created,
      meal_id: mealId,
    };
    console.log(addedReview);
    try {
      if (!isNaN(addedReview.title) || !isNaN(addedReview.description)) {
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
          setTitle("");
          setDescription("");
          setStars("");
          setMealId("");
          setCreated("");
        } else {
          setSucceed("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="meals">
      <form onSubmit={addReview} className="addreview">
        <div>
          <label>
            Title:
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
            Description:
            <input
              type="text"
              value={description}
              required
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
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Created date:
            <input
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Meal_Id:
            <input
              type="number"
              value={mealId}
              onChange={(e) => setMealId(e.target.value)}
              required
            ></input>
          </label>
        </div>
        <button className="addReviews" type="submit">
          add reviews
        </button>
        <Link to="/meals">
          <button>back to meal</button>
        </Link>
        <h3>{succeed}</h3>
      </form>
      <h1> All reviews</h1>
      <input
        placeholder="search review by title"
        value={inputReview}
        onChange={(e) => setInputReview(e.target.value)}
      ></input>
      <div className="allMeals">{titles}</div>
    </div>
  );
}
