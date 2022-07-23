<template>
  <div class="h-screen relative">
    <MapFeatures />
    <GeoErrorModal
      @closeGeoError="closeGeoError"
      v-if="geoError"
      :message="GeoErrorMessage"
    />
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import leaflet from 'leaflet';
import { onMounted, ref } from 'vue';
import GeoErrorModal from '@/components/GeoErrorModal';
import MapFeatures from '@/components/MapFeatures';

const token = process.env.VUE_APP_API_KEY;
export default {
  name: 'HomeView',
  components: { GeoErrorModal, MapFeatures },
  setup() {
    let map;
    onMounted(() => {
      // Init map
      map = leaflet.map('map').setView([28.538336, -81.379234], 8);
      // add tile map layer
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`,
          {
            id: 'mapbox/streets-v11',
            maxZoom: 19,
            tileSize: 512,
            zoomOffset: -1,
            accessToken: token,
            attribution:
              '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
          }
        )
        .addTo(map);
      getGeoLocation();
    });
    const coords = ref(null);
    const fetchCoords = ref(null);
    const mapMarker = ref(null);
    const geoError = ref(null);
    const geoErrorMessage = ref(null);
    // Map coords functions
    const getGeoLocation = () => {
      // For loading
      fetchCoords.value = true;
      // Api call to get coords IF not in session
      if (sessionStorage.getItem('coords')) {
        coords.value = JSON.parse(sessionStorage.getItem('coords'));
        // Place icon on map
        plotGeolocation(coords.value);
        return;
      }
      navigator.geolocation.getCurrentPosition(setCoords, getLocationError);
    };
    const setCoords = (pos) => {
      fetchCoords.value = false;
      // Store coords in session storage
      const setSessionCoords = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
      sessionStorage.setItem('coords', JSON.stringify(setSessionCoords));
      // Set ref coords value
      coords.value = setSessionCoords;
      plotGeolocation(coords.value);
    };
    const plotGeolocation = (coords) => {
      // Custom marker
      const customMarker = leaflet.icon({
        iconUrl: require('@/assets/map-marker-red.svg'),
        iconSize: [32, 32],
      });
      // New marker with coords and icon for plotting
      mapMarker.value = leaflet
        .marker([coords.lat, coords.long], { icon: customMarker })
        .addTo(map);
      //Set map view to current coords
      map.setView([coords.lat, coords.long], 12);
    };
    const getLocationError = (error) => {
      fetchCoords.value = null;
      // Will be displayed in model
      geoError.value = true;
      geoErrorMessage.value = error.message;
    };
    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMessage.value = null;
    };
    // To be used in template
    return { coords, mapMarker, closeGeoError, geoError, geoErrorMessage };
  },
};
</script>
