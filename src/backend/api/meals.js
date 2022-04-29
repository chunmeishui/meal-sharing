const express = require("express");
const { limit, sum } = require("../database");
const router = express.Router();
const knex = require("../database");

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

//basic way of get api
// router.get("/", async (request, response) => {
//   try {
//     const meals = await knex("meal").select("*");
//     response.json(meals);
//   } catch (error) {
//     throw error;
//   }
// });

router.get("/:id", async (request, response) => {
  try {
    const inputNumber = Number(request.params.id);
    if (isNaN(inputNumber)) {
      response.send("not a number");
    } else {
      const specificMeal = await knex("meal")
        .select("*")
        .where("id", request.params.id);
      response.json(specificMeal);
    }
  } catch (error) {
    throw error;
  }
});

//method 1 of post
router.post("/", async (request, response) => {
  try {
    const postedMeal = await knex("meal").select("*").insert({
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      when: request.body.when,
      max_reservations: request.body.max_reservations,
      price: request.body.price,
      created_date: request.body.created_date,
    });
    response.json(postedMeal);
  } catch (error) {
    throw error;
  }
});

// method 2 of post
// router.post("/", async (request, response) => {
//   try {
//     const meals = await knex("meal").insert({
//       title: "clasic dumpling",
//       description: "very tasty flavor without spicy",
//       location: "Lyngby",
//       when: "2022-01-29",
//       max_reservations: 50,
//       price: 68,
//       created_date: "2021-01-01",
//     });
//     response.json(meals);
//   } catch (error) {
//     throw error;
//   }
// });

//method 1 of put
router.put("/:id", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    const inputId = Number(request.params.id);
    const maxIdOfMeal = meals.map((meal) => meal.id);
    //get the max of array
    const largeNo = Math.max(...maxIdOfMeal);
    if (isNaN(inputId)) {
      response.send("Id is not number");
    } else if (inputId > largeNo) {
      response.send(`the largest id is : ${largeNo}`);
    } else {
      const updatedMeal = meals
        .where({ id: inputId })
        //update only title
        .update(request.body.title);
      response.json(updatedMeal);
    }
  } catch (error) {
    throw error;
  }
});

// delete
router.delete("/:id", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
     const inputId = Number(request.params.id);
    const maxIdOfMeal = meals.map((meal) => meal.id);
    const largeNo = Math.max(...maxIdOfMeal);
     if (isNaN(inputId)) {
   response.send("Id is not number");
   } 
   else if (inputId > largeNo) {
      response.send(`the largest id is : ${largeNo}`);
    } else {
      const deletedMeal = await knex("meal").where({ id: request.params.id }).delete();
      response.json(deletedMeal);
    }
  } catch (error) {
    throw error;
  }
});

router.get("/", async (request, response) => {
  let meals = knex("meal");

  if ("maxPrice" in request.query) {
    const maxPrice = Number(request.query.maxPrice);
    if (isNaN(maxPrice)) {
      return response.send("Not a number");
    } else {
      // titles = titles.filter((meal) => meal.price < maxPrice);
      meals = meals.where("meal.price", "<=", maxPrice);
    }
  }
// how about there is only meals in mealtable and don't have reservation now but still avalibale for book the seats.
  if ("availableReservations" in request.query) {
    meals = meals
      .join("reservation", "meal.id", "=", "reservation.meal_id")
      .select(
        "meal.id",
        "title",
        "max_reservations",
        knex.raw("SUM(number_of_guests) AS total_guests"),
        knex.raw(
          '(max_reservations-SUM(number_of_guests)) AS "AvailableReservation"'
        )
      )
      .where("max_reservations", ">", "number_of_guests")
      .groupBy("meal_id")
      .having(knex.raw("(max_reservations-SUM(number_of_guests)) > 0"));
  }

  if ("title" in request.query) {
    const title = request.query.title.toLowerCase();
    if (!isNaN(request.query.title)) {
      return response.send("Not a valid title");
    } else {
      meals = meals.where("meal.title", "like", "%" + title + "%");
      //filter((meal) => meal.title.toLowerCase().includes(title));
    }
  }

  if ("createdAfter" in request.query) {
    const createdAfter = new Date(request.query.createdAfter);
    // titles =titles.filter((meal) => meal.created_date < createdAfter);
    meals = meals.where("meal.created_date", "<", createdAfter);
  }

  if ("limit" in request.query) {
    const limit = Number(request.query.limit);
    if (isNaN(request.query.limit)) {
      return response.send("Not a number");
    } else {
      meals = meals.limit(limit);
      //meals = meals.slice(0,limit+1)
    }
  }

  try {
    const mealsResult = await meals;

    // return type should always be the same type
    if (mealsResult.length === 0) {
      response.json([]);
    } else {
      response.json(mealsResult);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
