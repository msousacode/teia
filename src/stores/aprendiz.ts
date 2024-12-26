import { defineStore } from 'pinia';

interface AprendizInfo {
  uuid: string;
  nome_aprendiz: string;
  nasc_aprendiz: string;
  idade: number;
}

export const useAprendizStore = defineStore('aprendiz', {
  state: () => ({
    aprendizUuid: '' as string | null,
    aprendizInfo: {} as AprendizInfo,
  }),

  getters: {
    getAprendizUuid(state) {
      return state.aprendizUuid;
    },
    getAprendizInfo(state): AprendizInfo {
      return state.aprendizInfo;
    },
  },

  actions: {
    setAprendizUuid(uuid: string) {
      this.aprendizUuid = uuid;
    },
    setAprendizInfo(aprendiz: AprendizInfo) {
      this.aprendizInfo = aprendiz;
      this.aprendizInfo.idade = calcularIdadeEMes(aprendiz.nasc_aprendiz);

      function calcularIdadeEMes(nascimento: string) {
        // Divide a string em dia, mês e ano
        const [dia, mes, ano] = nascimento.split('/').map(Number);

        const dataNascimento = new Date(ano, mes - 1, dia); // Meses em JavaScript começam do zero
        const dataAtual = new Date();

        let idadeAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
        let idadeMeses = dataAtual.getMonth() - dataNascimento.getMonth();

        // Se o mês atual for menor que o mês de nascimento, ajusta a idade em anos e meses
        if (idadeMeses < 0) {
          idadeAnos--;
          idadeMeses += 12; // ajusta para o mês correto
        }

        const idadeDecimal = idadeAnos + idadeMeses / 12;

        // Retorna a idade formatada com 1 casa decimal
        return Number(idadeDecimal.toFixed(1)); // Converte para Number, se necessário
      }
    },
  },
});
