export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    await $fetch(`/api/url/check/${to.params.id}`, {
      method: "GET",
    });
    return;
  } catch (error) {
    return abortNavigation();
  }
});
