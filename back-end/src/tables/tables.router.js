const router = require("express").Router();
const tablesController = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(tablesController.list)
    .post(tablesController.create)
    .all(methodNotAllowed);

router.route("/:table_id")
    .get(tablesController.readTable)
    .all(methodNotAllowed);

router.route("/:table_id/seat")
    .put(tablesController.seatTable)
    .delete(tablesController.unseatTable)
    .all(methodNotAllowed);

module.exports = router;