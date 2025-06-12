import { createMiddleware } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { shield, detectBot } from "@arcjet/next";

const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/transaction(.*)",
  "/account(.*)",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "GO_HTTP",
        "DOMAIN:fonts.googleapis.com",
        "DOMAIN:fonts.gstatic.com",
      ],
    }),
  ],
});

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId && isProtected(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Skip middleware for static files, including fonts
    '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot|css|js|html)).*)',
    '/(api|trpc)(.*)',
  ],
};
