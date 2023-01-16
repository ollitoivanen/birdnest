const express = require("express");
const router = express.Router();

const violatorsController = require("../controllers/violatorsController");

//Frontend makes a connection to this route
//to get violating drones.
router.get("/", violatorsController.start_updating_connection);

module.exports = router;
