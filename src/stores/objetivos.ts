import { defineStore } from 'pinia';

export const useObjetivosStore = defineStore('objetivos', {
  state: () => ({
    data: [],
  }),

  getters: {
    getData(state) {
      return state.data;
    },
  },

  actions: {
    setData(_data: []) {
      this.data = _data;
    },
  },
});
