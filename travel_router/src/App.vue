<script setup>
import {response} from './mock-response.js';
import {computed, onMounted, reactive, watch} from "vue";
import './algorithm.js';
import {findAllRoutes, normalizedCompanies} from "./algorithm.js";
import {initFlowbite} from 'flowbite'
import Select from "./components/Select.vue";
import Checkbox from "./components/Checkbox.vue";
import Pagination from "./components/Pagination.vue";
import Arrow from "./components/Icons/Arrow.vue";
import Country from "./components/Country.vue";

const form = reactive({
  from: null,
  to: null,
  counts: [1, 2, 3]
})

const paginationInfo = reactive({
  current: 0,
  size: 10,
})

onMounted(() => {
  initFlowbite();
})

const parsedCounties = computed(() => {
  return Object.entries(response.data.country).map(([key, name]) => ({
    name,
    value: key,
  }))
});

const allComputedRoutes = computed(() => {
  if (!form.from || !form.to || form.from === form.to) return [];
  paginationInfo.current = 0
  return findAllRoutes(normalizedCompanies, form.from, form.to).filter(el => form.counts.includes(el.route.length)).sort((a, b) => a.price > b.price ? 1 : -1);
});

const onAllChangeHandler = (checked) => {
  if (checked) form.counts = [1, 2, 3];
}
</script>

<template>
  <main class="flex flex-row items-stretch gap-4 max-w-[900px] m-[20px]">
    <form class="form flex flex-col shrink-0 bg-blue-400 p-5 rounded-xl gap-3 h-max">
      <Select
          id="country-from"
          v-model="form.from"
          :options="parsedCounties"
          label="From"/>
      <Select
          id="country-to"
          v-model="form.to"
          :options="parsedCounties"
          label="To"/>
      <checkbox :disabled="true" :checked="form.counts.length === 3" v-model="form.all" :value="true" id="all-routes"
                label="Все" @onChange="onAllChangeHandler"/>
      <checkbox v-model="form.counts" :value="1" id="one-route" label="Прямое соединение"/>
      <checkbox v-model="form.counts" :value="2" id="two-route" label="Один дополнительный узел"/>
      <checkbox v-model="form.counts" :value="3" id="three-route" label="Два дополнительных узла"/>
    </form>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-5">
        <div class="flex items-center  gap-5"
             v-for="route in allComputedRoutes.slice(paginationInfo.current * paginationInfo.size, (paginationInfo.current * paginationInfo.size)+ paginationInfo.size)">
          <div class="flex items-center justify-center bg-amber-600 w-[50px] h-[50px] rounded-full text-white">
            {{ route.price }}
          </div>
          <div class="flex">
            <div v-for="routeItem in route.route" class="flex gap-2">
              <Country :source="routeItem.src" :toType="routeItem.key" :toPrice="routeItem.price"/>
            </div>
            <Country :source="route.route[route.route.length - 1].des"/>
          </div>
        </div>
      </div>
      <Pagination v-if="allComputedRoutes.length" @onSelect="page=>paginationInfo.current = page - 1"
                  :currentPage="paginationInfo.current"
                  :totalCount="Math.ceil(allComputedRoutes.length/paginationInfo.size)"/>
    </div>

  </main>
</template>

