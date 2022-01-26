import axios from "axios";
import { store } from "../store/store";
import { message } from "antd";

import { API_URL } from "../apis/const";

export const defaultAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const privateAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

privateAxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = store.getState().auth.access_token;
    config.headers.Authorization = "bearer " + authToken;
    return config;
  },
  (error) => {
    message.error(JSON.stringify(error.message));
  }
);

privateAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
      localStorage.clear();
    }
    message.error(JSON.stringify(error.message));
  }
);
