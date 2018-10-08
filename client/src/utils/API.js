import axios from "axios";

export default {
  getWeather: function (query) {
    return axios.get("/api/weather", { params: {"zip": query} });
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