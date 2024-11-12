"use server";

import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create();

// Set up axios interceptor for request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const cookieStorage = cookies();

    // Access the authToken cookie in the request handler and set the header
    const token = cookieStorage.get("authToken");

    if (token) {
      config.headers.Authorization = `Token ${token?.value}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
