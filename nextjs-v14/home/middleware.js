
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const isProd = process.env.NODE_ENV === 'production'

  // based on https://github.com/vercel/next.js/blob/canary/examples/with-strict-csp/middleware.js
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    script-src 'self' localhost:3000 localhost:3002 http: https: ${isProd ? "" : `'unsafe-eval'`};
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  return response;
}
