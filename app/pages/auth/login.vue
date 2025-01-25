<script setup lang="ts">
const username = ref("");
const password = ref("");

const isLoading = ref(false);

const { login: addAuth } = useUser();

async function login() {
  try {
    isLoading.value = true;
    await addAuth(username.value, password.value);
    navigateTo("/profile");
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
}
definePageMeta({
  skipAuth: true,
});
</script>

<template>
    <div class="md:container mx-auto h-full flex items-center justify-center flex h-full">
        <form @submit.prevent="login" class="flex flex-col gap-4 w-1/3 w-xs">
            <Input v-model="username" class="text-center" placeholder="Username" type="text" />
            <Input v-model="password" class="text-center" placeholder="Password" type="password" />
            <Button :disabled="isLoading">{{ isLoading ? "Loading..." : "Login" }}</Button>
        </form>
    </div>
</template>