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

  constructor(
    _uuid: string,
    _dataInicioEfinal: string,
    _nomeTreinamento: string,
    _protocolo: string,
    _descricao: string,
    _alvosColetados: AlvoColetado[]
  ) {
    this.uuid = _uuid;
    this.data = _dataInicioEfinal;
    this.titulo = _nomeTreinamento;
    this.protocolo = _protocolo;
    this.descricao = _descricao;
    this.alvosColetados = _alvosColetados;
  }
}

class AlvoColetado {
  dataColeta: string;
  nomeAlvo: string;
  tipoAprendizagem: string;
  pergunta: string;
  descricaoAlvo: string;
  resposta: string;
  anotacoes: Anotacao[];

  constructor(
    _dataColeta: string,
    _nomeAlvo: string,
    _tipoAprendizagem: string,
    _pergunta: string,
    _descricaoAlvo: string,
    _resposta: string | number,
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

import { db } from 'src/db';

export class RelatorioService {
  async gerarRelatorio(uuid: string) {
    const cabecario = new Cabecario(
      `Relatório gerado em ${this.getDataAtual()}`
    );

    const profissional = new Profissional(
      'Catarina Renata da Silva',
      'CRO 5406'
    ); //TODO esses dados do profissional tem que vir do usuário logado, como essa parte não esta implementada, fica em todo, quando a tela de login estiver pronta eu terei essa informação.

    const aprendiz = await this.getAprendiz(uuid);

    const treinamentos = await this.getTreinamentos(uuid).then((res) => {
      return res;
    });

    const relatorio = new Relatorio(
      cabecario,
      profissional,
      aprendiz,
      treinamentos
    );

    console.log(JSON.stringify(relatorio));
  }

  getAprendiz(uuidAprendiz: string) {
    return db.aprendizes
      .get(uuidAprendiz)
      .then((res) => {
        if (!res) throw new Error('Aprendiz não encontrado');
        return new Aprendiz(res.nome_aprendiz, res.nasc_aprendiz);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async getTreinamentos(uuidAprendiz: string) {
    const res = await db.atendimentos
      .where({ aprendiz_uuid_fk: uuidAprendiz })
      .toArray();

    if (!res) throw new Error('Atendimento não encontrado');

    const treinamentosPromises = res.map(async (atendimento) => {
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
            //.and((coleta) => coleta.foi_respondido === true) TODO depois dos testes descomentar para pegar somente o que é coletado.
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
                  coleta.alvo.tipo_aprendizagem,
                  coleta.alvo.pergunta,
                  coleta.alvo.descricao_alvo,
                  coleta.resposta,
                  anotacoesFiltradas
                );
              });
            });

          return new Treinamento(
            treinamento.uuid,
            atendimento.data_inicio,
            treinamento.treinamento,
            treinamento.protocolo,
            descricao || 'Sem descrição',
            alvosColetados
          );
        })
      );

