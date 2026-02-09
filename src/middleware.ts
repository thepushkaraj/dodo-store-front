import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  const currentLocale = request.cookies.get(COOKIE_NAME)?.value;
  if (currentLocale && locales.includes(currentLocale as (typeof locales)[number])) {
    return response;
  }

  response.cookies.set(COOKIE_NAME, defaultLocale, cookieOptions);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
