<script setup lang="ts">
definePageMeta({
    skipAuth: true,
    middleware: ['url-check']
})

const router = useRoute()
const id = router.params.id

const { data, error, refresh } = await useFetch(`/api/url/check/${id}`)

let intervalId: number;

onMounted(() => {
    intervalId = window.setInterval(() => {
        console.log("Refreshing...");

        refresh();
    }, 1000 * 60);
})

onBeforeUnmount(() => clearInterval(intervalId));

const fileRef = useTemplateRef('fileUpload')

async function uploadFile() {
    if (!fileRef?.value?.files) return

    const file = fileRef.value.files[0];
    if (!file) return
    const formData = new FormData();
    formData.append('file', file);

    try {
        await $fetch(`/api/file/upload/${id}`, {
            method: 'POST',
            body: formData,
        });
        navigateTo('/')
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="text-center pt-22 flex flex-col items-center">
        <div v-if="error">
            <h1>404</h1>
            <p>File not found</p>
        </div>
        <div v-else class="flex flex-col">
            <h1>{{ id }}</h1>
            <p>Created by: {{ data?.userID }}</p>

            <input ref="fileUpload" type="file" />

            <Button @click="uploadFile" class="my-2">Upload</Button>


            <NuxtLink class="text-blue-500 mt-4" to="/">Back</NuxtLink>
        </div>
    </div>
</template>