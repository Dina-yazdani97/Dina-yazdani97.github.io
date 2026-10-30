import { defineMiddleware } from 'astro:middleware';
import { AUTH_COOKIE_NAME, verifySessionToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Protect /keystatic and /api/keystatic routes
  if (pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')) {
    const sessionCookie = context.cookies.get(AUTH_COOKIE_NAME);
    const isAuthenticated = !!(sessionCookie?.value && verifySessionToken(sessionCookie.value));

    if (!isAuthenticated) {
      // If it's an API call, return 401 JSON
      if (pathname.startsWith('/api/')) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Admin authentication required' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      // If it's a browser request to /keystatic, redirect to the login portal
      const redirectParam = encodeURIComponent(pathname + url.search);
      return context.redirect(`/admin/login?redirect=${redirectParam}`);
    }
  }

  return next();
});
