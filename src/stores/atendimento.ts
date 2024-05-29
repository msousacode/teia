import { defineStore } from 'pinia';

export const useAtendimentoStore = defineStore('atendimento', {
  state: () => ({
    atendimentoUuid: '' as string | null,
  }),

  getters: {
    getatendimentoUuid(state) {
      return state.atendimentoUuid;
    },
  },

  actions: {
    setatendimentoUuid(uuid: string) {
      this.atendimentoUuid = uuid;
    },
  },
});
