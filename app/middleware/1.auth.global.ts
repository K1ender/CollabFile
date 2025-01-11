export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.meta.skipAuth) return;

  const { user } = useUser();

  if (user.value?.isAuthenticated === false || !user.value?.isAuthenticated)
    return navigateTo("/auth/login");
});
