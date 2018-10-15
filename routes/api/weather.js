const axios = require("axios");
const router = require("express").Router();
const Weather = require("../../controller/weatherController");

// Open Weather API
router.get("/", (req, res) => {
    console.log(req.query)
  axios
    .get(`http://api.openweathermap.org/data/2.5/forecast?zip=${req.query.zip},us&units=imperial&APPID=89fbdaee73a055b478d307a1d0d77d1d`)
    .then(results => res.json(results.data))
    .catch(err => res.status(422).json(err));
});

router.post("/create", Weather.create);

router.route("/list")
  .get(Weather.findAll)
  .post(Weather.update);

module.exports = router;