import { defineStore } from 'pinia';

export const useObjetivosStore = defineStore('objetivos', {
  state: () => ({
    data: [],
    importadosList: [],
  }),

  getters: {
    getData(state) {
      return state.data;
    },
    getImportadosList(state) {
      return state.importadosList;
    },
  },

  actions: {
    setData(_data: []) {
      this.data = _data;
    },
    setImportList(_importadosList: []) {
      this.importadosList = _importadosList;
    },
  },
});
