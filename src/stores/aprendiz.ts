import { defineStore } from 'pinia';

export const useAprendizStore = defineStore('aprendiz', {
  state: () => ({
    aprendizUuid: '' as string | null,
  }),

  getters: {
    getAprendizUuid(state) {
      return state.aprendizUuid;
    },
  },

  actions: {
    setAprendizUuid(uuid: string) {
      this.aprendizUuid = uuid;
    },
  },
});
