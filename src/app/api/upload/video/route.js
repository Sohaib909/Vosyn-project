import { VIDEO_DETAIL_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const formData = await req.formData();

  try {
    const response = await axiosInstance.post(VIDEO_DETAIL_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error uploading video:", error.response);
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status,
    });
  }
};
