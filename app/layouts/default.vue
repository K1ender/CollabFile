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
    <div class="grid h-full" :class="$style.component">
        <Navbar></Navbar>
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
</style>

<style module>
.component {
    grid-template-rows: 1fr auto;
}
</style>