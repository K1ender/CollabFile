<script setup lang="ts">
const { variant = "primary", size = "md" } = defineProps<Props>();

interface Props {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	to?: string;
}

type Variants = {
	[variant in typeof variant]: string;
};

type Sizes = {
	[variant in typeof size]: string;
};

const inputClasses = computed(() => {
	const baseClasses = "p-2 inline-flex border-2 text-black";
	const variantClasses: Variants = {
		primary: "border-blue-500",
		secondary: "border-green-500",
	};
	const sizeClasses: Sizes = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};
	return [baseClasses, variantClasses[variant], sizeClasses[size]].join(" ");
});

const model = defineModel();
</script>

<template>
    <input v-model="model" :class="inputClasses" />
</template>