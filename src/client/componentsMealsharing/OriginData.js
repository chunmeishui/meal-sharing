import React from "react";
import "../App.css";
import "./Meal.css";
import { useContext } from "react";
// import {Link} from "react-router-dom";
export const OriginalData = React.createContext();
function Home() {
  const [fetchMeals, setFetchMeals] = useState([]);
  const [fetchReservations, setFetchReservations] = useState([]);
  const [fetchReviews, setFetchReviews] = useState([]);

  useEffect(() => {
    callFunction();
  }, []);

  const callFunction = () => {
    fetchMealResult();
    fetchReservationResult();
    fetchReviewsResult();
  };
  const fetchMealResult = async () => {
    const response = await fetch("http://localhost:3000/api/meals");
    const Data = await response.json();
    console.log(Data);
    setFetchMeals(Data);
  };
  const fetchReservationResult = async () => {
    const response = await fetch("http://localhost:3000/api/reservations");
    const Data = await response.json();
    console.log(Data);
    setFetchReservations(Data);
  };
  const fetchReviewsResult = async () => {
    const response = await fetch("http://localhost:3000/api/reviews");
    const Data = await response.json();
    console.log(Data);
    setFetchReviews(Data);
  };
  return (
    <>
      <div className="original">
        <h3>original Data</h3>
        <OriginalData.Provider
          value={{ fetchMeals, fetchReservations, fetchReviews }}
        >
          <Mealspecific />
          <Meals />
          <Reservations />
        </OriginalData.Provider>
      </div>
    </>
  );
}
