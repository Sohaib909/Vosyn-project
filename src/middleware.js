import { NextResponse } from "next/server";

export const middleware = (request) => {
  const isLoggedIn = false;

  const { pathname } = request.nextUrl;

  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/auth?type=login", request.url));
  }
};

export const config = {
  matcher: ["/", "/auth"], // Apply middleware to home and auth routes
};
