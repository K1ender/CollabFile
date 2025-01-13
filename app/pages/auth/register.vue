<script setup lang="ts">
const username = ref("");
const password = ref("");

const { register: createUser } = useUser();

const isLoading = ref(false);

async function register() {
    try {
        isLoading.value = true;
        await createUser(username.value, password.value);
        navigateTo("/profile")
    } catch (error) {
        console.log(error);
    }
    isLoading.value = false;
}
definePageMeta({
    skipAuth: true,
})

</script>

<template>
    <div class="md:container mx-auto h-full flex items-center justify-center flex h-full">
        <form @submit.prevent="register" class="flex flex-col gap-4 w-1/3 w-xs">
            <Input v-model="username" class="text-center" placeholder="Username" type="text" />
            <Input v-model="password" class="text-center" placeholder="Password" type="password" />
            <Button :disabled="isLoading">{{ isLoading ? "Loading..." : "Register" }}</Button>
        </form>
    </div>
</template>