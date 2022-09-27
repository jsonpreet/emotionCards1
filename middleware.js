import { NextRequest, NextFetchEvent, NextResponse } from "next/server"
import { AppMiddleware, RootMiddleware, } from "@app/middleware"
import { parse } from "@app/middleware/utils"
import {
  HOME_HOSTNAMES,
  RESERVED_KEYS,
  DEFAULT_REDIRECTS,
} from "@lib/constants"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|static|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req, ev) {
  const { hostname, key } = parse(req);
  const home = HOME_HOSTNAMES.has(hostname);
  const app = hostname === "app.dub.sh" || hostname === "app.localhost:3000";

  if (app) {
    return AppMiddleware(req);
  }

  if (key.length === 0) {
    return RootMiddleware(req, ev);
  }

  if (home) {
    if (DEFAULT_REDIRECTS[key]) {
      return NextResponse.redirect(DEFAULT_REDIRECTS[key]);
    }
    if (RESERVED_KEYS.has(key)) {
      return NextResponse.next();
    }
  }

 
}