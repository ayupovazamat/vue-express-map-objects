<template>
  <div>
    <div id="mapContainer" style="width: 100%; height: 100vh" class="map"></div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions, mapMutations} = createNamespacedHelpers('main');

  const isBrowser = typeof window !== 'undefined';
  let leaflet;
  if (isBrowser) {
    leaflet = require('leaflet');
  }

  export default {
    name: 'Map',
    components: {},
    data() {
      return {
        map: Object,
        markers: []
      }
    },
    computed: {
      ...mapState({
        objects: state => state.objects,
        selectedObject: state => state.selectedObject
      }),
    },
    mounted() {
      if (isBrowser) {
        // создаем карту
        this.initializationMap()

        // добавляем маркеры на карту
        this.addMarkers()

        // событие клика по маркеру
        this.map.on('click', this.onMapClick)
        // todo доработать обработчик клика по маркеру
      }
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
    methods: {
      initializationMap() {
        this.map = L.map("mapContainer").setView([6.1405547, 43.85742], 3);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }).addTo(this.map);
      },
      addMarkers() {
        this.objects.map((el, i) => {
          this.markers.push(L.marker([el.longitude, el.latitude],{id: el.id}).addTo(this.map))
          this.markers[i]._icon.id = 'mrk-' + el.id
        })
      },
      // обработка клика по маркеру
      onMapClick(e) {
        console.log(e)
      },
    }
  }
</script>

<style scoped>

</style>