      return treinamentos;
    });

    const allTreinamentos = await Promise.all(treinamentosPromises);

    return allTreinamentos;
  }

  gerarRelatorioMock() {
    const data = [
      {
        cabecario: {
          descricao: 'Relatório gerado em 20/06/2024',
        },
        profissional: {
          nome: 'Catarina Renata da Silva',
          documento: 'CRO 5406',
        },
        aprendiz: {
          nome: 'Fátima Daiane Márcia Riberio',
          idade: '2 anos',
        },
        treinamentos: [
          {
            titulo: 'Treinamento',
            data: '01/06/2024 até 01/08/2024',
            nomeTreinamento: ' Aprimorar Habilidades Motoras Finas',
            protocolo: 'Protocolo ABC',
            descricao:
              'Objetivo: Desenvolver a destreza manual através de atividades que envolvam coordenação olho-mão. Objetivo: Melhorar a coordenação motora fina e a precisão dos movimentos dos dedos. Objetivo: Desenvolver a precisão e o controle dos movimentos das mãos. Objetivo: Melhorar a coordenação olho-mão e a destreza manual. Atividades: Puzzles, atividades de desenho e pintura, e brincadeiras com blocos de montar.',

            alvosColetados: [
              {
                dataColeta: '05/06/2024',
                nomeAlvo: 'Manuseio de Contas e Fios',
                tipoAprendizagem: 'Protocolo ABC',
                pergunta: 'O Aprendiz realiza o objetivo de modo satisfatório?',
                descricaoAlvo:
                  'Escolha das Contas: Comece com contas maiores e um fio grosso para facilitar o manuseio.',
                resposta: 'Não Fez',
                anotacoes: [
                  {
                    data: '05/06/2025',
                    descricao:
                      'Por ser a primeira sessão o vínculo não esta formado. O aprendiz não se sente seguro para realizar a atividade. A atividade foi realizada com o auxílio da terapeuta anterior ao caso.',
                  },
                ],
              },
              {
                dataColeta: '07/06/2024',
                nomeAlvo: 'Encaixe e Montagem com Blocos',
                tipoAprendizagem: 'Protocolo ABC',
                pergunta:
                  'O Aprendiz faz a montagem dos blocos de modo satisfatório?',
                descricaoAlvo:
                  'Escolha dos Blocos: Comece com blocos maiores para facilitar o manuseio inicial. Montagem Guiada: Demonstre como encaixar os blocos ou montar as peças do quebra-cabeça. Prática Independente: Incentive a criança a montar diferentes estruturas ou completar o quebra-cabeça de forma independente.',
                resposta: 'Não Fez',
                anotacoes: [
                  {
                    data: '07/05/2025',
                    descricao:
                      'O aprendiz demonstrou interesse pela atividade, mas não conseguiu realizar a montagem dos blocos. A terapeuta precisou auxiliar na montagem. O aprendiz tem fuga da sala e apresenta irritabilidade quando contrariado não aceitando as orientações da terapeuta.',
                  },
                  {
                    data: '07/05/2025',
                    descricao:
                      'A mãe relata que o aprendiz no dia anterior 06/05 teve atitudes agressivas com os irmãos e não aceitou a realização de atividades em casa. A mãe relata que o aprendiz não aceita a presença da terapeuta e não aceita a realização de atividades.',
                  },
                ],
              },
            ],
          },
          {
            titulo: 'Treinamento',
            data: '01/06/2024 até 01/08/2024',
            nomeTreinamento: 'Contato Visual',
            protocolo: 'Ocorrência de respostas',
            descricao:
              'Ensinar a criança a estabelecer e manter contato visual durante interações sociais.',

            alvosColetados: [
              {
                dataColeta: '05/06/2024',
                nomeAlvo: 'Contato visual ao brincar',
                tipoAprendizagem: 'Habilidades de Atenção',
                pergunta:
                  'Quantas vezes o aprendiz manteve o contato visual durante a brincadeira?',
                descricaoAlvo:
                  'Diga o nome do aprendiz e aguarde ele te olhar. Se ele não olhar use alguma coisa que ele goste e tente chamar a atenção novamente.',
                resposta: '01',
                anotacoes: [
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz não mantém contato visual. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou.',
                  },
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz apresenta agitação e boa parte do tempo de sessão fica disperso',
                  },
                ],
              },

              {
                dataColeta: '15/06/2024',
                nomeAlvo: 'Manter contato visual de 3 a 5 segundos',
                tipoAprendizagem: 'Habilidades de Atenção',
                pergunta: 'Quantas vezes o aprendiz conseguiu?',
                descricaoAlvo:
                  'Diga o nome do aprendiz e aguarde ele te olhar. Se ele não olhar use alguma coisa que ele goste e tente chamar a atenção novamente.',
                resposta: '02',
                anotacoes: [
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz não mantém contato visual. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou.',
                  },
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz apresenta agitação e boa parte do tempo de sessão fica disperso',
                  },
                ],
              },
            ],
          },
          {
            titulo: 'Treinamento',
            data: '01/06/2024 até 01/08/2024',
            nomeTreinamento: 'Contato Visual',
            protocolo: 'Ocorrência de respostas',
            descricao:
              'Ensinar a criança a estabelecer e manter contato visual durante interações sociais.',

            alvosColetados: [
              {
                dataColeta: '05/06/2024',
                nomeAlvo: 'Contato Visual a distância de 3 a 5 segunos',
                tipoAprendizagem: 'Habilidades de Atenção',
                pergunta: 'Quantas vezes o aprendiz manteve o contato visual?',
                descricaoAlvo:
                  'Diga o nome do aprendiz e aguarde ele te olhar. Se ele não olhar use alguma coisa que ele goste e tente chamar a atenção novamente.',
                resposta: '03',
                anotacoes: [
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz não mantém contato visual. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou.',
                  },
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz apresenta agitação e boa parte do tempo de sessão fica disperso',
                  },
                ],
              },

              {
                dataColeta: '16/06/2024',
                nomeAlvo: 'Manter contato visual de 3 a 5 segundos',
                tipoAprendizagem: 'Habilidades de Atenção',
                pergunta: 'Quantas vezes o aprendiz conseguiu?',
                descricaoAlvo:
                  'Diga o nome do aprendiz e aguarde ele te olhar. Se ele não olhar use alguma coisa que ele goste e tente chamar a atenção novamente.',
                resposta: '02',
                anotacoes: [
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz não mantém contato visual. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou. A terapeuta tentou chamar a atenção do aprendiz com um brinquedo que ele gosta, mas ele não olhou.',
                  },
                  {
                    data: '05/06/2025',
                    descricao:
                      'O aprendiz apresenta agitação e boa parte do tempo de sessão fica disperso',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return data;
  }

  getDataAtual() {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
