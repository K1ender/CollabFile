<script setup lang="ts">
const { variant = "primary", size = "md" } = defineProps<Props>();

interface Props {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}
type Variants = {
  [variant in typeof variant]: string;
};
type Sizes = {
  [variant in typeof size]: string;
};

const IconClasses = computed(() => {
  const baseClasses =
    "h-auto inline-flex fw-semibold rounded transition-all text-center justify-center items-center";
  const variantClasses: Variants = {
    primary: "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-green-500 hover:bg-green-600 disabled:bg-green-300",
    danger: "bg-red-500 hover:bg-red-600 disabled:bg-red-300",
  };
  const sizeClasses: Sizes = {
    sm: "p-1",
    md: "p-2",
    lg: "p-4",
  };
  return [baseClasses, variantClasses[variant], sizeClasses[size]].join(" ");
});
</script>

<template>
    <button :class="IconClasses">
        <slot></slot>
    </button>
</template>