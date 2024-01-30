var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json("Welcome to the Weather API!");
});

router.get("/city/:city", require("../controller/weather_controller"));

module.exports = router;
