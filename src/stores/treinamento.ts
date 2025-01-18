import { defineStore } from 'pinia';

export const useTreinamentoStore = defineStore('treinamento', {
  state: () => ({
    treinamentoUuid: '' as string | null,
    treinamentosSelecionados: [] as any[],
    treinamentoConfig: {} as any,
    treinamentosBase: [] as any[],
  }),

  getters: {
    getTreinamentoUuid(state) {
      return state.treinamentoUuid;
    },
    getTreinamentosSelecionados(state) {
      return state.treinamentosSelecionados;
    },
    getTreinamentoConfig(state) {
      return state.treinamentoConfig;
    },
    getTreinamentosBase(state) {
      return state.treinamentosBase;
    },
  },

  actions: {
    setTreinamentoUuid(uuid: string) {
      this.treinamentoUuid = uuid;
    },
    setTreinamentosSelecionados(treinamentos: []) {
      this.treinamentosSelecionados = treinamentos;
    },
    setTreinamentosBase(treinamentos: []) {
      this.treinamentosBase = treinamentos;
    },
  },
});
