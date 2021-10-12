<template>
  <div class="objects">
    <h1 class="objects__head">Объекты</h1>
    <label for="search" class="objects__search">
      <input id="search" v-model="searchInput" placeholder="Поиск..." name="search" autocomplete="off"/>
    </label>
    <div class="objects__wrap">
      <div class="objects__list">
        <div class="objects__item" v-for="object in filteredObjects" :key="object.id"
             @click="selectObject(object.id)" :class="(selectedObject === object.id) ? 'selected': ''">{{object.id}}: {{object.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import {MAIN__GET_SELECT_OBJECT, MAIN__SET_SELECT_OBJECT, MAIN__GET_SEARCH_INPUT} from "../../store/const/main";

  const {mapState, mapActions, mapMutations, mapGetters} = createNamespacedHelpers('main');
  export default {
    name: "Objects",
    data(){
      return {
        searchInput: ''
      }
    },
    computed: {
      ...mapState({
        selectedObject: state => state.selectedObject,
      }),
      ...mapGetters([
        'getFilteredObjects'
      ]),
      filteredObjects(){
        return this.getFilteredObjects(this.searchInput);
      }
    },
    methods: {
      ...mapActions([MAIN__GET_SELECT_OBJECT,MAIN__SET_SELECT_OBJECT]),
      selectObject(id) {
        this[MAIN__GET_SELECT_OBJECT]({id});
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .objects
    position fixed
    max-width 300px
    width 100%
    height calc(100vh - 2rem)
    background white
    z-index 9999
    right 1rem
    top 1rem
    &__head
      padding .5rem 1rem
    &__search
      background-color #777777
      input
        box-sizing border-box
        width 100%
        outline none
        background #dcdcdc
        padding .5rem 1rem
        border none
    &__list
      overflow auto
      height calc(100vh - 2rem - 127px)
    &__item
      cursor pointer
      padding .5rem 1rem
      &.selected
        background-color aquamarine
</style>