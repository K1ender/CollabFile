<script setup lang="ts">

</script>

<template>
    <header class="flex sticky bg-neutral-950 text-white px-8 py-4 rounded-lg  mx-4 mt-2 flex-col sm:flex-row">
        <div>
            <NuxtLink class="mt-2" to="/">CollabFile</NuxtLink>
            <img />
        </div>
        <nav class="flex w-full justify-end gap-4 flex-col mt-4">
            <Button to="/auth/login" variant="link">Login</Button>
            <Button to="/auth/register" variant="primary">Register</Button>
        </nav>
    </header>
</template>