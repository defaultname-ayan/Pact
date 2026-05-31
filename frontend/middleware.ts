import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  // Define protected paths
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // Redirect unauthenticated users to the sign-in page
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config to target specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};
