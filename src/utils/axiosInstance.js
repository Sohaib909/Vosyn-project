"use server";

import { decrypt } from "@/utils/sessionManagement";
import { deleteSession } from "@/utils/sessionManagement";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create();

// Set up axios interceptor for request headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const cookieStorage = cookies();

    // Read session cookie + extract auth token + attach token to Authorization header
    const cookie = cookieStorage.get("session")?.value;
    const session = await decrypt(cookie);
    if (session?.token) {
      config.headers.Authorization = `Token ${session.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Set up axios interceptor unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response === 403)
    ) {
      await deleteSession();
      // TODO: Handle redirect + error message display upon unauthorized request
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
