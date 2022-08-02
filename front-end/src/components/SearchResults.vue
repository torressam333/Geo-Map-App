<template>
  <section class="absolute mt-2 w-full">
    <div
      v-if="searchQuery"
      class="h-[400px] overflow-scroll bg-white rounded-md"
    >
      <!-- Show spinner when results are loading -->
      <LoadingSpinner v-if="!searchData" />
      <!-- Results API output -->
      <span v-else>
        <div
          class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white h-auto"
          v-for="result in searchData"
          :key="result.id"
          @click="setResultEvent(result)"
        >
          <i class="fas fa-map-marker-alt"></i>
          <p class="text-xs" data-test="search-result">
            {{ result.place_name }}
          </p>
        </div>
      </span>
    </div>
  </section>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';

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
  components: { LoadingSpinner },
  setup(props, { emit }) {
    const setResultEvent = (result) => {
      emit('setResult', result);
    };

    return {
      setResultEvent,
    };
  },
};
</script>
