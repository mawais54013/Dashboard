const axios = require("axios");
const router = require("express").Router();
const Weather = require("../../controller/weatherController");

const getCurrentWeather = (zip) => {
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=89fbdaee73a055b478d307a1d0d77d1d`)

}

const getForecast = (zip) => {
  return axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&APPID=89fbdaee73a055b478d307a1d0d77d1d`)

}
// Open Weather API
router.get("/", (req, res) => {
    axios.all([getCurrentWeather(req.query.zip), getForecast(req.query.zip)])
      .then(axios.spread(function(current, forecast){
      const combined = {current: current.data, forecast: forecast.data};
      res.json(combined);  
      }))
    .catch(err => res.status(422).json(err));
});

router.post("/create", Weather.create);

router.route("/list")
  .get(Weather.findAll)
  .post(Weather.update);

router.route("/favorite")
  .post(Weather.favorite)

module.exports = router;