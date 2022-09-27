import { NextRequest, NextResponse } from "next/server"
import { parse } from "@app/middleware/utils"
import { supabase } from "@lib/supabaseClient"

export default async function AppMiddleware(req) {
  const { path } = parse(req);
  const { data, error } = await supabase.auth.getSession();
  const session = data.session;
  if (!session && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.rewrite(new URL(`/app${path}`, req.url));
}