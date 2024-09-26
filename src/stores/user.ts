import { defineStore } from 'pinia';

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
  }),

  getters: {
    getState(state) {
      return state;
    },
  },

  actions: {
    setUser(user: UserState) {
      this.id = user.id;
      this.nome = user.nome;
      this.email = user.email;
    },
  },
});
