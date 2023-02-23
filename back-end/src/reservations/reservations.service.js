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
        .whereNot({ status : "finished"})
        .andWhere({ reservation_date : date })
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
        .returning("*")
        .then((createdRecord) => createdRecord[0]);
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

  function updateReservation(updatedReservation, reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id : reservation_id })
        .update(updatedReservation, "*")
        .then((createdRecord) => createdRecord[0]);
  }

module.exports = {
    createReservation,
    listReservations,
    listResById,
    updateStatus,
    search,
    updateReservation,
}