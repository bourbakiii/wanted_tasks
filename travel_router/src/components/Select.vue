<script setup>
const $emit = defineEmits(['update:modelValue']);
const $props = defineProps({
  label: {
    required: true
  },
  id: {
    required: true
  },
  options: {
    type: Array,
    required: true,
  }
})

function onChangeHandler(e) {
  $emit('update:modelValue', e.target.value);
}
</script>

<template>
  <form>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <select @change="onChangeHandler"
            :id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected disabled>Select a country</option>
      <option v-for="option in options" :value="option.value">{{ option.name }}</option>
    </select>
  </form>
</template>

<style scoped>

</style>