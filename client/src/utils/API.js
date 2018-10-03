import axios from "axios";

export default {
  getWeather: function (query) {
    return axios.get("/api/weather", { params: {"zip": query} });
  },

    getJobs: function (query) {
    return axios.get("/api/jobs", { params: { q: query.input1 } });
  },

    getEvents: function (query) {
    return axios.get("/api/events", { params: { q: query.input1 } });
  },

  getNews: function (query) {
    return axios.get("/api/news");
  },

  getHackerJobs: function (query) {
    return axios.get("/api/hackerJobs");
  }
};