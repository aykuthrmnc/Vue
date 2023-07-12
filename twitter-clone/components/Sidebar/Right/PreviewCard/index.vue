<template>
  <div :class="twitterBorderColor" class="m-2 border rounded-2xl overflow-hidden bg-gray-50 dark:bg-dim-700">
    <h1 :class="twitterBorderColor" class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white">{{ props.title }}</h1>
    <slot />
    <div :class="defaultTransition" class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300">
        Show more
    </div>
  </div>
</template>

<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
