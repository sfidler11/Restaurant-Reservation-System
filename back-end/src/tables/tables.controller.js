const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//below are validation functions for the tables

function validateData(req, res, next) {
    const datum = req.body.datum;
    const data = req.body.data;
    if(datum && datum.length > 0 || data) {
      return next();
    }
    next({
      status: 400,
      message: "Invalid data"
    })
  };

async function validateTableId(req, res, next) {
    const { table_id } = req.params;
    const tableExists = await tablesService.readTable(table_id);

    if(tableExists.length > 0) {
        res.locals.table = tableExists[0]; //sets a local variable to the table matching the table ID
        return next();
    }

    next({
        status: 404,
        message: `The table id ${table_id} does not exist`
    })
};

function validateTableName(req, res, next) {
    const { table_name } = req.body.data;

    if(table_name && table_name.length > 1) {
        return next();
    }

    next ({
        status: 400,
        message: "Please include a table_name that is longer than 1 character"
    });
};

function validateCapacity(req, res, next) {
    const { capacity } = req.body.data;

    if(capacity && capacity > 0 && Number.isInteger(capacity)) {
        return next();
    }

    next({
        status: 400,
        message: "Please include a numbered seating capacity greater than 0"
    });
};

function validateReservationId(req, res, next) {
    const { reservation_id } = req.body.data;

    if(reservation_id) return next();

    next({
        status: 400,
        message: "Please include a valid reservation_id"
    })
}

async function hasCapacity(req, res, next) {
    const { table_id } = req.params;
    const table = await tablesService.readTable(table_id);
    const { reservation_id } = req.body.data;
    const reservation = await reservationsService.listResById(reservation_id);

    if( table[0].capacity >= reservation.people ) {
        return next();
    }

    next({
        status: 400,
        message: "The reservation has too many people for this table's capacity"
    })
};

async function isOccupied(req, res, next) {
    const { table_id } = req.params;
    const table = await tablesService.readTable(table_id);
    if(table[0].reservation_id ===  null) {
        return next();
    }

    next({
        status: 400,
        message: "This table is occupied"
    })
}

async function isNotOccupied(req, res, next) {
    const { table_id } = req.params;
    const table = await tablesService.readTable(table_id);
    if(!(table[0].reservation_id ===  null)) {
        return next();
    }

    next({
        status: 400,
        message: "This table is not occupied"
    })
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    const existingReservation = await reservationsService.listResById(reservation_id);
    if(existingReservation) {
        return next();
    }
    next({
        status: 404,
        message: `The reservation id ${reservation_id} does not exist`
    })
}

async function reservationStatusCheck(req, res, next) {
    const { reservation_id } = req.body.data;
    const existingReservation = await reservationsService.listResById(reservation_id);
    if(existingReservation.status !== "seated") {
        return next();
    }

    next({
        status: 400,
        message: `Reservation ${reservation_id} is already seated`
    })
}

//end validation functions

//creates a new table for guests to sit at
async function createTable(req, res) {
    const resData = req.body.data;
    const newTable = await tablesService.createTable(resData);
    res.status(201).json({ data: newTable});
}

async function listTables(req, res) {
    const responseData = await tablesService.listTables();
    res.status(200).json({ data: responseData});
}

async function readTable(req,res) {
    const tableId = req.params.table_id;
    const responseData = await tablesService.readTable(tableId);
    res.status(200).json({ data: responseData})
}

async function seatTable(req, res) {
    const tableId = req.params.table_id;
    const reservationId = req.body.data.reservation_id;
    const responseData = await tablesService.seatTables(reservationId, tableId);
    res.status(200).json({ data: responseData});
}

async function unseatTable(req, res) {
    const tableId = req.params.table_id;
    const reservationId = res.locals.table.reservation_id;
    const responseData = await tablesService.unseatTable(tableId, reservationId)
    res.status(200).json({ data: responseData})
}

//lists the tables
module.exports = {
    list: [
        asyncErrorBoundary(listTables)
    ],

    create: [
        validateData,
        validateTableName,
        validateCapacity,
        asyncErrorBoundary(createTable)
    ],

    readTable: [
        asyncErrorBoundary(validateTableId), 
        asyncErrorBoundary(readTable)
    ],

    seatTable: [
        validateData,
        validateReservationId,
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(hasCapacity),
        asyncErrorBoundary(isOccupied),
        asyncErrorBoundary(reservationStatusCheck),
        asyncErrorBoundary(seatTable)
    ],
    unseatTable: [
        asyncErrorBoundary(validateTableId),
        asyncErrorBoundary(isNotOccupied),
        asyncErrorBoundary(unseatTable),
        asyncErrorBoundary(listTables),
    ]
}