import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/sistema") && !token) {
    return NextResponse.redirect(new URL("/publico/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sistema/:path*"],
};
