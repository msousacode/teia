class ChartData {
  labels: string[];
  datasets: Dataset[];
  options: { responsive: boolean };

  constructor(_labels: string[], _datasets: Dataset[]) {
    this.labels = _labels;
    this.datasets = _datasets;
    this.options = {
      responsive: true,
    };
  }
}

class Dataset {
  backgroundColor: string[];
  data: number[];

  constructor(_backgroundColor: string[], _data: number[]) {
    this.backgroundColor = _backgroundColor;
    this.data = _data;
  }
}

class Relatorio {
  cabecario: Cabecario;
  profissional: Profissional;
  aprendiz: Aprendiz;
  treinamentos: Treinamento[];

  constructor(
    _cabecario: Cabecario,
    _profissional: Profissional,
    _aprendiz: Aprendiz,
    _treinamentos: Treinamento[]
  ) {
    this.cabecario = _cabecario;
    this.profissional = _profissional;
    this.aprendiz = _aprendiz;
    this.treinamentos = _treinamentos;
  }
}

class Cabecario {
  descricao: string;

  constructor(descricao: string) {
    this.descricao = descricao;
  }
}

class Profissional {
  nome: string;
  documento: string;

  constructor(nome: string, documento: string) {
    this.nome = nome;
    this.documento = documento;
  }
}

class Aprendiz {
  nome: string;
  idade: string;

  constructor(nome: string, idade: string) {
    this.nome = nome;
    this.idade = idade;
  }
}

class Treinamento {
  uuid: string;
  data: string; //Informação vem do Atendimento.
  titulo: string;
  protocolo: string;
  descricao: string;
  alvosColetados: AlvoColetado[];
  chartData: ChartData;

  constructor(
    _uuid: string,
    _dataInicioEfinal: string,
    _nomeTreinamento: string,
    _protocolo: string,
    _descricao: string,
    _alvosColetados: AlvoColetado[],
    _chartData: ChartData
  ) {
    this.uuid = _uuid;
    this.data = _dataInicioEfinal;
    this.titulo = _nomeTreinamento;
    this.protocolo = _protocolo;
    this.descricao = _descricao;
    this.alvosColetados = _alvosColetados;
    this.chartData = _chartData;
  }
}

class AlvoColetado {
  dataColeta: string;
  nomeAlvo: string;
  tipoAprendizagem: string;
  pergunta: string;
  descricaoAlvo: string;
  resposta: any;
  anotacoes: Anotacao[];

  constructor(
    _dataColeta: string,
    _nomeAlvo: string,
    _tipoAprendizagem: string,
    _pergunta: string,
    _descricaoAlvo: string,
    _resposta: any,
    _anotacoes: Anotacao[]
  ) {
    this.dataColeta = _dataColeta;
    this.nomeAlvo = _nomeAlvo;
    this.tipoAprendizagem = _tipoAprendizagem;
    this.pergunta = _pergunta;
    this.descricaoAlvo = _descricaoAlvo;
    this.resposta = _resposta;
    this.anotacoes = _anotacoes;
  }
}

class Anotacao {
  uuidIdentificador: string;
  data: string;
  descricao: string;

  constructor(_uuidIdenticador: string, _data: string, _descricao: string) {
    this.uuidIdentificador = _uuidIdenticador;
    this.data = _data;
    this.descricao = _descricao;
  }
}

export class RelatorioService {
  async gerarRelatorio(uuid: string, periodoPesquisa: number) {
    const cabecario = new Cabecario(
      `Relatório gerado em ${this.getDataAtual()}`
    );

    const storage = localStorage.getItem('user');

    const user = JSON.parse(storage);

    const profissional = new Profissional(user.full_name, user.documento);

    const aprendiz = await this.getAprendiz(uuid);

    const treinamentos = await this.buscarTreinamentos(uuid, periodoPesquisa);

    const relatorio = new Relatorio(
      cabecario,
      profissional,
      aprendiz,
      treinamentos
    );

    return [relatorio];
  }

  async buscarTreinamentos(uuidAprendiz: string, periodoPesquisa: number) {
    return await this.getTreinamentos(uuidAprendiz, periodoPesquisa).then(
      (res) => {
        return res;
      }
    );
  }

  getAprendiz(uuidAprendiz: string) {
    console.log(uuidAprendiz);
    /** TODO fazer
    return db.aprendizes
      .get(uuidAprendiz)
      .then((res) => {
        if (!res) throw new Error('Aprendiz não encontrado');
        return new Aprendiz(res.nome_aprendiz, res.nasc_aprendiz);
      })
      .catch((error) => {
        throw new Error(error);
      });
       */
  }

