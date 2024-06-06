import axios from "axios";
import { notifications } from "@mantine/notifications";

const apiBaseUrl = "https://api.openweathermap.org/";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.info("[axiosInstance request] config", config);

    return config;
  },
  (error) => {
    console.info("[axiosInstance request] error", error);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.info("[axiosInstance response] response", response);

    if (response.status !== 200) {
      notifications.show({
        color: "red",
        title: "System has some problem",
        message: "Please try again later",
      });

      return false;
    }

    return response.data;
  },
  (error) => {
    console.info("[axiosInstance response] error", error);

    return Promise.reject(error);
  }
);

export default {};
