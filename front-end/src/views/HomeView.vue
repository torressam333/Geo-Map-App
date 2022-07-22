<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import leaflet from 'leaflet';
import { onMounted } from 'vue';

const token = process.env.VUE_APP_API_KEY;
export default {
  name: 'HomeView',
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
    });

    return map;
  },
};
</script>
