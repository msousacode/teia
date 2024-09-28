import { defineStore } from 'pinia';
import useUtils from 'src/utils/util';

const util = useUtils();

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
      const dataInicioAssinatura = util.calculateDaysBetween(
        state.dataAssinatura,
        new Date().toDateString()
      );
      const periodoTesteFree = 7;
      return periodoTesteFree - dataInicioAssinatura;
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
