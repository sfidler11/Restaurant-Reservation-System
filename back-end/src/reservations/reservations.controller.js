const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

//below are validation functions to confirm that a reservation has the appropriate name, number, date, and people parameters
function validateFirstName(req, res, next) {
  const { data: {first_name} = {} } = req.body;

  if(first_name && first_name.length > 0) {
    return next();
  }
  next({
    status: 400,
    message: 'first_name'
  })
};

function validateLastName(req, res, next) {
  const { data: {last_name} = {} } = req.body;

  if(last_name && last_name.length > 0) {
    return next();
  }
  next({
    status: 400,
    message: 'last_name'
  })
};

function validatePhone(req, res, next) {
  const { data : {mobile_number} = {}} = req.body;

  if(mobile_number && mobile_number.length > 0) {
    return next();
  }

  next({
    status: 400,
    message: 'mobile_number'
  })
};

function validateDate(req, res, next) {
  const {data : {reservation_date} = {}} = req.body;
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if(reservation_date && reservation_date.length > 0 && dateFormat.test(reservation_date)) {
    return next();
  }
  next({
    status: 400,
    message: 'reservation_date'
  })
};

function validateTime(req, res, next) {
  const {data : {reservation_time} = {}} = req.body;
  const timeFormat = /\d\d:\d\d/;
  if(reservation_time && reservation_time.length > 0 && timeFormat.test(reservation_time)) {
    return next();
  }

  next({
    status: 400,
    message: "reservation_time"
  })
};

function validatePeople(req, res, next) {
  const {data : {people} = {}} = req.body;
  if(typeof people == "number" && people > 0) {
    return next();
  }

  next({
    status: 400,
    message: "people"
  })
}

//end validation functions

async function newReservation(req, res) {
  const reservationData = await reservationsService.createReservation(req.body.data);
  console.log(reservationData);
  res.status(201).json({ data: reservationData});
};

async function listReservations(req, res) {
  const { date } = req.query;
  if (date) {
    const responseData = await reservationsService.listReservations(date);
    res.status(200).json({ data: responseData });
  } else {
    const responseData = await reservationsService.listReservations();
    res.status(200).json({ data: responseData });
  }
}

module.exports = {
  list: [asyncErrorBoundary(listReservations)],
  create: [validateFirstName, 
    validateLastName, 
    validatePhone, 
    validateDate, 
    validateTime, 
    validatePeople, 
    asyncErrorBoundary(newReservation)]
};
