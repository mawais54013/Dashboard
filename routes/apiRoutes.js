const axios = require("axios");
const router = require("express").Router();
const cheerio = require("cheerio");
const request = require("request");
const reminderController = require("../controller/reminderController");

// News Scraper
router.get("/newsScrape", function(req, res) {
    console.log("tested here");
    request("https://news.ycombinator.com/", function(error, response, html) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);
  
      // An empty array to save the data that we'll scrape
      var newsResults = [];
  
      // With cheerio, find each td with the "title" class
  
      $(".storylink").each(function(i, element) {
        // console.log(element);
        var title = $(element).text();
        var link = $(element).attr("href");
  
        var articleInfo = {
          title: title,
          link: link
        };
  
        // time: time
        newsResults.push(articleInfo);
      });
  
      res.send(newsResults.slice(0, 10));
    });
  });


// Job Scraper
router.get("/jobScrape", function(req, res) {
    request("https://news.ycombinator.com/jobs", function(error, response, html) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(html);
  
      // An empty array to save the data that we'll scrape
      var jobResults = [];
  
      // With cheerio, find each td with the "title" class
  
      $(".storylink").each(function(i, element) {
        // console.log(element);
        var title = $(element).text();
        var link = $(element).attr("href");
  
        var jobInfo = {
          title: title,
          link: link
        };
  
        // time: time
        jobResults.push(jobInfo);
      });
  
      res.send(jobResults);
    });
  });

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
    console.log("hello", req.query);
    const queryURL = `https://jobs.github.com/positions.json?description=${req.query.q}&location=94118`;
    console.log(queryURL);
    axios
        .get(`https://jobs.github.com/positions.json?description=${req.query.q}&location=94118`)
        // .get("https://jobs.github.com/positions.json?description=" + req.params.input1 +"&location="+{params: req.query.zip})
        // .then(result => res.json(result.data))
        .then(results => {
            console.log(results.data)
            return res.json(results.data)})
        .catch(err => res.status(422).json(err)); 
});

// Meetup Events API
router.get("/events", (req, res) => {
    axios
        .get(`https://api.meetup.com/2/concierge?&sign=true&photo-host=public&city=${req.query.place}&topic_category=javascript&page=20&key=73013e32b275d22c2f8060112746`)
        .then(results => {
            console.log(results.data);
            return res.json(results.data)
        })
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
