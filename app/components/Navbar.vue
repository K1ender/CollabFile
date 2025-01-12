<script setup lang="ts">
const opened = ref(false);

const { user } = useUser();
</script>

<template>
    <header
        class="flex bg-neutral-950 text-white px-8 py-6 md:py-4 rounded-b-2 flex-col md:flex-row md:items-center md:container mx-auto fixed left-0 right-0 w-full">
        <div class="flex flex-row justify-center">
            <NuxtLink @click="opened = false" to="/">CollabFile</NuxtLink>
            <Icon v-on:click="opened = !opened" name="meteor-icons:bars" size="1.5em"
                class="ml-auto cursor-pointer md:hidden" />
        </div>
        <nav :class="opened ? 'flex' : 'hidden'"
            class="w-full justify-end gap-4 md:flex flex-col mt-4 md:flex-row md:mt-0">
            <div class="flex flex-row gap-4" v-if="!user">
                <Button @click="opened = false" to="/auth/login" variant="link">Login</Button>
                <Button @click="opened = false" to="/auth/register" variant="primary">Register</Button>
            </div>
            <Button @click="opened = false" v-else variant="link" to="/profile">
                {{ user.username }}
            </Button>
        </nav>
    </header>
</template>