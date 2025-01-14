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
        refresh();
    } catch (e) {
        console.error(e);
    }

}

let intervalId: number;

onMounted(() => {
    intervalId = window.setInterval(() => {

        refresh();
    }, 1000 * 60);
})

onBeforeUnmount(() => clearInterval(intervalId));

const deleteLink = async (id: string) => {
    try {
        await $fetch(`/api/url/${id}`, {
            method: "DELETE"
        })
        await refresh()
    } catch { }
}

const downloadFile = async (id: number) => {
    try {
        const url = await $fetch(`/api/file/download/${id}`, {
            method: "GET"
        })

        location.href = url
    } catch { }
}

const { data: files, status } = useFetch("/api/user/files");
</script>

<template>
    <div class="pt-21 flex flex-col items-center min-h-full w-full justify-center">
        <h1 class="text-center text-3xl fw-semibold">Welcome back! {{ user?.username }}</h1>

        <Button @click="createTemporaryLink" class="my-2">Create temporary link</Button>
        <div>
            <h2 class="text-center">Avaliable links: </h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                <li v-for="link in data" :key="link.id" class="flex items-center gap-2 bg-neutral-50 rounded p-2">
                    <NuxtLink class="text-blue-500 w-32" :to="getUploadURL(link.id)">{{ link.id }}
                    </NuxtLink>
                    <IconButton @click="deleteLink(link.id)" variant="danger">
                        <Icon name="mdi:trash-can"></Icon>
                    </IconButton>
                </li>
            </ul>
        </div>

        <div class="text-center mt-4">
            <h2>Your files: </h2>
            <ul v-if="files">
                <li v-for="file in files" :key="file.id" class="text-center">
                    <button class="text-blue-500" @click="downloadFile(file.id)">
                        {{ file.fileName }}
                    </button>
                </li>
            </ul>
            <p v-else-if="status === 'pending'">Loading...</p>
        </div>

        <Button class="mt-4" @click="logout">Logout</Button>
    </div>
</template>