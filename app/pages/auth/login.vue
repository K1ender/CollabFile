<script setup lang="ts">

const username = ref("");
const password = ref("");

async function login() {
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
            }
        })
        navigateTo("/")
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="md:container mx-auto h-stretch flex items-center justify-center flex h-full">
        <form @submit.prevent="login" class="flex flex-col gap-4 w-1/3 w-xs">
            <Input v-model="username" class="text-center" placeholder="Username" type="text" />
            <Input v-model="password" class="text-center" placeholder="Password" type="password" />
            <Button>Login</Button>
        </form>
    </div>
</template>