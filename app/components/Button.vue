<script setup lang="ts">
const {
  variant = "primary",
  size = "md",
  to,
  invertText,
} = defineProps<Props>();

interface Props {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  to?: string;
  invertText?: boolean;
}
type Variants = {
  [variant in typeof variant]: string;
};
type Sizes = {
  [variant in typeof size]: string;
};

const buttonClasses = computed(() => {
  const baseClasses =
    "h-auto py-2 inline-flex px-4 fw-semibold rounded transition-all text-center justify-center items-center";
  const variantClasses: Variants = {
    primary: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-green-500 hover:bg-green-600 disabled:bg-green-300",
    link: "rounded-0 border-inset border-b-1 border-transparent hover:border-white",
  };
  const sizeClasses: Sizes = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };
  const colorClasses = invertText ? "text-black" : "text-white";
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    colorClasses,
  ].join(" ");
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