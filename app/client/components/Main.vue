<template>
  <div class="wrap">
    <Objects/>
    <Map/>
  </div>
</template>
<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapActions} = createNamespacedHelpers('main');
  import {
    MAIN__GET_DATA,
    MAIN__SET_DATA,
  } from '../store/const/main'

  import Map from './Map/index.vue'
  import Objects from './Objects/index.vue'

  export default {
    metaInfo() {
      return {
        title: `${this.$route.meta.pageTitle}`,
      }
    },
    components: {Map, Objects},
    data() {
      return {
        preloader: false
      }
    },
    serverPrefetch() {
      // подгрузка объектов SSR
      this[MAIN__GET_DATA](null)
    },
    mounted() {
      // подгрузка объектов (монтирование)
      this[MAIN__GET_DATA](null)
    },
    methods: {
      ...mapActions([MAIN__GET_DATA, MAIN__SET_DATA]),
    }
  }
</script>
<style lang="stylus" scoped>
  body
    margin 0
    padding 0
    font-family 'sans-serif'
</style>