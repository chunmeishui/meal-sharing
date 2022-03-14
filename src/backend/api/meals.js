const express = require("express");
const { limit, sum} = require("../database");
const router = express.Router();
const knex = require("../database");

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
router.use(express.json());



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
    const meals = await knex("meal");
    const inputNumber = Number(request.params.id);
    const maxIdOfMeal =Math.max(meals.map(meal => Number(meal.id)));
    if (isNaN(inputNumber)) {
      response.send("not a number")
    } 
    else if (inputNumber > maxIdOfMeal) {
      response.send(`the largest id is : ${maxIdOfMeal}`)
    }
    else {
      const specificMeal = meals.filter((meal) => meal.id == inputNumber);
      if (specificMeal.length > 0) {
        response.json(specificMeal);
      } else {
        response.send("no such meal,pls check the id")
      }
    }
  } catch (error) {
    throw error;
  }
});

// method 1 of post
router.post("/", async (request, response) => {
  try {
    const meals = await knex("meal").insert({
      title: "clasic dumpling",
      description: "very tasty flavor without spicy",
      location: "Lyngby",
      when: "2022-01-29",
      max_reservations: 50,
      price: 68,
      created_date: "2021-01-01"
    })
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

// //method 2 of post
router.post("/", async (request, response) => {
  try {
    const meals = await knex("meal");
    const postedMeal = meals.insert(
      {
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      when: request.body.when,
      max_reservations: request.body.max_reservations,
      price: request.body.price,
      created_date: request.body.created_date
    }
    )
    response.json(postedMeal);
  } catch (error) {
    throw error;
  }
});

// put method 1
router.put("/:id", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    const inputId = Number(request.params.id);
    const maxIdOfMeal =Math.max( meals.map(meal => meal.id));
    if (isNaN(inputId)) {
      response.send("Id is not number");
    }
    else if (inputId > maxIdOfMeal) {
      response.send(`the largest id is : ${maxIdOfMeal}`)
    }
    else {
      const updatedMeal = meals
        .where({ id: request.params.id })
        .update({
          title: "salad",
          description: "danlish way of salad",
          location: "Lyngby",
          when: "2022-01-29",
          max_reservations: 50,
          price: 68,
          created_date: "2021-01-01"
        });
      response.json(updatedMeal);
    }
  } catch (error) {
    throw error;
  }
});
//method 2  
router.put("/:id", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    const inputId = Number(request.params.id);
    const maxIdOfMeal =Math.max( meals.map(meal => meal.id));
    if (isNaN(inputId)) {
      response.send("Id is not number");
    }
    else if (inputId >maxIdOfMeal) {
      response.send(`the largest id is : ${maxIdOfMeal}`)
    }
    else {
      const updatedMeal = meals
        .where({ id: inputId })
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
    const maxIdOfMeal =Math.max( meals.map(meal => meal.id));
    if (isNaN(inputId)) {
      response.send("Id is not number");
    }
    else if (inputId > maxIdOfMeal) {
      response.send(`the largest id is : ${maxIdOfMeal}`)
    }
    else {
      const deletedMeal = meals
        .where({ id: request.params.id })
        .delete();
      response.json(deletedMeal);
    }
  } catch (error) {
    throw error;
  }
});


//GET api/meals/  Query parameters 

router.get("/", async (request, response) => {

  if ('maxPrice' in request.query) {
    try {
      const meals = await knex("meal").select("*");
      const maxPrice = Number(request.query.maxPrice);

      if (isNaN(maxPrice)) {
        response.send("not a number")
      } else {
        const cheapMeal = meals.filter(meal => meal.price <= maxPrice);
        if (cheapMeal.length > 0) {
          response.json(cheapMeal);
        }
        else {
          response.send("no such cheap meal")
        }
      }
    } catch (error) {
      throw error;
    }
  }

  if ('title' in request.query) {
    try {
      const meals = await knex("meal").select("*");
      const inputTitle = request.query.title.toLowerCase();
      const titleMached = meals.filter(meal => meal.title.toLowerCase().includes(inputTitle));

      if (titleMached.length > 0) {
        response.json(titleMached);
      }
      else {
        response.send("no meals title macthed here")
      }
    } catch (error) {
      throw error;
    }
  }

  if ('createdAfter' in request.query) {
    try {
      const meals = await knex("meal").select("*");
      const dateMacthedMeal = meals.filter(meal => {
        const mealDate = new Date(meal.created_date).getTime();
        const searchDate = new Date(request.query.createdAfter).getTime();
        return mealDate > searchDate;

      })
      if (dateMacthedMeal.length > 0) {
        response.json(dateMacthedMeal);
      } else {
        response.send("No such meal,Pls check the date")
      }
    } catch (error) {
      throw error;

    }
  }

  if ('limit' in request.query) {
    try {
      const meals = await knex("meal").select("*");
      const limitNum = Number(request.query.limit);

      if (isNaN(limitNum)) {
        response.send("not a number")
      }
      else if (limitNum > meals.length) {
        response.send(`there are just ${meals.length} meals`)
      } else {
        const limitedMeal = meals.slice(0, limitNum);
        response.json(limitedMeal);
      }

    } catch (error) {
      throw error;
    }
  }
  
// if ('availableReservations=true' in request.query) {

//   try {
//     const titleMatched = await knex('meal')
//     .join('reservation', 'meal.id', '=', 'reservation.meal_id')
//     .select(
//      ' meal.title',
//       'meal.max_reservations',
//       'when',
//       'meal.created_date',
//       'price',
//       knex.raw('SUM(reservation.number_of_guests) AS totalGuests'),
//       knex.raw('meal.max_reservations - SUM(reservation.number_of_guests) AS avaliableMeal') 
//         )
    
//     .where('meal.max_reservations', '>', 'SUM(reservation.number_of_guests)')
//     .groupBy('meal_id')
//     .having(
//     knex.raw('(meal.max_reservations - SUM(reservation.number_of_guests)) > 0'),
//     );
//    if (titleMatched) {
//      response.json(titleMatched)
//    }else{
//      response.send("no meals title matched")
//    }
    
//   } catch (error) {
//     throw (error)
//   }
// }

  if ('limit' in request.query && maxPrice in request.query) {
    try {
      const meals = await knex("meal").select("*");
      const limitNum = Number(request.query.limit);
      const maxPrice = Number(request.query.maxPrice);

      if (isNaN(limitNum)) {
        response.send("not a number");
      } else if (isNaN(maxPrice)) {
        response.send("not a number");
      } else {
        const limitMaxPrice = meals.filter((meal) => meal.price < maxPrice).slice(0, limitNum);
        if (limitMaxPrice.length > 0) {
          response.json(limitMaxPrice);
        } else {
          response.send("no meals matched")
        }
      }

    } catch (error) {
      throw (error)
    }

  }
  else{
    response.json(meals)
  }

});


module.exports = router;
