import { deleteSession } from "@/utils/sessionManagement";
import { NextResponse } from "next/server";

/**
 * A POST HTTP method to log the user out
 *
 * @returns - request response
 */
export const POST = async () => {
  try {
    await deleteSession();

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Error in logout API:", error);

    return NextResponse.json(
      { message: "Logout attempt failed" },
      {
        status: 500,
      },
    );
  }
};
