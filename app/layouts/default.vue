<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import Navbar from "~/components/Navbar.vue";

const { user, fetchUserProfile } = useUser();

watch(
  user,
  () => {
    fetchUserProfile();
  },
  {
    deep: true,
    immediate: true,
  },
);

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
</script>

<template>
    <Navbar></Navbar>
    <div class="h-full flex px-8">
        <slot></slot>
    </div>
    <SpeedInsights />
</template>

<style>
* {
    font-family: "Inter", serif;
}

html {
    height: 100vh;
}

body,
#__nuxt {
    height: 100%;
}

body {
    background-color: #111;
    color: #fefefe;
}
</style>