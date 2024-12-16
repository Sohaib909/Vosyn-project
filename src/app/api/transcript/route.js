import { TRANSCRIPT_URL } from "@/constants/URLs/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Extract query parameters
    const { searchParams } = req.nextUrl;
    const videoId = searchParams.get("video");
    const language = searchParams.get("language") || "en";

    // Validate if videoId is provided
    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 },
      );
    }

    const url = `${TRANSCRIPT_URL}?video=${videoId}&language=${language}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transcript", details: error.message || error },
      { status: 500 },
    );
  }
};
