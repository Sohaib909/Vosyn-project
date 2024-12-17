import { VIDEO_DETAIL_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    const response = await axiosInstance.get(`${VIDEO_DETAIL_URL}${id}`);

    return NextResponse.json(response.data, { status: response?.status });
  } catch (error) {
    return NextResponse.json(
      error?.response?.data || {
        message: "An error occurred while fetching video details",
      },
      {
        status: error?.response?.status || 500,
      },
    );
  }
};
