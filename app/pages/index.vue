<script setup lang="ts">
useSeoMeta({
  title: 'CollabFile',
  description: 'Share file from every place',
  ogTitle: 'CollabFile',
  ogDescription: 'Share file from every place',
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

definePageMeta({
  skipAuth: true,
})

</script>

<template>
  <div>
    <h1>CollabFile</h1>
  </div>
</template>