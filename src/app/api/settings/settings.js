import {
  SETTINGS_FETCH_URL,
  SETTINGS_UPDATE_URL,
} from "@/constants/URLs/constants";
import axios from "axios";

const axiosInstance = axios.create();

export const getUserSettings = async () => {
  const url = SETTINGS_FETCH_URL;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user settings:", error);
  }
};
export const updateSettings = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.patch(SETTINGS_UPDATE_URL, data, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating settings:", error);
  }
};
