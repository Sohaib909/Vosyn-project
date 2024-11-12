import { VIDEO_DETAIL_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  const res = await axios.get(`${VIDEO_DETAIL_URL}${id}`);
  return NextResponse.json(res.data, { status: res?.status });
};
