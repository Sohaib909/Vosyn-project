import { SIGNUP_URL } from "@/constants/URLs/constants";
import { createSession } from "@/utils/sessionManagement";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * A post method to create an account on VosynVerse
 *
 * @param {*} request - request details
 * @returns - request response
 */
export const POST = async (request) => {
  try {
    const requestBody = await request.json();
    const response = await axios.post(SIGNUP_URL, requestBody);

    // Retrieve user information + auth token from response to store in JWT
    const token = response?.data?.token;
    const username = response?.data?.user?.username;
    const userId = response?.data?.user?.id;

    if (!token || !username || !userId) {
      return NextResponse.json(
        { message: "Error creating user session", sessionCreationFailed: true },
        { status: 201 },
      );
    }

    await createSession({ token, username, userId }, "1d");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error in signup API:", error.response);

    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status,
    });
  }
};
