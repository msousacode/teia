const imitacaoMotora = [
  {
    id: 300,
    cod: 'D1',
    descricao: 'Imitação motora usando objetos',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações com pelo menos 2 ações diferentes por objeto \n3= 10 ações \n2= 5 ações \n1= 2 ações',
  },
  {
    id: 301,
    cod: 'D2',
    descricao: 'Imitação motora usando objetos em discriminação',
    pontos: 4,
    pontuacao:
      '4= 10 ações e sempre imita ações novas \n3= 10 ações \n2= 5 ações \n1= 2 ações',
  },
  {
    id: 302,
    cod: 'D3',
    descricao:
      'Imitação motora de movimentos motores grossos com solicitações verbais',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações e sempre imita ações novas \n3= imita 10 ações \n2= 5 ações imitadas \n1= 2 ações',
  },
  {
    id: 303,
    cod: 'D4',
    descricao: 'Imitar movimentos de pé e perna',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações e sempre imita ações novas \n3= imita 10 ações \n2= 5 ações imitadas \n1= 2 ações',
  },
  {
    id: 304,
    cod: 'D5',
    descricao: 'Imitar movimentos de braços e mãos',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações e sempre imita ações novas \n3= imita 10 ações \n2= 5 ações imitadas \n1= 2 ações',
  },
  {
    id: 305,
    cod: 'D6',
    descricao:
      'Imitar movimentos motores estáticos e cinéticos em discriminação',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 pares de ações e imita ações novas \n3= imita 10 pares de ações \n2= imita 5 pares de ações \n1= imita 2 pares de ações similares quando uma resposta do par inclui uma ação em movimento e a outra uma ação estacionária.',
  },
  {
    id: 306,
    cod: 'D7',
    descricao: 'Instruções variadas para imitar',
    pontos: 2,
    pontuacao:
      '2= imita ações conhecidas dentre 4 ações diferentes \n1= imita ações mediante pelo menos 2 instruções diferentes.',
  },
  {
    id: 307,
    cod: 'D8',
    descricao: 'Imitar ações motoras grossas feitas em um espelho',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações e imita ações novas \n3= imita 10 ações \n2= imita 4 ações \n1= imita 2 ações',
  },
  {
    id: 308,
    cod: 'D9',
    descricao: 'Imitar movimentos com a cabeça',
    pontos: 2,
    pontuacao: '2= imita 3 ações \n1= imita 1 ação',
  },
  {
    id: 309,
    cod: 'D10',
    descricao: 'Imitar movimentos de boca e língua',
    pontos: 2,
    pontuacao: '2= imita 4 ações \n1= 2 ações',
  },
  {
    id: 310,
    cod: 'D11',
    descricao: 'Imitar movimentos faciais/orais feitos em um espelho',
    pontos: 4,
    pontuacao:
      '4= pelo menos 6 movimentos da boca incluindo movimentos cinéticos e estáticos \n3= imita 6 ações \n2= imita 4 ações \n1= 2 ações',
  },
  {
    id: 311,
    cod: 'D12',
    descricao: 'Imitação motora de movimentos finos',
    pontos: 4,
    pontuacao:
      '4= 10 ações e imita a ações novas \n3= 10 ações \n2= 5 ações \n1= 2 ações',
  },
  {
    id: 312,
    cod: 'D13',
    descricao: 'Imitação de tocar objetos em sequencia',
    pontos: 2,
    pontuacao:
      '2= Pode imitar uma sequencia tocando 4 de 6 objetos \n1= Pode imitar uma sequencia tocando 2 de 4 objetos',
  },
  {
    id: 313,
    cod: 'D14',
    descricao: 'Imitar assoprar',
    pontos: 2,
    pontuacao:
      '2= Imita as duas ações (curta e moderada) \n1= Pode imita somente uma das duas ações.',
  },
  {
    id: 314,
    cod: 'D15',
    descricao:
      'Imitar a velocidade de ações que estão acontecendo na hora com objetos',
    pontos: 2,
    pontuacao:
      '2= Imita as ações até coincidir com a velocidade do modelo \n1= Necessita somente de uma ajuda verbal para fazer coincidir com a velocidade do modelo.',
  },
  {
    id: 315,
    cod: 'D16',
    descricao:
      'Imitar a velocidade de uma ação modelada recentemente com objetos',
    pontos: 2,
    pontuacao:
      '2= Imita as ações com objetos e iguala a velocidade da ação imediatamente depois do modelo \n1= Precisa de ajuda verbal para igualar a velocidade de uma ação com um objeto depois de realizar o modelo.',
  },
  {
    id: 316,
    cod: 'D17',
    descricao:
      'Imitar a velocidade de uma ação modelada recentemente com objetos',
    pontos: 2,
    pontuacao:
      '2= Sempre imita ações na mesma velocidade do modelo \n1= Necessita ajuda verbal para imitar a velocidade do modelo',
  },
  {
    id: 317,
    cod: 'D18',
    descricao: 'Imitar tocar sequência seguindo um modelo',
    pontos: 2,
    pontuacao:
      '2= Imita a ordem com 4 de 6 objetos imediatamente depois do modelo \n1= Pode imitar a ordem com 2 de 4 objetos imediatamente depois do modelo.',
  },
  {
    id: 318,
    cod: 'D19',
    descricao: 'Imitar uma sequência de ações mudando com o modelo',
    pontos: 2,
    pontuacao:
      '2= Pode imitar uma sequencia de 6 ações diferentes em 10 segundos seguindo o modelo \n1= Pode imitar uma sequencia de 4 ações diferentes em 10 segundos',
  },
  {
    id: 319,
    cod: 'D20',
    descricao: 'Imitar uma sequência de ações',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 sequencias e sempre imita sequencias novas \n3= 10 sequencias de 10 ações \n2= 5 sequencias de 2 ações \n1= 2 sequencias de 2 ações depois de receber as instruções da sequencia das ações e do modelo.',
  },
  {
    id: 320,
    cod: 'D21',
    descricao: 'Imitar a intensidade de uma ação',
    pontos: 2,
    pontuacao:
      '2= imita o movimento e a intensidade \n1= Precisa de ajuda verbal para imitar a intensidade',
  },
  {
    id: 321,
    cod: 'D22',
    descricao: 'Imitar o número de repetições de um movimento motor',
    pontos: 2,
    pontuacao:
      '2= Imita de uma a três repetições de um modelo sem ajuda. \n1= imita o numero de 1 a 3 repetições com ajuda verbal ou gestual',
  },
  {
    id: 322,
    cod: 'D23',
    descricao: 'Imitar simultaneamente o movimento motor e uma vocalização',
    pontos: 2,
    pontuacao:
      '2= imita até três repetições de pelo menos 4 respostas combinadas de ações e verbalizações sem ajuda \n1= imita pelo menos uma resposta combinada de ação e vocalização sem ajuda.',
  },
  {
    id: 323,
    cod: 'D24',
    descricao: 'Imitar uma sequência motora usando múltiplos objetos',
    pontos: 2,
    pontuacao:
      '2= pode repetir pelo menos 6 sequencias diferentes de pelo menos 3 ações que incluem 4 objetos com o modelo original visível \n1= pode repetir pelo menos 6 sequencias diferentes de pelo menos 2 ações e 4 objetos com o modelo original visível.',
  },
  {
    id: 324,
    cod: 'D25',
    descricao: 'Imitar movimentos motores sem direta instrução verbal',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 ações se sempre imita ações novas \n3= 10 ações \n2= 5 ações \n1= 2 ações',
  },
  {
    id: 325,
    cod: 'D26',
    descricao: 'Imitar espontaneamente ações dos outros',
    pontos: 4,
    pontuacao:
      '4= Ao menos 10 ações e sempre imita novas ações (não é necessário ter uma sequencia exata para estas 10 ações). \n3= 10 ações \n2= 5 ações \n1= 2 ações',
  },
  {
    id: 326,
    cod: 'D27',
    descricao: 'Imitar com atraso',
    pontos: 4,
    pontuacao:
      '4= Nomeia e imita varias ações observadas nas últimas 4 horas \n3= Nomeia e imita depois de uma hora \n2= Nomeia e imita depois de 10 minutos \n1= Quando pedido, imita uma ação a cada 5 minutos',
  },
];

export { imitacaoMotora };
