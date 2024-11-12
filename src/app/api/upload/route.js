import { NextResponse } from "next/server";

export const POST = async () => {
  return NextResponse.json({ message: "posted" }, { status: 200 });
};
