import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-6g30.onrender.com/api/",
});

export default api;
