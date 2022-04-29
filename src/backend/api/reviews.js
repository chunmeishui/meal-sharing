const express = require("express");
const { max } = require("../database");
const router = express.Router();
const knex = require("../database");
// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

router.get("/", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const postReviews = await knex("review").select("*").insert({
      title: request.body.title,
      description: request.body.description,
      stars: request.body.stars,
      created_date: request.body.created_date,
      meal_id: request.body.meal_id,
    });
    response.json(postReviews);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    const inputId = Number(request.params.id);
    const newArray = reviews.map((review) => review.id);
    //get the largest number of id
    const maxIdOfReview = Math.max(...newArray);
    if (isNaN(inputId)) {
      response.send("not a number");
    } else if (inputId > maxIdOfReview) {
      response.send(`The max id is :${maxIdOfReview}`);
    } else {
      const speceficReview = await knex("review")
        .select("*")
        .where("meal_id", "=", inputId);
      response.json(speceficReview);
    }
  } catch (error) {
    throw error;
  }
});
router.put("/:id", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    const inputId = Number(request.params.id);
    const newArray = reviews.map((review) => review.id);
    //get the largest number of id
    const maxIdOfReview = Math.max(...newArray);

    if (isNaN(inputId)) {
      response.send("Id is not a number");
    } else if (inputId > maxIdOfReview) {
      response.send(`the largest id is : ${maxIdOfReview}`);
    } else {
      const specificReviews = await knex("review")
        .select("*")
        .where({ id: request.params.id })
        .update({
          title: request.body.title,
          description: request.body.description,
          stars: request.body.stars,
          crested_date: request.body.crested_date,
          meal_id: request.body.meal_id,
        });
      response.json(specificReviews);
    }
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    const inputId = Number(request.params.id);
    const newArray = reviews.map((review) => review.id);
    const maxIdOfReview = Math.max(...newArray);
    if (isNaN(id)) {
      response.send("Id is not a number");
    } else if (inputId > maxIdOfReview) {
      response.send(`the largest id is : ${maxIdOfReview}`);
    } else {
      const specificReviews = await knex("review")
        .select("*")
        .where({ id: request.params.id })
        .delete();
      response.json(specificReviews);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
