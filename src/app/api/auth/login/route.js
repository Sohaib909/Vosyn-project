import { LOGIN_URL } from "@/constants/URLs/constants";
import { createSession } from "@/utils/sessionManagement";
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

  try {
    const response = await axios.post(LOGIN_URL, data);

    // Retrieve auth token from set-cookie header in login response
    const token = response.headers["set-cookie"]
      .find((cookie) => cookie.includes("token"))
      ?.match(new RegExp("^token=(.+?);"))?.[1];

    // Retrieve other user information from response to store in JWT
    const username = response?.data?.user?.username;
    const userId = response?.data?.user?.id;

    if (!token || !username || !userId) {
      return NextResponse.json(
        { message: "Error creating user session" },
        { status: 500 },
      );
    }

    await createSession({ token, username, userId }, "7d");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error in login API:", error.response);

    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status,
    });
  }
};
