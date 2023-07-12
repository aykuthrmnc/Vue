<template>
  <div>
    <label v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700" for="">{{ props.label }}</label>
    <input
      @input="(event) => emits('update:modelValue', event.target.value)"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :type="props.type"
      class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>
