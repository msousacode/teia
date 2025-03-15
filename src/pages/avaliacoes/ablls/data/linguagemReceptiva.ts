const linguagemReceptiva = [
  {
    id: 200,
    cod: 'C1',
    descricao: 'Responder ao próprio nome',
    pontos: 2,
    pontuacao:
      '2= Olha ou se dirige a pelo menos 80% das vezes \n1= Necessita de ajuda algumas vezes para responder',
  },
  {
    id: 201,
    cod: 'C2',
    descricao:
      'Seguir instruções para fazer uma ação divertida dentro de um contexto',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 3 atividades sem ajuda \n3= Pelo menos 3 atividades com só uma ajuda verbal ou gestual \n2= Três ou mais atividades com um modelo e sem ajudas físicas \n1= 3 ou mais atividades com ajudas físicas parciais.',
  },
  {
    id: 202,
    cod: 'C3',
    descricao: 'Seguir instruções para olhar para o item reforçador',
    pontos: 2,
    pontuacao:
      '2= Olha para o objeto em qualquer posição (para cima, para baixo, para a esquerda ou para a direita) e três segundos. \n1= Olha para o ele, mas precisa de ajuda adicional ou se passam mais de três de segundos antes que responda.',
  },
  {
    id: 203,
    cod: 'C4',
    descricao:
      'Seguir instruções para tocar em um item reforçador em várias posições',
    pontos: 2,
    pontuacao:
      '2= Sempre encontra o objeto em qualquer posição em até 3 segundos \n1= Toca ou pega o objeto em 3 segundos caso o apresentem.',
  },
  {
    id: 204,
    cod: 'C5',
    descricao:
      'Seguir instruções para tocar um item familiar em várias posições',
    pontos: 2,
    pontuacao:
      '2= Sempre encontra o objeto em qualquer posição em até 3 segundos \n1= Toca ou pega o objeto em 3 segundos caso o apresentem.',
  },
  {
    id: 205,
    cod: 'C6',
    descricao:
      'Seguir instruções para fazer uma ação divertida fora de contexto',
    pontos: 4,
    pontuacao:
      '4= Ao menos 3 atividades sem ajuda \n3= Pelo menos três atividades com ajuda verbal ou gestual \n2= 3 ou mais atividades com um modelo e sem ajuda física \n1= 3 ou mais atividades com ajuda física parcial',
  },
  {
    id: 206,
    cod: 'C7',
    descricao: 'Seguir instruções em situações rotineiras',
    pontos: 4,
    pontuacao:
      '4= Ao menos 3 atividades sem ajuda \n3= 3 atividades com ajuda verbal ou gestual \n2= 3 ou mais atividades com modelo e sem ajuda \n1= 3 ou mais atividades com ajuda física.',
  },
  {
    id: 207,
    cod: 'C8',
    descricao:
      'Seguir instruções para entregar objeto não reforçador solicitado',
    pontos: 2,
    pontuacao:
      '2= Normalmente, sem ajuda e aos 3 segundos \n1= Normalmente, porém com alguma ajuda (exceto estender a mão para receber o objeto)',
  },
  {
    id: 208,
    cod: 'C9',
    descricao: 'Seguir instruções para executar uma ação motora simples',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 6 instruções sem ajuda para seguir pelo menos 4 ações diferentes em 10 segundos \n3= 6 instruções sem ajuda \n2= 4 instruções sem ajuda \n1= 2 instruções sem ajuda.',
  },
  {
    id: 209,
    cod: 'C10',
    descricao: 'Seguir instruções para tocar um item versus uma distração',
    pontos: 2,
    pontuacao:
      '2= Sempre o encontra em qualquer posição em 3 segundos \n1= Toca o objeto se o mesmo estiver na sua frente.',
  },
  {
    id: 210,
    cod: 'C11',
    descricao:
      'Seguir instruções para selecionar o objeto reforçador em um conjunto de 2 objetos',
    pontos: 2,
    pontuacao:
      '2= Sempre o encontra em qualquer posição em até 3 segundos \n1= Encontra e escolhe o objeto se o mesmo estiver na sua frente.',
  },
  {
    id: 211,
    cod: 'C12',
    descricao:
      'Seguir instruções para selecionar um de dois itens reforçadores',
    pontos: 2,
    pontuacao:
      '2= Sempre o encontram em qualquer posição em 3 segundos. \n1= Encontra e escolhe o objetos este lhe for apresentado.',
  },
  {
    id: 212,
    cod: 'C13',
    descricao:
      'Seguir instruções para selecionar um de dois objetos familiares',
    pontos: 4,
    pontuacao:
      '4= Receptivamente identifica 50 ou mais objetos, e pode identificar vários exemplos diferentes da maioria destes objetos \n3= Identifica pelo menos 1 objeto dentre 25 \n2= 10 objetos \n1= identifica pelo menos 2 objetos',
  },
  {
    id: 213,
    cod: 'C14',
    descricao:
      'Seguir instruções para selecionar uma de duas figuras de objetos comuns',
    pontos: 4,
    pontuacao:
      '4= Receptivamente identifica 50 ou mais desenhos de objetos e pode identificar vários desenhos diferentes do mesmo objeto \n3= Identifica pelo menos 25 desenhos de objetos \n2= 10 desenhos \n1= 2 desenhos',
  },
  {
    id: 214,
    cod: 'C15',
    descricao: 'Tocar em partes do seu corpo',
    pontos: 4,
    pontuacao: '4= 10 ou mais partes \n3= 6 partes \n2= 4 partes \n1= 2 partes',
  },
  {
    id: 215,
    cod: 'C16',
    descricao: 'Selecionar um de seis objetos na mesa',
    pontos: 4,
    pontuacao:
      '4= Receptivamente identifica 100 ou mais objetos e pode identificar vários exemplos diferentes (incluindo exemplos novos) da maioria estes objetos entre 6 ou mais objetos \n3= 50 objetos e pode identificar ao menos 1 exemplo do objeto quando precisa selecionar três objetos \n2= 10 objetos quadro precisa selecionar entre 3 objetos \n1= 5 objetos quando precisa selecionar entre três objetos',
  },
  {
    id: 216,
    cod: 'C17',
    descricao: 'Selecionar um de seis ou mais figuras em uma mesa',
    pontos: 4,
    pontuacao:
      '4= Receptivamente identifica 100 ou mais desenhos identifica vários exemplos diferentes (incluindo exemplos novos) da maioria destes desenhos quando lhe é apresentado uma seleção de seis ou mais desenhos \n3= 50 desenhos com pelo menos 1 exemplo de objeto quando apresentada uma seleção de três ou mais desenhos. \n2=10 desenhos (uma seleção de três) \n1= 5 desenhos quando apresentado uma seleção de três ou mais desenhos.',
  },
  {
    id: 217,
    cod: 'C18',
    descricao:
      'Adquirir novas habilidades de seleção sem treinamento intensivo',
    pontos: 2,
    pontuacao:
      '2= Sempre aprende a escolher vários objetos novos depois de escolher menos de 5 vezes quando pedido \n1= escolhe vários objetos novos despois de escolhe-los menos de 10 vezes quando pedido.',
  },
  {
    id: 218,
    cod: 'C19',
    descricao: 'Discriminação receptiva em sucessão',
    pontos: 2,
    pontuacao:
      '2= Pode sinalizar ou escolher, e ordem ao menos 10 objetos conhecidos em 30 segundos \n1= Pode sinalizar ou escolher 5 objetos conhecidos e separados em 15 segundos',
  },
  {
    id: 219,
    cod: 'C20',
    descricao: 'Instruções variadas para selecionar usando qualquer resposta',
    pontos: 2,
    pontuacao:
      '2= Escolhe objetos seguindo5 instruções diferentes para escolher um objeto especificado (qualquer instrução de seleção é aceitável) \n1= Escolhe objetos e desenhos seguindo 2 instruções diferentes para escolher um objeto específico (qualquer instrução de seleção é aceitável)',
  },
  {
    id: 220,
    cod: 'C21',
    descricao: 'Apontar para partes do corpo em outros ou figuras',
    pontos: 4,
    pontuacao: '4= 10 ou mais partes \n3= 6 partes \n2= 4 partes \n1= 2 partes',
  },
  {
    id: 221,
    cod: 'C22',
    descricao: 'Tocar as suas próprias peças de roupa',
    pontos: 2,
    pontuacao: '2= 4 ou mais peças de roupas \n1= 2 peças de roupa',
  },
  {
    id: 222,
    cod: 'C23',
    descricao: 'Tocar partes de itens',
    pontos: 4,
    pontuacao:
      '4= 3 ou mais partes de 10 objetos \n3= 3 partes de seis objetos \n2= 2 partes de quatro objetos \n1= Pelo menos duas partes de dois objetos',
  },
  {
    id: 223,
    cod: 'C24',
    descricao: 'Selecionar adjetivos',
    pontos: 4,
    pontuacao:
      '4= Escolhe pelo menos 20 adjetivos (incluindo pelo menos 3 cores, 2 formas e 2 tamanhos) \n3= Pelo menos 10 adjetivos ( pelo menos 5 que não sejam cores) \n2= Pelo menos 5 adjetivos (podem ser todos cores) \n1= Pode identificar pelo menos um adjetivo',
  },
  {
    id: 224,
    cod: 'C25',
    descricao: 'Selecionar itens seguindo a direção do olhar do outro',
    pontos: 4,
    pontuacao:
      '2= Pode escolher um objeto dentre três objetos separados sobre uma mesa \n1= pode escolher um objeto dentre dois objetos separados sobre uma mesa.',
  },
  {
    id: 225,
    cod: 'C26',
    descricao: 'Seguir gestos de comunicação',
    pontos: 4,
    pontuacao:
      '4= responde corretamente aos 5 tipos de sinais feitos com a mão \n3= pode responder corretamente pelo menos \n4 tipo de sinais feitos com a mão \n2= pode responder corretamente ao menos 3 tipos de sinais feitos com a mão. \n1= pode responder corretamente ao menos 2 tipos de sinais feitos com a mão.',
  },
  {
    id: 226,
    cod: 'C27',
    descricao: 'Seguir instrução para ir até uma pessoa',
    pontos: 2,
    pontuacao:
      '2= pode ir pelo menos até 4 pessoas, quando lhe é pedido \n1= pode ir com até 2 pessoas após o pedido',
  },
  {
    id: 227,
    cod: 'C28',
    descricao:
      'Seguir a instrução de dar um item para uma pessoa ou colocar um item em um objeto',
    pontos: 4,
    pontuacao:
      '4= Pode ir pelo menos até a 2 pessoas e lugares e dar/colocar um objeto dado \n3= 2 pessoas ou lugares sem ajuda \n2= 2 pessoas ou lugares com uma ajuda verbal \n1= 1 pessoa ou lugar com uma ajuda verbal',
  },
  {
    id: 228,
    cod: 'C29',
    descricao:
      'Seguir uma instrução para andar até uma pessoa e pegar um item específico',
    pontos: 4,
    pontuacao:
      '4= Pode ir pelo menos ate 2 pessoas e lugares e tomar para si objeto pedido \n3= 2 pessoas ou lugares sem ajuda \n2= 2 pessoas ou lugares com uma ajuda verbal \n1= 1 pessoa ou lugar com uma ajuda verbal',
  },
  {
    id: 229,
    cod: 'C30',
    descricao: 'Seguir uma instrução para ir até uma pessoa e fazer uma ação',
    pontos: 4,
    pontuacao:
      '4= Pode ir pelo menos até 3 pessoas e fazer no mínimo 2 ações \n3= 2 pessoas e 2 ações \n2= 2 pessoas e 1 ação \n1= 1 pessoa e 1 ação',
  },
  {
    id: 230,
    cod: 'C31',
    descricao: 'Emitir respostas motoras específicas em tarefas receptivas',
    pontos: 4,
    pontuacao:
      '4= Segue corretamente 4 instruções diferentes com respostas de seleção \n3= 4 diferentes respostas de seleção \n2= 3 diferentes respostas de seleção \n1= 2 diferentes respostas de seleção',
  },
  {
    id: 231,
    cod: 'C32',
    descricao:
      'Demonstrar uma ação específica com um objeto quando dados objetos diferentes',
    pontos: 2,
    pontuacao:
      '2= No mínimo 5 sem ajuda \n1= Pelo menos 2 com ajuda verbal ou gestual',
  },
  {
    id: 232,
    cod: 'C33',
    descricao: 'Fazer várias ações com um objeto',
    pontos: 4,
    pontuacao:
      '4= Pode mostras pelo menos 4 ações com no mínimo 4 objetos \n3= ode mostrar pelo menos 3 ações com 4 objetos \n2= Pode mostrar ao menos 2 ações com 4 objetos \n1= Pode mostrar ao menos 2 ações com no mínimo 2 objetos',
  },
  {
    id: 233,
    cod: 'C34',
    descricao:
      'Demonstrar uma ação específica de mentira (fingir estar fazendo algo)',
    pontos: 2,
    pontuacao:
      '2= Pelo menos 5 sem ajuda \n1= Pelo menos 2 com ajudas verbais ou gestuais',
  },
  {
    id: 234,
    cod: 'C35',
    descricao: 'Selecionar uma de três figuras representando ações',
    pontos: 4,
    pontuacao:
      '4= Escolhe 20 ou mais desenhos de ações e pode identificar vários exemplos diferentes (incluindo exemplos novos) da maioria destas ações \n3= 10 ações \n2= 5 ações \n1= 2 desenhos de ações',
  },
  {
    id: 235,
    cod: 'C36',
    descricao: 'Selecionar figuras por associação',
    pontos: 4,
    pontuacao:
      '4= Pode escolher pelo menos 2 desenhos relacionados entre 20 outros objetos? \n3= 2 objetos relacionados entre 10 objetos \n2= 1 desenho relacionado entre 10 objetos \n1= Pode escolher pelo menos um desenho relacionado entre 5 objetos',
  },
  {
    id: 236,
    cod: 'C37',
    descricao: 'Selecionar pela função',
    pontos: 4,
    pontuacao:
      '4= Pode escolher pelo menos 25 objetos quando lhe dizem sua função e mais 2 objetos com uma função específica dentre 6. \n3= mínimo de 25 \n2= mínimo de 5 \n1= pelo menos 2',
  },
  {
    id: 237,
    cod: 'C38',
    descricao: 'Selecionar por característica',
    pontos: 4,
    pontuacao:
      '4= Pode escolher pelo menos 2 características ou partes para 25 objetos e pode escolher 2 ou mais objetos com uma característica específica de uma seleção de pelo menos 6 objetos. \n3= Pelo menos 2 características ou partes para 25 objetos \n2= Pelo menos 1 característica ou parte para 5 objetos \n1= Pelo menos uma característica ou parte para 2 objetos.',
  },
  {
    id: 238,
    cod: 'C39',
    descricao: 'Selecionar por categoria',
    pontos: 4,
    pontuacao:
      '4= Pode escolher ao menos 5 objetos de 4 classes e pode escolher 2 ou mais objetos de uma classe quando lhe apresentam um mínimo de 6 objetos. \n3= Pelo menos 5 objetos de 4 classes \n2= Ao menos 5 objetos de 2 classes \n1= Ao menos 5 objetos de uma classe.',
  },
  {
    id: 239,
    cod: 'C40',
    descricao: 'Selecionar 2 itens de um conjunto com vários itens',
    pontos: 2,
    pontuacao:
      '2= Pode escolher 2 objetos específicos quando lhe são apresentados 10 ou mais objetos \n1= Pode escolher 2 objetos específicos quando lhe são apresentados pelo menos 4 objetos.',
  },
  {
    id: 240,
    cod: 'C41',
    descricao:
      'Selecionar 2 itens em sequência em um conjunto com vários itens',
    pontos: 2,
    pontuacao:
      '2= Pode escolher 2 objetos específicos na ordem apropriada dentre 10 ou mais objetos \n1= Pode escolher 2 objetos específicos na ordem correta entre pelo menos 4 desenhos.',
  },
  {
    id: 241,
    cod: 'C42',
    descricao: 'Selecionar membros da comunidade (profissões)',
    pontos: 4,
    pontuacao:
      '4= Escolhe 4 ou mais profissões \n3= 3 profissões \n2= 2 profissões \n1= 1 profissão',
  },
  {
    id: 242,
    cod: 'C43',
    descricao: 'Localizar objetos em uma figura complexa',
    pontos: 2,
    pontuacao:
      '2= Pode encontrar pelo menos 3 de 4 objetos entre outros 100 objetos \n1= Pode encontrar pelo menos 2 de 4 objetos dentre ao menos outros 5 objetos.',
  },
  {
    id: 243,
    cod: 'C44',
    descricao:
      'Localizar objetos quando partes dos objetos estão em uma figura grande e complexa',
    pontos: 2,
    pontuacao:
      '2= Pode encontrar pelo menos 3 de 4 objetos entre outros 100 objetos \n1= Pode encontrar pelo menos 2 de 4 objetos dentre ao menos outros 5 objetos.',
  },
  {
    id: 244,
    cod: 'C45',
    descricao: 'Selecionar sons comuns do ambiente',
    pontos: 4,
    pontuacao: '4= Pelo menos 8 sons \n3= 6 sons \n2= 4 sons \n1= 2 sons',
  },
  {
    id: 245,
    cod: 'C46',
    descricao: 'Selecionar todos os exemplares de um item',
    pontos: 4,
    pontuacao:
      '4= 6 objetos similares dentre pelo menos outros 15 \n3= 3 objetos de uma seleção entre outros 10 objetos \n2= Mínimo de 3 objetos similares entre pelo menos 6 objetos \n1= Pelo menos 3 objetos similares entre pelo menos 4 objetos',
  },
  {
    id: 246,
    cod: 'C47',
    descricao: 'Selecionar um único item com duas características',
    pontos: 4,
    pontuacao:
      '4= 20 combinações com 2 características \n3= 10 combinações \n2= 5 combinações \n1= 2 combinações',
  },
  {
    id: 247,
    cod: 'C48',
    descricao:
      'Selecionar um conjunto de itens com uma característica específica',
    pontos: 4,
    pontuacao:
      '4= Escolhe pelo menos 20 adjetivos (incluindo pelo menos 3 cores, 2 formas e 2 tamanhos) \n3= Pelo menos 10 adjetivos (pelo menos 5 que não sejam cores) \n2= Pelo menos 5 adjetivos (podem ser somente cores) \n1= Pode identificar pelo menos um adjetivo',
  },
  {
    id: 248,
    cod: 'C49',
    descricao:
      'Selecionar um conjunto de itens com duas características específicas',
    pontos: 4,
    pontuacao:
      '4= 20 combinações com 2 características \n3= 10 combinações \n2= 5 combinações \n1= 2 combinações',
  },
  {
    id: 249,
    cod: 'C50',
    descricao: 'Seguir uma instrução com múltiplos componentes em sequência',
    pontos: 2,
    pontuacao:
      '2= Escolhe corretamente 3 objetos na ordem apresentada, depois de que todos os objetos tenham sido indicados \n1= Escolhe corretamente 2 objetos na ordem apresentada, depois de que todos os objetos tenham sido indicados',
  },
  {
    id: 250,
    cod: 'C51',
    descricao: 'Selecionar preposições',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 6 preposições \n3= Pelo menos 5 preposições \n2= 3 preposições \n1= 2 preposições',
  },
  {
    id: 251,
    cod: 'C52',
    descricao: 'Selecionar pronomes',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 6 pronomes \n3= 5 pronomes \n2= 3 pronomes \n1= 2 pronomes',
  },
  {
    id: 252,
    cod: 'C53',
    descricao:
      'Selecionar figuras representando um local ou uma atividade apresentada em uma cena',
    pontos: 2,
    pontuacao:
      '2= Escolhe pelo menos 4 desenhos que representam localizações ou atividades \n1= Escolhe pelo menos 2 desenhos que representam localizações ou atividades',
  },
  {
    id: 253,
    cod: 'C54',
    descricao: 'Selecionar figuras representando emoções',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 4 emoções \n3= Pelo menos 3 emoções \n2= Pelo menos 2 emoções \n1= 1 emoção',
  },
  {
    id: 254,
    cod: 'C55',
    descricao: 'Selecionar “igual” e “diferente”',
    pontos: 2,
    pontuacao:
      '2= Pode escolher objetos iguais e diferentes quando estes variam apenas uma característica. \n1= Pode escolher objetos iguais e diferentes quando estes variam \n2 ou mais características.',
  },
  {
    id: 255,
    cod: 'C56',
    descricao: 'Selecionar não exemplares',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 3 exemplos de 10 categorias (podem ser funções relacionadas, características relacionadas ou classes relacionadas) \n3= 3 exemplos de pelo menos 5 categorias \n2= 3 exemplos de pelo menos 3 categorias \n1= 3 exemplos de pelo menos 2 categorias',
  },
  {
    id: 256,
    cod: 'C57',
    descricao: 'Selecionar figuras de interações sociais',
    pontos: 4,
    pontuacao:
      '4= Escolhe desenhos que representam pelo menos 4 interações sociais \n3= Escolhe pelo menos 3 interações sociais \n2= 2 interações sociais 1= 1 interação.',
  },
];

export { linguagemReceptiva };
