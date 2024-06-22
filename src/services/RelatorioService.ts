class Relatorio {
  cabecario: Cabecario;
  profissional: Profissional;
  aprendiz?: Aprendiz;
  //treinamentos?: Treinamento[];

  constructor(
    _cabecario: Cabecario,
    _profissional: Profissional,
    _aprendiz?: Aprendiz
  ) {
    this.cabecario = _cabecario;
    this.profissional = _profissional;
    this.aprendiz = _aprendiz;
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

/* 
class Treinamento {
  titulo: string;
  data: string;
  nomeTreinamento: string;
  protocolo: string;
  descricao: string;
  alvosColetados: AlvoColetado[];

  constructor(
    titulo: string,
    data: string,
    nomeTreinamento: string,
    protocolo: string,
    descricao: string,
    alvosColetados: AlvoColetado[]
  ) {
    this.titulo = titulo;
    this.data = data;
    this.nomeTreinamento = nomeTreinamento;
    this.protocolo = protocolo;
    this.descricao = descricao;
    this.alvosColetados = alvosColetados;
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
    dataColeta: string,
    nomeAlvo: string,
    tipoAprendizagem: string,
    pergunta: string,
    descricaoAlvo: string,
    resposta: string,
    anotacoes: Anotacao[]
  ) {
    this.dataColeta = dataColeta;
    this.nomeAlvo = nomeAlvo;
    this.tipoAprendizagem = tipoAprendizagem;
    this.pergunta = pergunta;
    this.descricaoAlvo = descricaoAlvo;
    this.resposta = resposta;
    this.anotacoes = anotacoes;
  }
}

class Anotacao {
  data: string;
  descricao: string;

  constructor(data: string, descricao: string) {
    this.data = data;
    this.descricao = descricao;
  }
} */

import { db } from 'src/db';

export class RelatorioService {
  async gerarRelatorio(uuid: string) {
    db.treinamentos.get({ uuid: uuid }).then((treinamentos) => {
      console.log(treinamentos);
    });

    const cabecario = new Cabecario(
      `Relatório gerado em ${this.getDataAtual()}`
    );

    const profissional = new Profissional(
      'Catarina Renata da Silva',
      'CRO 5406'
    ); //TODO esses dados do profissional tem que vir do usuário logado, como essa parte não esta implementada, fica em todo, quando a tela de login estiver pronta eu terei essa informação.

    const aprendiz = await this.getAprendiz(uuid);

    const relatorio = new Relatorio(cabecario, profissional, aprendiz);

    console.log(relatorio);
  }

  getAprendiz(uuid: string) {
    return db.aprendizes
      .get(uuid)
      .then((res) => {
        return new Aprendiz(res?.nome_aprendiz, res?.nasc_aprendiz);
      })
      .catch((error) => {
        throw new Error(error);
      });
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
