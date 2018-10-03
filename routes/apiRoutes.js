const axios = require("axios");
const router = require("express").Router();

// Open Weather API
router.get("/weather", (req, res) => {
    console.log(req.query)
  axios
    .get(`http://api.openweathermap.org/data/2.5/forecast?zip=${req.query.zip},us&units=imperial&APPID=89fbdaee73a055b478d307a1d0d77d1d`)
    .then(results => res.json(results.data))
    .catch(err => res.status(422).json(err));
});

// Github Jobs API
router.get("/jobs", (req, res) => {
    axios
        .get("https://jobs.github.com/positions.json?description=" + req.params.input1 +"&location="+{params: req.query.zip})
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
});

// Meetup Events API
router.get("/events", (req, res) => {
    axios
        .get("https://api.meetup.com/2/concierge?&sign=true&photo-host=public&city=san%20francisco&topic_category=javascript&page=20&key=73013e32b275d22c2f8060112746")
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
});

// Hacker News
router.get("/news", (req, res) => {
    axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
        for (let i = 0; i <= 10; i++) {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${results[i]}.json?print=pretty`)
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
        }
});

// Hacker Jobs
router.get("/hackerJobs", (req, res) => {
    axios
        .get("https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty")
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
        for (let i = 0; i <= 10; i++) {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${results[i]}.json?print=pretty`)
        .then(({ data: { results }}) => res.json(results))
        .catch(err => res.status(422).json(err));
        }
});

module.exports = router;
