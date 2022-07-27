<template>
  <section
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Location Searching -->
    <div class="relative flex-1 md:min-w-[300px]">
      <!-- search input -->
      <input
        aria-label="Search for location"
        type="text"
        class="pl-10 pr-4 py-4 text-md focus:outline-sold shadow-md rounded-md"
        placeholder="Search for location"
      />
      <!-- Search icon -->
      <div class="absolute top-0 left-[12px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>
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
};
</script>
