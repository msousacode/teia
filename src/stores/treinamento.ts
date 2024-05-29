import { defineStore } from 'pinia';

export const useTreinamentoStore = defineStore('treinamento', {
  state: () => ({
    treinamentoUuid: '' as string | null,
  }),

  getters: {
    getTreinamentoUuid(state) {
      return state.treinamentoUuid;
    },
  },

  actions: {
    setTreinamentoUuid(uuid: string) {
      this.treinamentoUuid = uuid;
    },
  },
});
