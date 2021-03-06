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
    const reservations = await knex("reservation").select("*");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const specificReservation = await knex("reservation")
      .select("*")
      .where("id", request.params.id);
    response.json(specificReservation);
  } catch (error) {
    throw error;
  }
});
router.post("/", async (request, response) => {
  const date = new Date();
  try {
    const postedReservation = await knex("reservation").select("*").insert({
      number_of_guests: request.body.number_of_guests,
      created_date: date,
      contact_phonenumber: request.body.contact_phonenumber,
      contact_name: request.body.contact_name,
      contact_email: request.body.contact_email,
      meal_id: request.body.meal_id,
    });
    response.json(postedReservation);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const inputId = Number(request.params.id);
    if (isNaN(inputId)) {
      response.send("Id is not a number");
    }
    else {
      const current = new Date();
      const specificReservation = await knex("reservation")
        .select("*")
        .where({ id: request.params.id })
        .update({
          number_of_guests: request.body.number_of_guests,
          created_date: current,
          contact_phonenumber: request.body.contact_phonenumber,
          contact_name: request.body.contact_name,
          contact_email: request.body.contact_email,
          meal_id: request.body.meal_id,
        });
      response.json(specificReservation);
    }
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
 
    const inputId = Number(request.params.id);
    if (isNaN(inputId)) {
      response.send("Id is not a number");
    }

    else {
      const specificReservation = await knex("reservation")
        .select("*")
        .where({ id: request.params.id })
        .delete();
      response.json(specificReservation);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
