import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

Vue.use(Router);
Vue.use(VueMeta);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Main',
        component: () => import('./client/components/Main.vue'),
        meta: {
          breadCrumb: 'Main',
          pageTitle: 'Карта объектов',
        }
      },
    ],
  });
}