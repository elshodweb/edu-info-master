import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3456/",
  
});

export default axiosInstance;