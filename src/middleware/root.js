import { NextRequest, NextFetchEvent, NextResponse } from "next/server"
import { parse } from "./utils.js"

export default function RootMiddleware(req, ev) {
  const { hostname } = parse(req);

  if (!hostname) {
    return NextResponse.next();
  }

//   if (
//     hostname === "dub.sh" ||
//     hostname === "preview.dub.sh" ||
//     hostname.endsWith(".vercel.app")
//   ) {
//     ev.waitUntil(redis.incr("dub.sh:root:clicks")); // increment root clicks (only for dub.sh)
//   } else {
//     ev.waitUntil(recordClick(hostname, req)); // record clicks on root page (if hostname is not dub.sh)
//   }

  if (
    hostname === "dub.sh" ||
    hostname === "preview.dub.sh" ||
    hostname.endsWith(".vercel.app")
  ) {
    return NextResponse.next();
  } else {
    const url = req.nextUrl;
    url.pathname = `/placeholder/${hostname}`; // rewrite to a /placeholder page unless the user defines a site to redirect to
    return NextResponse.rewrite(url);
  }
}