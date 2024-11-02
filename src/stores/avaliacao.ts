import { defineStore } from 'pinia';

export const useAvaliacaoStore = defineStore('avaliacao', {
  state: () => ({
    aprendizSelected: {},
    avaliacao: {},
  }),

  getters: {
    get(state) {
      return state;
    },
  },

  actions: {
    set(aprendizSelected: any, avaliacao: any) {
      this.aprendizSelected = aprendizSelected;
      this.avaliacao = avaliacao;
    },
  },
});
