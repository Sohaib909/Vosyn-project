import { LIKE_AND_DISLIKE_COMMENT_URL } from "@/constants/URLs/constants.js";
import axiosInstance from "@/utils/axiosInstance.js";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { id } = params;
  const data = {};
  console.log("=======>", `${LIKE_AND_DISLIKE_COMMENT_URL}${id}/like/`);
  const response = await axiosInstance.post(
    `${LIKE_AND_DISLIKE_COMMENT_URL}${id}/like/`,
    data,
  );
  return NextResponse.json(response.data, { status: response?.status });
};
