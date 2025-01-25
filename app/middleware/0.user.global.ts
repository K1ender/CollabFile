export default defineNuxtRouteMiddleware(async (to) => {
	if (to.meta.skipAuth) return;

	if (import.meta.server) {
		const { user, fetchUserProfile } = useUser();

		if (user.value === null) {
			await fetchUserProfile();
		}
	}
});
