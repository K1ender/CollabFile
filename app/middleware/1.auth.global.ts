export default defineNuxtRouteMiddleware(async (to) => {
	if (to.meta.skipAuth) return;

	const { user } = useUser();

	if (user.value?.isAuthenticated === false || !user.value?.isAuthenticated)
		return navigateTo("/auth/login");
});
