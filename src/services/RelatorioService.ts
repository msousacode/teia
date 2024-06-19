export class RelatorioService {
  gerarRelatorio() {
    const data = [
      {
        cabecario: {
          descricao: 'Relatório gerado em 16/06/2024',
        },
        profissional: {
          nome: 'Catarina Soares Sobral',
          documento: 'CRO 5406',
        },
        aprendiz: {
          nome: 'José Henrique',
          idade: '3 anos',
        },
        treinamentos: [
          {
            titulo: 'Treinamento',
            data: 'Data Início: 01/06/2024 data Final: 01/08/2024',
            nomeTreinamento: 'Torquent',
            protocolo: 'Protocolo ABC',
            descricao:
              'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant',

            alvosColetados: [
              {
                alvos: [
                  {
                    dataColeta: '05/06/2024',
                    nomeAlvo: 'Torquent urna sociosqu quis',
                    tipoAprendizagem: 'Protocolo ABC',
                    pergunta: 'Torquent urna sociosqu quis lobortis pharetra?',
                    descricaoAlvo:
                      'Torquent urna sociosqu quis lobortis pharetra',
                    resposta: 'Não Fez',
                    anotacoes: [
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            titulo: 'Treinamento',
            data: 'Data Início: 01/06/2024 data Final: 01/08/2024',
            nomeTreinamento: 'Torquent',
            protocolo: 'Protocolo ABC',
            descricao:
              'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant',

            alvosColetados: [
              {
                alvos: [
                  {
                    dataColeta: '05/06/2024',
                    nomeAlvo: 'Torquent urna sociosqu quis',
                    tipoAprendizagem: 'Protocolo ABC',
                    pergunta: 'Torquent urna sociosqu quis lobortis pharetra?',
                    descricaoAlvo:
                      'Torquent urna sociosqu quis lobortis pharetra',
                    resposta: 'Não Fez',
                    anotacoes: [
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                      {
                        data: '01/05/2025',
                        descricao:
                          'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.',
                      },
                    ],
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
