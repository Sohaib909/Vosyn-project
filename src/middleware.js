import { decrypt } from "@/utils/sessionManagement";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// A route is protected if its not public
const publicRoutes = ["/auth", "/forgot-password"];

export const middleware = async (request) => {
  // Determine if current route is protected or not
  const path = request.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);

  // Check user authentication state
  let isUserAuthenticated = false;
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (session?.userId) {
    isUserAuthenticated = true;
  }

  // If a user tries to access a protected route while they are not authenticated
  if (isProtectedRoute && !isUserAuthenticated) {
    return NextResponse.redirect(new URL("/auth?type=login", request.nextUrl));
  }

  // If a user tries to access a public route (e.g., login page) when they are already authenticated
  if (!isProtectedRoute && isUserAuthenticated) {
    return NextResponse.redirect(
      new URL("/home?tab=featured", request.nextUrl),
    );
  }

  return NextResponse.next();
};

// Do not apply middleware to API requests (/api/...), to files hosted in public, to _next/static, to _next/image, or to any .png file
export const config = {
  matcher: [
    "/((?!api|mediaFiles|sampleCaptions|_next/static|_next/image|.*\\.png$).*)",
  ],
};
