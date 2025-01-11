<script setup lang="ts">
const { user, logout: removeAuth } = useUser();

async function logout() {
    try {
        await removeAuth();
        await navigateTo("/");
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <div class="pt-24 flex flex-col items-center">
        <h1 class="text-center text-3xl fw-semibold">Welcome back! {{ user?.username }}</h1>
        <Button class="mt-4" @click="logout">Logout</Button>
    </div>
</template>