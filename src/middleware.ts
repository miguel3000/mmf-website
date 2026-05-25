import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();

  // /chaos any casing — redirect uppercase variants, skip i18n for exact
  if (lower === "/chaos") {
    if (pathname !== "/chaos") {
      const url = request.nextUrl.clone();
      url.pathname = "/chaos";
      return NextResponse.redirect(url, 302);
    }
    return NextResponse.next();
  }

  // Skip i18n for /recepten
  if (lower.startsWith("/recepten")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(nl|en)/:path*",
    "/((?!_next|images|favicon.ico|api).*)",
  ],
};
