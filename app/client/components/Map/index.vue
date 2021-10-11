<template>
  <div>
    <div id="mapContainer" style="width: 100%; height: 100vh" class="map"></div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions, mapMutations, mapGetters} = createNamespacedHelpers('main');
  import {MAIN__GET_SELECT_OBJECT} from "../../store/const/main";

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
        markers: [],
        icons: ['activeMarker','defaultMarker'],
        group: {}
      }
    },
    watch: {
      selectedObject(newSelectedMarkerId, oldSelectedMarkerId){

        let markerNew = this.searchMarkerById(newSelectedMarkerId);

        if(oldSelectedMarkerId !== ""){
          let markerOld = this.searchMarkerById(oldSelectedMarkerId);
          // меняем иконку для старого выбранного маркера
          markerOld.setIcon(this.icons.defaultMarker);
        }
        // меняем иконку выбранного маркера
        markerNew.setIcon(this.icons.activeMarker);
        // центрируем карту о маркеру
        this.map.setView(markerNew.getLatLng(),5);
      }
    },
    computed: {
      ...mapState({
        objects: state => state.objects,
        selectedObject: state => state.selectedObject
      }),
      bounds(){
        return new L.LatLngBounds(this.objects.map(el => {return [el.latitude, el.longitude]}));
      },
      ...mapGetters([
          'getFilteredObjects'
        ]),
    },
    async mounted() {
      if (isBrowser) {
        // создаем карту
        await this.initializationMap();

        // инициализируем иконки
        this.icons['activeMarker'] = L.icon({iconUrl: "/images/icons/marker-active.svg"});
        this.icons.defaultMarker = L.icon({iconUrl: "/images/icons/marker-default.svg"});


        // добавляем маркеры на карту
        // todo add Promise https://codesandbox.io/s/beautiful-danilo-8xmym?file=/src/index.js
        // добавление маркеров сделать промисом
        setTimeout(()=>{
          this.addMarkers();
        }, 1000)
      }
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
    methods: {
      ...mapActions([MAIN__GET_SELECT_OBJECT]),
      async initializationMap() {
        this.map = L.map("mapContainer").setView([6.1405547, 43.85742], 3);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        // центриуем карту по объектам
        this.map.fitBounds(this.bounds);

        // создаем группу
        this.group = L.layerGroup();
      },
      async addMarkers() {
        let icon = L.icon({iconUrl: "/images/icons/marker-default.svg"});

        this.markers = await this.objects.map((el, i) => {
          //  создаем маркер
          let marker = new L.marker([el.latitude, el.longitude],{id: el.id}).addTo(this.map).on('click', (e)=>{
            // добавляем событие клика
            this.selectObject(el.id);
          })

          // устанавливаем иконки по умолчанию
          marker.setIcon(this.icons.defaultMarker);

          // добавляем маркер в группу
          this.group.addLayer(marker);

          // сохраняем идентификатор маркера вместе с его данными
          marker.marker_id = this.group.getLayerId(marker);
          marker._icon.id = 'mrk-' + el.id;

          return marker;
        })
        // добавлям группу на карту
        this.group.addTo(this.map);
      },
      selectObject(id) {
        this.map.setView(this.searchMarkerById(id).getLatLng(),5);
        this[MAIN__GET_SELECT_OBJECT]({id});
      },
      searchMarkerById(id){
        return this.markers.find(item => item.options.id === id);
      }
    }
  }
</script>

<style scoped>

</style>
