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
import { Reviewsa } from "./componentsMealsharing/Reviewsa";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/meals" exact component={Meals} />
          <Route path="/meals/:id" exact component={Mealspecific} />
          <Route path="/reservation" exact component={Reservations} />
          <Route path="/reviews" exact component={Reviewsa} />
          <Route path="/add" exact component={AddMeal} />
          <Route path="/contact" exact component={Contact} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
