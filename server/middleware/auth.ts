const publicRoutes = ["/api/auth/register", "/api/auth/login"];

export default defineEventHandler(async (event) => {
  if (publicRoutes.includes(event.path)) {
    return;
  }
  throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
});
