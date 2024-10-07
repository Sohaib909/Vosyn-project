import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "Image get" });
};

export const POST = async () => {
  return NextResponse.json({ message: "Image post" });
};