  async getTreinamentos(uuidAprendiz: string, periodoPesquisa: number) {
    console.log(uuidAprendiz, periodoPesquisa);
    /**
    const atendimentos = await db.atendimentos
      .where({ aprendiz_uuid_fk: uuidAprendiz })
      .toArray();

    if (!atendimentos || atendimentos.length === 0) {
      return [];
    }
 */
    const inicioPesquisa = new Date().getTime();
    const dataFinal = this.getDataFinalToRelatorio(periodoPesquisa);

    /**
     * Esse trecho de código realiza a filtragem dos atendimentos que estão dentro do período de pesquisa.
     */
    const dadosFiltradoPorPeriodo = atendimentos
      .filter((atendimentoPeriodo) => {
        const partesData = atendimentoPeriodo.data_inicio.split('/');
        const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

        let dataInicio: string | number = new Date(dataFormatada).getTime();
        dataInicio = new Date(dataInicio).getTime();

        if (dataInicio <= inicioPesquisa) {
          return atendimentoPeriodo;
        }
      })
      .filter((at) => {
        return at.treinamentos.map((t) => {
          const dataFinalTreinamento = new Date(t.data_final).getTime();
          if (dataFinalTreinamento >= dataFinal) {
            return t;
          }
        });
      });

    const treinamentosPromises = dadosFiltradoPorPeriodo.map(
      async (atendimento) => {
        const treinamentos = await Promise.all(
          atendimento.treinamentos.map(async (treinamento) => {
            const descricao = await db.treinamentos
              .get(treinamento.uuid)
              .then((res) => {
                return res?.descricao;
              });

            const alvosColetados = await db.coletas
              .where({
                aprendiz_uuid_fk: uuidAprendiz,
                treinamento_uuid_fk: treinamento.uuid,
              })
              .and((coleta) => coleta.foi_respondido === true)
              .toArray()
              .then(async (res) => {
                const anotacoes = await db.anotacoes
                  .where({ treinamento_uuid_fk: treinamento.uuid })
                  .toArray()
                  .then((res) => {
                    return res.map((anotacao) => {
                      return new Anotacao(
                        anotacao.alvo_identidicador_fk,
                        anotacao.data_anotacao,
                        anotacao.anotacao
                      );
                    });
                  });

                return res.map((coleta) => {
                  const anotacoesFiltradas = anotacoes.filter((anotacao) => {
                    return anotacao.uuidIdentificador === coleta.uuid;
                  });

                  return new AlvoColetado(
                    coleta.data_coleta,
                    coleta.alvo.nome_alvo,
                    coleta.alvo.tipo_aprendizagem || 'Sem tipo',
                    coleta.alvo.pergunta,
                    coleta.alvo.descricao_alvo,
                    coleta.resposta,
                    anotacoesFiltradas
                  );
                });
              });

            //Cria o gráfico das coletas.
            const grafico = this.construirGrafico(
              alvosColetados,
              treinamento.protocolo
            );

            return new Treinamento(
              treinamento.uuid,
              atendimento.data_inicio,
              treinamento.treinamento,
              treinamento.protocolo,
              descricao || 'Sem descrição',
              alvosColetados,
              grafico
            );
          })
        );

        return treinamentos;
      }
    );

    const allTreinamentos = await Promise.all(treinamentosPromises);

    return allTreinamentos.flat();
  }

  getDataAtual() {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  construirGrafico(alvosColetados: AlvoColetado[], protocolo: string) {
    alvosColetados.reduce(
      (prev, curr) => {
        return [...prev, curr.resposta];
      },
      [protocolo]
    );

    if (protocolo === 'Protocolo ABC') {
      const semAjudaCount = alvosColetados.filter(
        (alvo) => alvo.resposta === 'sem-ajuda'
      );
      const comAjudaCount = alvosColetados.filter(
        (alvo) => alvo.resposta === 'com-ajuda'
      );
      const naoFezCount = alvosColetados.filter(
        (alvo) => alvo.resposta === 'nao-fez'
      );

      const semAjudaPercentagem = this.calcularPercentagem(
        semAjudaCount.length,
        alvosColetados.length
      );
      const comAjudaPercentagem = this.calcularPercentagem(
        comAjudaCount.length,
        alvosColetados.length
      );
      const naoFezPercentagem = this.calcularPercentagem(
        naoFezCount.length,
        alvosColetados.length
      );

      const graficoPie = {
        type: 'pie', // ou 'line', 'pie', etc.
        data: {
          labels: [
            `NÃO FEZ ${naoFezPercentagem}%`,
            `COM AJUDA ${comAjudaPercentagem}%`,
            `SEM AJUDA ${semAjudaPercentagem}%`,
          ],
          datasets: [
            {
              label: '',
              data: [
                naoFezCount.length,
                comAjudaCount.length,
                semAjudaCount.length,
              ],
              backgroundColor: ['#FF8CA6', '#FFEB85', '#85C1B9'],
              borderColor: ['#000'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      return graficoPie;
    }

    if (protocolo === 'Protocolo Ocorrência de Resposta') {
      const respostas = alvosColetados.map((alvo) => {
        return alvo.resposta;
      });

      const periodoSemanas = alvosColetados.map((alvo, ind) => {
        return `Semana ${ind + 1}`;
      });

      const graficoLine = {
        type: 'line', // ou 'line', 'pie', etc.
        data: {
          labels: periodoSemanas,
          datasets: [
            {
              label: 'Evolução',
              data: respostas,
              backgroundColor: ['#89CFF0'],
              borderColor: ['#89CFF0'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      return graficoLine;
    }
  }

  calcularPercentagem(count: number, total: number) {
    const result = (count / total) * 100;
    return result.toFixed(0);
  }

  getDataFinalToRelatorio(qtdDias: number): number {
    const date = new Date(new Date());
    date.setDate(date.getDate() + qtdDias);
    return date.getTime();
  }
}
