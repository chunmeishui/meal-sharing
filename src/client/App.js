import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./componentsMealsharing/Meal.css";
import Meals from "./componentsMealsharing/Meals";
import Home from "./componentsMealsharing/Home";
import Mealspecific from "./componentsMealsharing/Mealspecific";
import Reservations from "./componentsMealsharing/Reservations";
import Nav from "./componentsMealsharing/Nav";
import Footer from "./componentsMealsharing/Footer";
import Header from "./componentsMealsharing/Header";
import Contact from "./componentsMealsharing/Contact";
import { AddMeal } from "./componentsMealsharing/AddMeal";
import { Reviews } from "./componentsMealsharing/Reviews";
import { DeleteMeal } from "./componentsMealsharing/DeleteMeal";
import { ReviewSpecific } from "./componentsMealsharing/ReviewSpecific";
import AllReservations from "./componentsMealsharing/AllReservations";
import { NotFound } from "./componentsMealsharing/NotFound";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/meals" exact component={Meals} />
          <Route path="/meals/:id" component={Mealspecific} />
          <Route path="/reservation" exact component={Reservations} />
          <Route path="/reviews" exact component={Reviews} />
          <Route path="/reviews/:id" component={ReviewSpecific} />
          <Route path="/add" exact component={AddMeal} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/delete/:id" component={DeleteMeal} />
          <Route path="/reservations" exact component={AllReservations} />
          <Route path="*" component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
