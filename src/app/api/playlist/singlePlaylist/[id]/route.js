import {
  ADD_CONTENT_TO_PLAYLIST_URL,
  GET_CONTENT_IN_PLAYLIST,
} from "@/constants/URLs/constants";
import axiosInstance from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

/**
 *
 * @param {*} req - request
 * @param {*} param - playlist id
 * @returns - all media within playlist
 */
export const GET = async (req, { params }) => {
  const { id } = params;

  const { searchParams } = new URL(req.url);

  const data = {
    playlist_id: id,
    limit: searchParams.get("limit") || 4,
    order_by: searchParams.get("order_by") || "video_name",
    page: searchParams.get("page") || 1,
  };

  const queryParams = new URLSearchParams(data).toString();
  const playlistContentUrl = `${GET_CONTENT_IN_PLAYLIST}?${queryParams}`;

  const res = await axiosInstance.get(playlistContentUrl);

  return NextResponse.json(res.data, { status: res.status });
};

/**
 * A method to remove a media from a playlist
 *
 * @param {*} req - request
 * @param {*} param - playlist id
 * @returns -
 */
export const DELETE = async (req, { params }) => {
  const { id } = params;
  const data = await req.json();

  const res = await axiosInstance.delete(
    `${ADD_CONTENT_TO_PLAYLIST_URL}${id}/${data?.id}`,
  );

  if (res?.status === 204) return NextResponse.json({ status: 204 });

  return NextResponse.json(res?.data, { status: res?.status });
};

/**
 * A method to add a media to a playlist
 *
 * @param {*} req - request
 * @param {*} param - playlist id
 * @returns -
 */
export const POST = async (req, { params }) => {
  const { id } = params;
  const data = await req.json();

  const res = await axiosInstance.post(ADD_CONTENT_TO_PLAYLIST_URL, {
    content_id: data.id,
    playlist: id,
  });

  return NextResponse.json(res?.data, { status: res?.status });
};
