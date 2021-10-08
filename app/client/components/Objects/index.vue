<template>
  <div class="objects">
    <h1 class="objects__head">Объекты</h1>
    <label for="search" class="objects__search">
      <input id="search" v-model="searchInput" placeholder="Поиск..." name="search" autocomplete="off"/>
    </label>
    <div class="objects__list" v-for="object in objects" :key="object.id">
      <div class="objects__item" @click="selectObject(object.id)" :class="(selectedObject === object.id) ? 'selected': ''">{{object.id}}: {{object.name}}</div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from "vuex";
  import {MAIN__GET_SELECT_OBJECT, MAIN__SET_SELECT_OBJECT} from "../../store/const/main";

  const {mapState, mapActions, mapMutations} = createNamespacedHelpers('main');
  export default {
    name: "Objects",
    data(){
      return {
        searchInput: ''
      }
    },
    computed: {
      ...mapState({
        objects: state => state.objects,
        selectedObject: state => state.selectedObject,
      })
    },
    methods: {
      ...mapActions([MAIN__GET_SELECT_OBJECT,MAIN__SET_SELECT_OBJECT]),
      selectObject(id) {
        this[MAIN__GET_SELECT_OBJECT]({id})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .objects
    position fixed
    max-width 300px
    width 100%
    background white
    z-index 9999
    right 1rem
    &__head
      padding .5rem 1rem
    &__search
      background-color #777777
      input
        border 1px 0 0 1px solid
        box-sizing border-box
        width 100%
        outline none


    &__item
      cursor pointer
      padding .5rem 1rem
      &.selected
        background-color aquamarine


</style>