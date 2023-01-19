const knex = require("../db/connection");

function createReservation(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdRecord) => createdRecord[0]);
}

function listReservations(date) {
    if (date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date : date })
        .orderBy("reservation_time");
    }
    else {
        return knex("reservations")
        .select("*")
    }
}

module.exports = {
    createReservation,
    listReservations,
}