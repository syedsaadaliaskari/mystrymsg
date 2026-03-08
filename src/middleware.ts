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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   // We use getToken here instead of the 'auth' wrapper
//   // to avoid importing dbConnect into the Edge Runtime
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   });

//   const { nextUrl } = request;
//   const isLoggedIn = !!token;

//   const isAuthPage = ["/signIn", "/signUp", "/", "/verify"].some((path) =>
//     nextUrl.pathname.startsWith(path),
//   );

//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", nextUrl));
//   }

//   if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/signIn", nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/signIn", "/signUp", "/", "/verify/:path*", "/dashboard/:path*"],
// };
