import axios from "axios";

let adminUrl = "https://api.escuelajs.co/api/v1";

if (process.env?.REACT_APP_ENV === "production") {
  adminUrl = "https://api.escuelajs.co/api/v1";
}

export const baseURL = adminUrl;

let axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async function (config) {
  const token =
    localStorage.getItem("access_token");
  if (token !== undefined || token !== null) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
