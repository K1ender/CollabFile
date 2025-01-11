<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';

</script>

<template>
    <Navbar></Navbar>
    <slot></slot>
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
</style>