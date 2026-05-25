import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /CHAOS or /Chaos (any case) to /chaos
  if (pathname.toLowerCase() === "/chaos" && pathname !== "/chaos") {
    const url = request.nextUrl.clone();
    url.pathname = "/chaos";
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(nl|en)/:path*",
    "/((?!_next|images|recepten|chaos|favicon.ico|api).*)",
  ],
};
