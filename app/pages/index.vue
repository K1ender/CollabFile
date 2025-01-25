<script setup lang="ts">
useSeoMeta({
	title: "CollabFile",
	description: "Share file from every place",
	ogTitle: "CollabFile",
	ogDescription: "Share file from every place",
});

useHead({
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});

definePageMeta({
	skipAuth: true,
});
</script>

<template>
  <div class="md:container flex mx-auto items-center justify-center text-center">

    <div class="flex flex-col items-center gap-4">
      <Icon size="64" name="line-md:download-loop" />
      <h1 class="text-3xl fw-semibold">Collab File - Share file from every place</h1>
      <Button to="/auth/register">Get started</Button>
    </div>


  </div>
</template>