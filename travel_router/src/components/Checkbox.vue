<script setup>
import {computed} from "vue";

const props = defineProps({
  id: {type: String, required: true},
  modelValue: {type: Array, required: false},
  value: {type: Number, required: false},
  label: {type: String, required: false},
  checked: {type: Boolean, required: false},
});
const emit = defineEmits(["update:modelValue", "onChange"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label class="flex items-center cursor-pointer" :for="id">
    <input :checked="$props.checked" v-model="model" :value="value" :id="id" type="checkbox" @change="e=>$emit('onChange', e.target.checked)"
           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <span class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</span>
  </label>
</template>

<style scoped>

</style>