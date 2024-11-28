import { LOGIN_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { cookies } from "next/headers";
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

    if (response?.status === 200) {
      const cookieStore = cookies();
      cookieStore.set("authToken", response?.data?.token);
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error in login API:", error.response);

    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status,
    });
  }
};
