const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//below are validation functions to confirm that a reservation has the appropriate name, number, date, and people parameters
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

function validateFirstName(req, res, next) {
  //console.log(req.body);
  const { first_name } = req.body.data;

  if(first_name && first_name.length > 0) {
    return next();
  }
  next({
    status: 400,
    message: "Please edit your first_name."
  })
};

function validateLastName(req, res, next) {
  const { last_name } = req.body.data;

  if(last_name && last_name.length > 0) {
    return next();
  }
  next({
    status: 400,
    message: "Please edit your last_name."
  })
};

function validatePhone(req, res, next) {
  const { mobile_number} = req.body.data;

  if(mobile_number && mobile_number.length > 0) {
    return next();
  }

  next({
    status: 400,
    message: "Please include a valide mobile_number."
  })
};

function validateDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if(reservation_date && reservation_date.length > 0 && dateFormat.test(reservation_date)) {
    return next();
  }

  next({
    status: 400,
    message: "Please select a reservation_date."
  })
};

function validateTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const timeFormat = /\d\d:\d\d/;
  if(reservation_time && reservation_time.length > 0 && timeFormat.test(reservation_time) && reservation_time > "10:30" && reservation_time < "21:30") {
    return next();
  }

  next({
    status: 400,
    message: "Please include a valid reservation_time between 10:30 AM and 9:30 PM"
  })
};

function validatePeople(req, res, next) {
  const { people } = req.body.data;
  if(typeof people == "number" && people > 0) {
    return next();
  }

  next({
    status: 400,
    message: "Inclode the number of people in your party"
  })
}

function futureDateCheck(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const today = new Date();
  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);
  if(reservationDate > today) {
    return next();
  }

  next({
    status: 400,
    message: "Please select a future date."
  })
};

function closedOnTuesday(req, rest, next) {
  const { reservation_date } =  req.body.data;
  const thisReservation = new Date(reservation_date);
  const isTuesday = thisReservation.getUTCDay();
  console.log(isTuesday);
  console.log(thisReservation.getDay());
  if (isTuesday !== 2) {
    return next();
  }

  next({
    status: 400,
    message: "Sorry, we're closed on Tuesdays."
  })
}

function checkReservationStatus(req, res, next) {
  const { status } = req.body.data;
  if (!status || status === "booked") {
    return next();
  }

  next({
    status: 400,
    message: "The initial status must be 'booked, not 'seated' or 'finished"
  })
}

async function validateId(req, res, next) {
  const { reservation_id } = req.params;
  const thisResrvation = await reservationsService.listResById(reservation_id);
  if(thisResrvation) {
    return next();
  }

  next({
    status: 404,
    message: `The id ${reservation_id} does not exist`
  })
}

function validateStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "booked" || status === "finished" || status === "cancelled") {
    return next();
  }

  next({
    status: 400,
    message: `The status of ${status} cannot be accepted, please assign 'Booked', 'Seated', or 'Finished'`
  })
}

async function checkCurrentStatus (req, res, next) {
  const { reservation_id } = req.params;
  const thisReservation = await reservationsService.listResById(reservation_id);

  if(thisReservation.status !== "finished") {
    return next();
  }

  next({
    status: 400,
    message: "A finished reservation cannot be updated"
  })
}
//end validation functions

//after the validations are passed, creates a new resercation
async function newReservation(req, res) {
  const resData = req.body.data;
  const reservationData = await reservationsService.createReservation(resData);
  res.status(201).json({data: reservationData });
};

//lists reservations on the dashboard
async function listReservations(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  if (date) {
    const responseData = await reservationsService.listReservations(date);
    res.status(200).json({ data: responseData });
  } 

  else {
    if(mobile_number) {
      const responseData = await reservationsService.search(mobile_number);
      res.status(200).json({ data: responseData });
    }
    else {
    const responseData = await reservationsService.listReservations();
    res.status(200).json({ data: responseData });
    }
  }
}

//returns a reservation by a specific id
async function reservationById(req, res) {
  const id = await req.params.reservation_id;
  const reservation = await reservationsService.listResById(id);
  res.status(200).json({ data: reservation });
}

//updates the reservation status
async function updateReservationStatus(req, res) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;
  const resData = await reservationsService.updateStatus(reservation_id, status);
  res.status(200).json({ data: resData });
}

async function updateReservation(req, res) {
  const updatedReservation = {
    ...req.body.data,
  }
  const { reservation_id } = req.params;
  const resData = await reservationsService.updateReservation(updatedReservation, reservation_id);
  res.status(200).json({ data: resData });
}

module.exports = {
  list: [
    asyncErrorBoundary(listReservations)
  ],
  create: [
    validateData,
    validateFirstName, 
    validateLastName, 
    validatePhone, 
    validateDate, 
    validateTime, 
    validatePeople, 
    futureDateCheck,
    closedOnTuesday,
    checkReservationStatus,
    asyncErrorBoundary(newReservation)
  ],
  readId: [
    asyncErrorBoundary(validateId),
    asyncErrorBoundary(reservationById)
  ],
  updateStatus: [
    asyncErrorBoundary(validateId),
    validateStatus,
    asyncErrorBoundary(checkCurrentStatus),
    asyncErrorBoundary(updateReservationStatus)
  ],
  updateReservation: [
    asyncErrorBoundary(validateId),
    validateData,
    validateFirstName, 
    validateLastName, 
    validatePhone, 
    validateDate, 
    validateTime, 
    validatePeople, 
    futureDateCheck,
    closedOnTuesday,
    asyncErrorBoundary(updateReservation)
  ],
};
