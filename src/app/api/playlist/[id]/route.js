import { GET_PLAYLISTS_OF_CONTENT } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

/**
 *
 * @param {*} req - request
 * @param {*} params - videoId
 * @returns - list of playlists that a video is part of
 */
export const GET = async (req, { params }) => {
  const { id } = params;

  const res = await axiosInstance.get(
    `${GET_PLAYLISTS_OF_CONTENT}?content_id=${id}`,
  );

  return NextResponse.json(res?.data, { status: res?.status });
};
