export async function updateSupabaseCookie(event, session) {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function get_url_extension( url ) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}