import { RESET_PASSWORD_REQUEST } from "@/constants/URLs/constants";
import axios from "axios";

export const POST = async (data) => {
  let res = await axios.post(RESET_PASSWORD_REQUEST, data);
  return res;
};
