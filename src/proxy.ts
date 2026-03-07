import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const url = request.nextUrl;

  // for logged in users

  if (token) {
    const AuthPages =
      url.pathname === "/" ||
      url.pathname.startsWith("/signIn") ||
      url.pathname.startsWith("/signUp") ||
      url.pathname.startsWith("/verify");

    if (AuthPages) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  // for logout users

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/signIn", "/signUp", "/", "/verify/:path*", "/dashboard/:path*"],
};
