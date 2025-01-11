<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';

const { user, fetchUserProfile } = useUser();

onMounted(() => {
    fetchUserProfile();
})

watch(user, () => {
    if (user.value === null) return;
    fetchUserProfile();
}, {
    deep: true,
    immediate: true
})
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