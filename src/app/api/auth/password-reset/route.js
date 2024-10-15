import { RESET_PASSWORD_REQUEST } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * A post method to send email to user to reset password if they exist.
 *
 * @param {*} req - request details
 * @returns - request response
 */
export const POST = async (req) => {
  const { email } = await req.json();

  const response = await axios.post(RESET_PASSWORD_REQUEST, { email });

  // Forward the backend response as JSON
  return NextResponse.json(response.data, { status: response.status });
};
