export default defineNuxtRouteMiddleware(async (to) => {
  try {
    await $fetch(`/api/url/check/${to.params.id}`, {
      method: "GET",
    });
    return;
  } catch {
    return abortNavigation();
  }
});
