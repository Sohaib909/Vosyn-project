import { SETTINGS_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

/**
 *
 * @returns - all settings
 */
export const GET = async () => {
  const res = await axiosInstance.get(SETTINGS_URL);
  return NextResponse.json(res?.data, { status: res?.status });
};

/**
 *
 * @param {*} req - request
 * @returns - updated settings
 */
export const PATCH = async (req) => {
  const data = await req.json();
  const res = await axiosInstance.patch(SETTINGS_URL, data);
  return NextResponse.json(res?.data, { status: res?.status });
};
