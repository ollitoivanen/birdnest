const express = require("express");
const router = express.Router();

//Frontend makes a connection to this route
//to get violating drones.
router.get("/violators", (req, res, next) => {});

module.exports = router;
