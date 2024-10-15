import { RESET_PASSWORD_REQUEST } from "@/constants/URLs/constants";
import axios from "axios";

/**
 *
 * @param {*} email - email to send the request to
 * @returns the response from backend
 */
export const POST = async (email) => {
  let res = await axios.post(RESET_PASSWORD_REQUEST, email);
  return res;
};
