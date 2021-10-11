import axios from 'axios';

import {
  MAIN__GET_DATA,
  MAIN__SET_DATA,
  MAIN__GET_SELECT_OBJECT,
  MAIN__SET_SELECT_OBJECT
} from '../const/main';

export default {
  namespaced: true,
  state: {
    objects: [],
    selectedObject: '',
  },
  mutations: {
    [MAIN__SET_DATA](state, {data}) {
      state.objects = data
    },
    [MAIN__SET_SELECT_OBJECT](state, {id}) {
      state.selectedObject = id
    },
  },
  actions: {
    // получение списка объектов
    async [MAIN__GET_DATA]({commit}) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/objects', method: 'POST'})
          .then(objects => {
            commit(MAIN__SET_DATA, objects)
            resolve(objects)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // выбор конкретного объекта
    [MAIN__GET_SELECT_OBJECT]({commit}, {id}){
      setTimeout(() => {
        commit(MAIN__SET_SELECT_OBJECT, {id})
      }, 0);
    }
  },
  getters: {
    getFilteredObjects: state => str => {
      if (state.objects) {
        if (str !== '') {
          return state.objects.filter((object) => {
            return object.name.toLowerCase().includes(str.toLowerCase())
            return object.name.toLowerCase().includes(str.toLowerCase())
          })
        } else{
          return state.objects
        }

      }
    }
  }
};
