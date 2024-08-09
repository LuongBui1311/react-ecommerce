import axios from "axios";

const accessToken = sessionStorage.getItem('accessToken');
const reqHeaders = (accessToken) ? {
  "Content-type": "application/json",
  "Authorization": `Bearer ${accessToken}`
} : {
  "Content-type": "application/json",
};

export default axios.create({
  baseURL: "http://localhost:8070",
  headers: reqHeaders
});