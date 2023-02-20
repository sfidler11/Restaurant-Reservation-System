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

function listResById(id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id : id})
        .first();
}

function updateStatus(id, newStatus) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: id})
        .update({ status : newStatus })
        .returning("*");
}

module.exports = {
    createReservation,
    listReservations,
    listResById,
    updateStatus,
}