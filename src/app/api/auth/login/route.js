import { LOGIN_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * A POST HTTP method to log the user in
 *
 * @param {*} req - request details
 * @returns - request response
 */
export const POST = async (req) => {
  const { data } = await req.json();

  const response = await axios.post(LOGIN_URL, data);

  return NextResponse.json(response.data, { status: response.status });
};
