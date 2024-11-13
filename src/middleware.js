import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = (request) => {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get("authToken");
  const { pathname } = request.nextUrl;

  // If user is not logged in and is trying to access protected routes, redirect to login
  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/auth?type=login", request.url));
  }

  // If user is logged in and tries to access the login page, redirect them to home
  if (isLoggedIn && pathname === "/auth") {
    return NextResponse.redirect(new URL("/home?tab=featured", request.url));
  }

  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/home?tab=featured", request.url));
  }
};

export const config = {
  matcher: ["/", "/auth", "/home"], // Apply middleware to home and auth routes
};
