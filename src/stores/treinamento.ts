import { defineStore } from 'pinia';

export const useTreinamentoStore = defineStore('treinamento', {
  state: () => ({
    treinamentoUuid: '' as string | null,
    treinamentosSelecionados: [] as any[],
  }),

  getters: {
    getTreinamentoUuid(state) {
      return state.treinamentoUuid;
    },
    getTreinamentosSelecionados(state) {
      return state.treinamentosSelecionados;
    },
  },

  actions: {
    setTreinamentoUuid(uuid: string) {
      this.treinamentoUuid = uuid;
    },
    setTreinamentosSelecionados(treinamentos: []) {
      this.treinamentosSelecionados = treinamentos;
    },
  },
});
