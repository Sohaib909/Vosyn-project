import { VIDEO_LIST_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    const data = {
      sort_by: searchParams.get("sort_by") || "view_count",
      limit: searchParams.get("limit") || 15,
      page: searchParams.get("page") || 1,
    };

    const queryParams = new URLSearchParams(data).toString();
    const videoListUrl = `${VIDEO_LIST_URL}/?${queryParams}`;

    const response = await axiosInstance.get(videoListUrl);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      error?.response?.data || { message: "An error occurred" },
      {
        status: error?.response?.status || 500,
      },
    );
  }
};

export const POST = async () => {
  try {
    return NextResponse.json({ message: "Video post" });
  } catch (error) {
    return NextResponse.json(
      error?.response?.data || { message: "An error occurred" },
      {
        status: error?.response?.status || 500,
      },
    );
  }
};
