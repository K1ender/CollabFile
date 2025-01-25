<script setup lang="ts">
definePageMeta({
	skipAuth: true,
	middleware: ["url-check"],
});

const router = useRoute();
const id = router.params.id;

const { data, error, refresh } = await useFetch(`/api/url/check/${id}`);

let intervalId: number;

onMounted(() => {
	intervalId = window.setInterval(() => {
		refresh();
	}, 1000 * 60);
});

onBeforeUnmount(() => clearInterval(intervalId));

const fileRef = useTemplateRef("fileUpload");

const isLoading = ref(false);

async function uploadFile() {
	if (!fileRef?.value?.files || !fileRef.value.files[0]) return;

	if (fileRef.value.files[0].size > 100 * 1024 * 1024) {
		return;
	}

	isLoading.value = true;
	const response = await $fetch(`/api/file/upload/${id}`, {
		method: "POST",
		body: {
			fileName: fileRef.value.files[0].name,
			contentType: fileRef.value.files[0].type,
		},
	});

	if (!response?.fields) {
		return;
	}

	const formData = new FormData();
	for (const [key, value] of Object.entries(response.fields)) {
		formData.append(key, value as string);
	}
	formData.append("file", fileRef.value.files[0]);

	try {
		await $fetch(response.url, {
			method: "POST",
			body: formData,
		});
	} catch (error) {
		console.log(error);
	}

	navigateTo("/");
	isLoading.value = false;
}
</script>

<template>
	<div class="text-center flex flex-col items-center w-full h-full justify-center">
		<div v-if="error">
			<h1>404</h1>
			<p>File not found</p>
		</div>
		<div v-else class="flex flex-col">
			<h1>{{ id }}</h1>
			<p>Created by: {{ data?.userID }}</p>

			<p class="mt-4">Max file size: 100 MB </p>
			<input ref="fileUpload" type="file" />

			<Button :disabled="isLoading" @click="uploadFile" class="mt-6">
				{{ isLoading ? "Uploading..." : "Upload" }}
			</Button>
			<Button variant="link" class="text-blue-500 mt-2" to="/profile">Back</Button>
		</div>
	</div>
</template>