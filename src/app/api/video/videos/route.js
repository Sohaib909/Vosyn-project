import { VIDEO_LIST_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * A GET method to retrieve a list of videos with search query parameters
 *
 * @param {*} request - request details
 * @returns - request response
 */
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const urlParams = new URLSearchParams(searchParams).toString();

  const requestURL = `${VIDEO_LIST_URL}?${urlParams}`;

  // TODO: update to use axios instance/read token from cookie header
  const authToken = "invalid-token";
  const response = await axios.get(requestURL, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  // Forward the backend response as JSON
  return NextResponse.json(response.data, { status: response.status });
};
