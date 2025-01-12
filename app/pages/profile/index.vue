<script setup lang="ts">
const { user, logout: removeAuth } = useUser();

const app = useRequestURL();

async function logout() {
    try {
        await removeAuth();
        await navigateTo("/");
    } catch (e) {
        console.log(e);
    }
}

const { data, refresh } = useFetch("/api/user/avaliable_urls");

function getUploadURL(id: string) {
    return `${app.origin}/uploadFile/${id}`;
}

async function createTemporaryLink() {
    try {
        const { id } = await $fetch("/api/file/createTemporaryURL", {
            method: "POST"
        })

        if (!id) {
            throw new Error("Failed to create temporary URL");
        }
    } catch { }
    refresh();
}

let intervalId: number;

onMounted(() => {
    intervalId = window.setInterval(() => {
        console.log("Refreshing...");

        refresh();
    }, 1000 * 60);
})

onBeforeUnmount(() => clearInterval(intervalId));

const { data: files, status } = useFetch("/api/user/files");
</script>

<template>
    <div class="pt-21 flex flex-col items-center min-h-full">
        <h1 class="text-center text-3xl fw-semibold">Welcome back! {{ user?.username }}</h1>

        <Button @click="createTemporaryLink" class="my-2">Create temporary link</Button>
        <div>
            <h2>Avaliable links: </h2>
            <ul>
                <li v-for="link in data" :key="link.id" class="text-center">
                    <NuxtLink class="text-blue-500" :to="getUploadURL(link.id)">{{ link.id }}</NuxtLink>
                </li>
            </ul>
        </div>

        <div class="text-center">
            <h2>Your files: </h2>
            <ul v-if="files">
                <li v-for="file in files" :key="file.id" class="text-center">
                    <a class="text-blue-500" :href="`/api/file/download/${file.id}`">
                        {{ file.fileName }}
                    </a>
                </li>
            </ul>
            <p v-else-if="status === 'pending'">Loading...</p>
        </div>

        <Button class="mt-4" @click="logout">Logout</Button>
    </div>
</template>