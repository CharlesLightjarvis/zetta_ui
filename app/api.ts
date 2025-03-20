import axios from "axios";

const api = axios.create({
  baseURL: "http://zetta.test/api/v1", // LOCAL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  //   withCredentials: true,
  //   withXSRFToken: true,
});

export default api;
