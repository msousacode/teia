import { defineStore } from 'pinia';

export const useAvaliacaoStore = defineStore('avaliacao', {
  state: () => ({
    aprendizSelected: {},
    avaliacao: {},
    tipoAvaliacao: '',
  }),

  getters: {
    get(state) {
      return state;
    },
  },

  actions: {
    set(aprendizSelected: any, avaliacao: any, tipoAvaliacao: string) {
      this.aprendizSelected = aprendizSelected;
      this.avaliacao = avaliacao;
      this.tipoAvaliacao = tipoAvaliacao;
    },
  },
});
