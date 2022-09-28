import { NextRequest, NextResponse } from "next/server"
import { parse } from "@app/middleware/utils"

export default async function AppMiddleware(req) {
  const { path } = parse(req);
  const authCookie = req.cookies.get('sb-access-token');
  console.log(authCookie);
  if (!authCookie && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (authCookie && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.rewrite(new URL(`/app${path}`, req.url));
}