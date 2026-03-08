// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   // Use the same secret as your options.ts
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   });

//   const url = request.nextUrl;

//   // 1. If user is logged in and tries to access Auth pages
//   if (token) {
//     if (
//       url.pathname === "/" ||
//       url.pathname.startsWith("/signIn") ||
//       url.pathname.startsWith("/signUp") ||
//       url.pathname.startsWith("/verify")
//     ) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//   }

//   // 2. If user is NOT logged in and tries to access Dashboard
//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/signIn", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/signIn", "/signUp", "/", "/verify/:path*", "/dashboard/:path*"],
// };

import { auth } from "@/src/auth"; // Path to your auth.ts file
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthPage = ["/signIn", "/signUp", "/", "/verify"].some((path) =>
    nextUrl.pathname.startsWith(path),
  );

  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  // 1. If logged in and on an auth page -> go to dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // 2. If NOT logged in and on dashboard -> go to sign-in
  if (!isLoggedIn && isDashboardPage) {
    return NextResponse.redirect(new URL("/signIn", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
