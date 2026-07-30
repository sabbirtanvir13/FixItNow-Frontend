// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 

// const AUTH_ROUTES = ["/login", "/register"];



// // This function can be marked `async` if using `await` inside

// export async function proxy(request: NextRequest) {

//  const pathname = request.nextUrl.pathname;

//     const cookieStore = await cookies();

//     let accessToken = request.cookies.get("accessToken")?.value;
//     const refreshToken = request.cookies.get("refreshToken")?.value;

//     let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

//     const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;




// }





// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }
 
// export const config = {
//   matcher: [
    
//     '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'

//   ]

// }



// import { cookies } from 'next/headers';
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./components/service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/technicians",
  "/categories",
  "/about",
  "/contact",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  // Access Token Expired
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success && result.data?.accessToken) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });

      accessToken = newAccessToken;

      decodedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET as string
      );
    }
  }

  let userRole: string | null = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // Already Logged In
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "Admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (userRole === "Technician") {
      return NextResponse.redirect(new URL("/technician", request.url));
    } else if (userRole === "Customer") {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Login Required
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role Protection
  if (pathname.startsWith("/admin") && userRole !== "Admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/technician") &&
    userRole !== "Technician"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/customer") &&
    userRole !== "Customer"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};