<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';

const { user, fetchUserProfile } = useUser();

watch(user, () => {
    fetchUserProfile();
}, {
    deep: true,
    immediate: true
})
</script>

<template>
    <Navbar></Navbar>
    <div class="h-full">
        <slot></slot>
    </div>
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