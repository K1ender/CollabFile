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
    <div class="pt-21 flex flex-col items-center min-h-full">
        <h1 class="text-center text-3xl fw-semibold">Welcome back! {{ user?.username }}</h1>
        <Button class="my-2">Create temporary link</Button>

        <div>
            <h2>Your files: </h2>
            <ul></ul>
        </div>

        <Button class="mt-4" @click="logout">Logout</Button>
    </div>
</template>