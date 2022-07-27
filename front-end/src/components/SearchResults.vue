<template>
  <section class="absolute mt-2 w-full">
    <div
      v-if="searchQuery"
      class="h-[400px] overflow-scroll bg-white rounded-md"
    >
      <!-- Results API output -->
      <div
        class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white h-auto"
        v-for="result in searchData"
        :key="result.id"
      >
        <i class="fas fa-map-marker-alt"></i>
        <p class="text-xs" data-test="search-result">
          {{ result.place_name }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    searchData: {
      type: Object,
      required: false,
    },
    searchQuery: {
      type: String,
      required: false,
    },
  },
};
</script>
