import axios from "axios";
import { ACCOUNT_LANGUAGE_URL} from "@/constants/URLs/constants";


const axiosInstance = axios.create();


export const getAccountLanguage = async () => {
    const url = ACCOUNT_LANGUAGE_URL;  
  
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



  export const updateAccountLanguage = async (data) => {
    try {
        const token = localStorage.getItem("token"); 
        const response = await axiosInstance.patch(ACCOUNT_LANGUAGE_URL, data, {
          headers: {
            Authorization: `Token ${token}`, 
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};