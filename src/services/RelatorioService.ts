export class RelatorioService {
  gerarRelatorio() {
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
}
