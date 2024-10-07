import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "Playlist get" });
};

export const POST = async () => {
  return NextResponse.json({ message: "Playlist post" });
};
