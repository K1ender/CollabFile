export default defineEventHandler((event) => {
  event.node.res.setHeader("X-Content-Type-Options", "nosniff");
  event.node.res.setHeader("X-Frame-Options", "DENY");
  event.node.res.setHeader(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );
  event.node.res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline';",
  );
});
