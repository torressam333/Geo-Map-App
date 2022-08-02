<template>
  <div class="h-screen relative">
    <MapFeatures
      :coords="coords"
      :fetchCoords="fetchCoords"
      @getGeoLocation="getGeoLocation"
      @plotResult="plotResult"
    />
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
      // When user disables location services
      if (coords.value) {
        coords.value = null;
        sessionStorage.removeItem('coords');
        map.removeLayer(mapMarker.value);

        return;
      }

      // For loading
      fetchCoords.value = false;

      // Pull coords from session if they exist
      if (sessionStorage.getItem('coords')) {
        coords.value = JSON.parse(sessionStorage.getItem('coords'));
        // Place icon on map
        plotLocationOnMap(
          coords.value.lat,
          coords.value.long,
          'map-marker-red.svg',
          mapMarker
        );

        return;
      }

      // Api call to get coords IF not in session
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
      plotLocationOnMap(
        coords.value.lat,
        coords.value.long,
        'map-marker-red.svg',
        mapMarker
      );
    };

    const plotLocationOnMap = (lat, long, mapMarkerSvg, mapMarkerArg) => {
      // Custom marker
      const customMarker = leaflet.icon({
        iconUrl: require(`@/assets/${mapMarkerSvg}`),
        iconSize: [35, 35],
      });

      // New marker with coords and icon for plotting
      mapMarkerArg.value = leaflet
        .marker([lat, long], { icon: customMarker })
        .addTo(map);

      //Set map view to current coords
      map.setView([lat, long], 11);
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

    const resultsMarker = ref(null);
    const plotResult = (coords) => {
      // Check if result marker has value
      if (resultsMarker.value) {
        map.removeLayer(resultsMarker.value);
      }

      plotLocationOnMap(
        coords.coordinates[1],
        coords.coordinates[0],
        'map-marker-blue.svg',
        resultsMarker
      );
    };

    // To be used in template
    return {
      coords,
      fetchCoords,
      mapMarker,
      closeGeoError,
      geoError,
      geoErrorMessage,
      getGeoLocation,
      plotResult,
    };
  },
};
</script>
