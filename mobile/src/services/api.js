import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.29:3000/api" // IP do PC
});

export default api;
