import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://education-a3o3.onrender.com/",
  
});

export default axiosInstance;