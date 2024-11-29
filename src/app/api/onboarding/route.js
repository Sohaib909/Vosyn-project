import { ONBOARDING_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();

  try {
    const response = await axiosInstance.post(ONBOARDING_URL, data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error in onboarding API:", error.response);

    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status,
    });
  }
};
