import { VIDEO_LIST_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const data = {
    sort_by: searchParams.get("sort_by") || "view_count",
    limit: searchParams.get("limit") || 15,
    page: searchParams.get("page") || 1,
  };

  const queryParams = new URLSearchParams(data).toString();
  const videoListUrl = `${VIDEO_LIST_URL}/?${queryParams}`;

  const res = await axiosInstance.get(videoListUrl);

  return NextResponse.json(res.data, { status: res.status });
};

export const POST = async () => {
  return NextResponse.json({ message: "Video post" });
};
