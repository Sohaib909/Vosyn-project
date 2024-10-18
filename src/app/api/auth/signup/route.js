import { SIGNUP_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * A post method to create an account on VosynVerse
 *
 * @param {*} request - request details
 * @returns - request response
 */
export const POST = async (request) => {
  const requestBody = await request.json();

  const response = await axios.post(SIGNUP_URL, requestBody);

  // Forward the backend response as JSON
  return NextResponse.json(response.data, { status: response.status });
};
