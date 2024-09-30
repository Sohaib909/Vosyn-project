import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  return NextResponse.json({ message: `Text get by id: ${id}` });
};
