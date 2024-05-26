<script setup>
import {computed} from "vue";

const $props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  }
})

const parsedCount = computed(() => $props.totalCount >= 1 ? $props.totalCount - 1 : 0);
</script>

<template>
  <nav>
    <div class="flex">
      <button v-for="page in parsedCount + 1" @click="$emit('onSelect', page)"
              class="first-of-type:rounded-l-md last-of-type:rounded-r-md flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border [&:not(:last-of-type)]:border-e-0 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              :class="{'bg-gray-300 ': page-1===currentPage,
               'hover:bg-gray-100 hover:text-gray-700': page - 1 !== currentPage
              }"
      >
        {{ page }}
      </button>
    </div>
  </nav>
</template>

<style scoped>

</style>