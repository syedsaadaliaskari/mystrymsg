import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isPublicPage = request.nextUrl.pathname.startsWith("/user");
  if (isPublicPage) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [], // Matches nothing
};
