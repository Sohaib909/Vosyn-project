import { COMMENTS_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

/**
 *
 * @param {*} req - request
 * @returns - All comments on video
 */
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("video_id") || "";

  // Build query params for backend API
  const queryParams = new URLSearchParams({ video_id: videoId }).toString();
  const commentListUrl = `${COMMENTS_URL}?${queryParams}`;

  // Make request to backend API
  const res = await axiosInstance.get(commentListUrl);

  return NextResponse.json(res.data, { status: res.status });
};

/**
 * A method for posting a new comment
 *
 * @param {*} req - request
 * @returns -
 */
export const POST = async (req) => {
  const data = await req.json();

  const res = await axiosInstance.post(COMMENTS_URL, data);

  return NextResponse.json(res?.data, { status: res?.status });
};
