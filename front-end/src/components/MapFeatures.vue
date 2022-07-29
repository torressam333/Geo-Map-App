<template>
  <section
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-2 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Location Searching -->
    <div class="relative flex-1 md:min-w-[350px]">
      <!-- search input -->
      <input
        @input="search"
        v-model="searchQuery"
        aria-label="Search for location"
        type="text"
        class="pl-8 pr-4 py-3 text-sm focus:outline-none shadow-md rounded-md w-full"
        placeholder="Search for location"
      />
      <!-- Search icon -->
      <div class="absolute top-0 left-[10px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>
      <SearchResults :search-query="searchQuery" :search-data="searchData" />
    </div>

    <!-- Geolocation -->
    <div
      class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[50px]"
      :class="{ 'bg-slate-600': coords }"
    >
      <i
        class="fas fa-location-arrow text-[1.5rem] cursor-pointer"
        :class="{ 'text-white': coords, 'animate-pulse': fetchCoords }"
        @click="$emit('getGeoLocation')"
      ></i>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import SearchResults from '@/components/SearchResults.vue';
import getSearchResults from '@/api/getSearchResults';

export default {
  name: 'MapFeatures',
  props: {
    coords: {
      type: Object,
      required: false,
    },
    fetchCoords: {
      type: Boolean,
      required: false,
    },
  },
  components: { SearchResults },

  setup(props) {
    const searchQuery = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);

    // Clear previous timeout
    clearTimeout(queryTimeout.value);

    const search = () => {
      // Debounce
      queryTimeout.value = setTimeout(async () => {
        searchData.value = await getSearchResults(
          searchQuery.value,
          props.coords,
          props.coords.long,
          props.coords.lat
        );
      }, 1500);
    };

    return { searchQuery, searchData, queryTimeout, search };
  },
};
</script>
