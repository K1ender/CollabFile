<script setup lang="ts">
const { variant = "primary", size = "md", to } = defineProps<Props>()

interface Props {
    variant?: "primary" | "secondary" | "link"
    size?: "sm" | "md" | "lg",
    to?: string
}
type Variants = {
    [variant in typeof variant]: string;
}
type Sizes = {
    [variant in typeof size]: string;
}

const buttonClasses = computed(() => {
    const baseClasses = 'h-auto py-2 inline-flex px-4 fw-semibold text-white rounded transition-all text-center justify-center items-center';
    const variantClasses: Variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300',
        secondary: 'bg-green-500 hover:bg-green-600 disabled:bg-green-300',
        link: "text-white rounded-0 border-inset border-b-1 border-transparent hover:border-white",
    };
    const sizeClasses: Sizes = {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
    };
    return [baseClasses, variantClasses[variant], sizeClasses[size]].join(" ");
});
</script>

<template>
    <button v-if="!to" :class="buttonClasses">
        <slot></slot>
    </button>
    <NuxtLink v-else :to="to" :class="buttonClasses">
        <slot></slot>
    </NuxtLink>
</template>