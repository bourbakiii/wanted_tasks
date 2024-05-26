<script setup>
import Arrow from "./Icons/Arrow.vue";

const $props = defineProps({
  source: {
    type: String,
    required: true
  },
  toType: {
    type: String,
    required: false
  },
  toPrice: {
    type: Number,
    required: false
  }
})
</script>

<template>
  <div class="flex gap-2">
    <div class="p-2 min-w-10 flex items-center justify-center rounded bg-blue-400 text-white">{{ $props.source }}</div>
     <div v-if="toType" class="relative flex items-center px-10  text-gray-500">
      <div class="absolute -top-4 left-1/2 -translate-x-[50%] flex items-center border-xl bg-red text-sm whitespace-nowrap">
        {{ toType }} ({{toPrice}}$)
      </div>
      <Arrow/>
    </div>
  </div>
</template>

<style scoped>

</style>