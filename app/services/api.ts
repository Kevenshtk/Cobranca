import axios from "axios";

const apiN8N = axios.create({
  baseURL: "http://localhost:5678/webhook/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiN8N;