const express = require("express");

const controller = require("./controller");

const router = express.Router();

router.route("/").get(controller.index);

module.exports = router;
