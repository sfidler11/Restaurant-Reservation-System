const { KnexTimeoutError } = require("knex");
const { select } = require("../db/connection");
const knex = require("../db/connection");

function createTable(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdRecord => createdRecord[0]));
}

function listTables() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function readTable(tableId) {
    return knex("tables")
        .select("*")
        .where({ table_id : tableId });
    }

async function seatTables(reservationId, tableId) {
    try{
    const trx = await knex.transaction();
    return trx("tables")
        .select("*")
        .where({ table_id : tableId })
        .update({ reservation_id : reservationId })
        .then(() => {
            return trx("reservations")
                .select("*")
                .where({ reservation_id : reservationId })
                .update({ status: "seated" });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }
    catch(error) {
        return error;
    }
}

async function unseatTable(tableId, reservationId) {
    try{
        const trx = await knex.transaction();
        return trx("tables")
            .select("*")
            .where({ table_id : tableId })
            .update({ reservation_id : null })
            .then(function() {
                return trx("reservations")
                    .where({ reservation_id : reservationId })
                    .update({ status: "finished" });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        }
        catch(error) {
            return error;
        }
}

module.exports = {
    createTable,
    listTables,
    readTable,
    seatTables,
    unseatTable,
}