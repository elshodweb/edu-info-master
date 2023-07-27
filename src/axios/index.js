import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://13.51.206.194/",
  
});

export default axiosInstance;