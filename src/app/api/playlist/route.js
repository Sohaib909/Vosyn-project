import { PLAYLIST_URL } from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

/**
 *
 * @param {*} req - request
 * @returns - All the user's playlists
 */
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const data = {
    page: searchParams.get("page") || 1,
  };

  const queryParams = new URLSearchParams(data).toString();
  const playistUrl = `${PLAYLIST_URL}?${queryParams}`;

  const res = await axiosInstance.get(playistUrl);

  return NextResponse.json(res?.data, { status: res?.status });
};

/**
 * A method to add a new playlist
 *
 * @param {*} req - request
 * @returns -
 */
export const POST = async (req) => {
  const data = await req.json();

  const res = await axiosInstance.post(PLAYLIST_URL, data);

  return NextResponse.json(res?.data, { status: res?.status });
};

/**
 * A method to delete all the user's playlists
 *
 * @returns -
 */
export const DELETE = async () => {
  return NextResponse.json({ message: "Delete all playlists" });
};
