import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';

import config from '../../config';

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    strict: !config.isProduction,
    modules: {
      main,
    },
  });
}