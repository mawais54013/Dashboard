import axios from "axios";

export default {
  getWeather: function (query) {
    return axios.get("/api/weather", { params: {"zip": query} });
  },
  setupWeatherList: function (query) {
    return axios.post("/api/weather/create", {"zip": query});
  },
  getWeatherList: function () {
    return axios.get("/api/weather/list");
  },
  saveWeatherLocation: function (query) {
    return axios.post("/api/weather/list", {"zip": query});
  },
  setWeatherFavorite: function(query){
    return axios.post("/api/weather/favorite", query);
  },
  removeWeatherLocation: function (query) {
    return axios.post("/api/weather/remove", {"zip": query});
  },

  getJobs: function (query) {
    return axios.get("/api/jobs", { params: { q: query } });
    // return axios.get("/api/jobs");
  },

    getEvents: function (query) {
    return axios.get("/api/events", { params: { place: query } });
  },

  getNews: function (query) {
    return axios.get("/api/newsScrape");
  },

  getHackerJobs: function (query) {
    return axios.get("/api/jobScrape");
  },
  getReminders: function() {

    return axios.get("/api/reminders");
  },
  getReminder: function(id) {
    return axios.get("/api/reminders/" + id);
  },
  saveReminder: function(reminderData) {
    return axios.post("/api/reminders", reminderData);
  },
};