import { defineStore } from 'pinia';
import useFormatUtil from 'src/composables/UseFormatUtil';

interface UserState {
  id: string;
  nome: string;
  email: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    nome: '',
    avatar: '',
    email: '',
    assinatura: '',
    dataAssinatura: '',
  }),

  getters: {
    getState(state) {
      return state;
    },
    getFimAssinatura(state) {
      const periodoTesteFree = 8;
      const result = new Date(state.dataAssinatura);
      return useFormatUtil().timestampToDate(
        result.setDate(result.getDate() + periodoTesteFree)
      );
    },
  },

  actions: {
    setUser(user: UserState) {
      this.id = user.id;
      this.nome = user.nome;
      this.email = user.email;
    },

    setAssinatura(assinatura: string) {
      this.assinatura = assinatura;
    },

    setDataInicioAssinatura(data: string) {
      this.dataAssinatura = data;
    },
  },
});
