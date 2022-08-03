<template>
  <section class="absolute mt-2 w-full">
    <div
      v-if="searchQuery && searchResults"
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
    <!-- Selected Search Result -->
    <div v-if="selectedResult" class="mt-2 px-4 pt-2 pb-5 bg-white rounded-md">
      <i
        @click="removeResult"
        class="far fa-times-circle flex justify-end cursor-pointer hover:text-red-500"
      ></i>
      <h1 class="text-lg">{{ selectedResult.text }}</h1>
      <p class="text-xs mb-1">
        {{ selectedResult.properties.address }}, {{ selectedResult.city }}
        {{ selectedResult.state }}
      </p>
      <p class="text-xs">{{ selectedResult.properties.category }}</p>
    </div>
  </section>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';
import { inject } from 'vue';

export default {
  name: 'SearchResults',
  props: {
    selectedResult: {
      type: Object,
      required: false,
    },
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

    const searchResults = inject('searchResults');

    const removeResult = () => emit('removeResult');

    return {
      setResultEvent,
      searchResults,
      removeResult,
    };
  },
};
</script>
