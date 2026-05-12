import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ["/tile", "/my-profile"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  try {
    // Fetch from dedicated Node session API route to avoid BetterAuth REST interface 405 and MongoDB Edge issues
    const response = await fetch(`${request.nextUrl.origin}/api/verify-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const sessionData = await response.json().catch(() => null);

    if (!sessionData || !sessionData.user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/tile/:path*", "/my-profile/:path*"],
};
