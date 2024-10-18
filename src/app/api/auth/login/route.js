import { LOGIN_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export const userLogin = async (data) => {
  let response = await axios.post(LOGIN_URL, data);
  return NextResponse.json(response.data, { status: response.status });
};
