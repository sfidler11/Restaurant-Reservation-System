/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const reservationsController = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(reservationsController.list)
    .post(reservationsController.create)
    .all(methodNotAllowed);

router.route("/:reservation_id")
    .get(reservationsController.readId)
    .put(reservationsController.updateReservation)
    .all(methodNotAllowed);

router.route("/:reservation_id/status")
    .put(reservationsController.updateStatus)
    .all(methodNotAllowed);
    
module.exports = router;
