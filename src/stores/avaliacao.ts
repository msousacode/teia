import { defineStore } from 'pinia';

export const useAvaliacaoStore = defineStore('avaliacao', {
  state: () => ({
    aprendizSelected: {},
    avaliacao: {},
  }),

  getters: {
    getAprendizUuid(state) {
      return state;
    },
  },

  actions: {
    setAprendizUuid(aprendizSelected: any, avaliacao: any) {
      this.aprendizSelected = aprendizSelected;
      this.avaliacao = avaliacao;
    },
  },
});
