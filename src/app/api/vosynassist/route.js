import { VOSYN_ASSIST_CHAT } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();

    const res = await axiosInstance.post(VOSYN_ASSIST_CHAT, data);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
};
