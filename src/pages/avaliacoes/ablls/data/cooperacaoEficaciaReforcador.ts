const coperacaoEficaciaReforcador = [
  {
    id: 1,
    cod: 'A1',
    descricao: 'Pegar reforçador quando oferecido',
    pontos: 2,
    pontuacao:
      '2= Sempre pega antes de três segundos. \n\n 1= Nem sempre o pega e passam mais de três segundos antes de pegá-lo.',
  },
  {
    id: 2,
    cod: 'A2',
    descricao: 'Escolher o reforçador quando duas opções são dadas',
    pontos: 2,
    pontuacao:
      '2= Sempre pega antes de três segundos. \n\n 1= Não pega antes de três segundo ou não pega.',
  },
  {
    id: 3,
    cod: 'A3',
    descricao: 'Olhar para item não reforçador',
    pontos: 4,
    pontuacao:
      '4= Segue o movimento do objeto em seis posições diferentes em um período de dez segundos, \n\n3= Segue o movimento do objeto em quatro posições diferentes em um período de dez segundos, \n\n2= O olhará em uma posição (para cima/para baixo/esquerda/direita) antes de três segundos, \n\n1= Precisa de alguma sugestão ou ajuda para responder ou se passam mais de três segundos antes de responder',
  },
  {
    id: 4,
    cod: 'A4',
    descricao: 'Pegar um objeto comum quando oferecido',
    pontos: 2,
    pontuacao:
      '2= Pega antes de 3 segundos \n\n1= Se passam mais de 3 segundo, mas ele sempre o pega',
  },
  {
    id: 5,
    cod: 'A5',
    descricao:
      'Aproximar-se quando uma resposta é necessária para ter acesso ao reforçador',
    pontos: 4,
    pontuacao:
      '4= Se aproxima, se senta à mesa e realiza varias respostas para receber os reforçadores (reforça cada resposta), \n\n3= Se aproxima e produz várias respostas (reforça cada resposta), \n\n2= Se aproxima várias vezes e produz respostas simples e conhecidas, \n\n1= As vezes se aproxima e produz pelo menos uma resposta para receber o reforçador',
  },
  {
    id: 6,
    cod: 'A6',
    descricao: 'Responder ao instrutor sob controle de reforçadores',
    pontos: 4,
    pontuacao:
      '4= Toma partido em 5 respostas de aquisição para cada 5 apresentações de um reforçador em particular \n\n3= 2 respostas de aquisição e 3 respostas de manutenção para cada 5 apresentações \n\n2= 5 respostas de manutenção para cada 5 apresentações \n\n1= 3 respostas de manutenção para cada 3 apresentações',
  },
  {
    id: 7,
    cod: 'A7',
    descricao: 'Responder a vários instrutores',
    pontos: 2,
    pontuacao:
      '2= trabalha facilmente com 3 ou mais professores, assim como com professores novos com a mesma velocidade e precisão com a qual responde professores conhecidos \n\n1= trabalha facilmente com 3 ou mais professores com quase a mesma precisão nas respostas',
  },
  {
    id: 8,
    cod: 'A8',
    descricao: 'Esperar sem tocar nos estímulos',
    pontos: 2,
    pontuacao:
      '2= Enquanto se senta ou está de pé em frente aos materiais, o aluno sempre espera com paciência na direção dos materiais se seguir instruções como "fique quieto" \n\n1= Precisa somente de uma instrução para se sentar, ficar quieto ou não tocar nos materiais.',
  },
  {
    id: 9,
    cod: 'A9',
    descricao: 'Olhar para o instrutor para receber instrução',
    pontos: 2,
    pontuacao:
      '2= Depois identificar os materiais apenas com os olhos, o aluno sempre olha para o professor para receber a próxima instrução, \n\n1= Depois de identificar os materiais apenas com os olhos, o aluno precisa somente de uma instrução para olhar para o professor e receber a próxima instrução.',
  },
  {
    id: 10,
    cod: 'A10',
    descricao: 'Examinar os itens arrumados antes de responder',
    pontos: 2,
    pontuacao:
      '2= Pode identificar visualmente até 6 objetos em 3 segundos (antes de responder) \n\n1= Pode identificar visualmente até 3 objetos (antes de responder)',
  },
  {
    id: 11,
    cod: 'A11',
    descricao: 'Responder imediatamente após uma instrução ser dada',
    pontos: 2,
    pontuacao:
      '2= Responde de maneira concisa em 3 segundos após as instruções serem apresentadas \n\n1= Responde de maneira concisa em 5 segundos após as instruções serem apresentadas',
  },
  {
    id: 12,
    cod: 'A12',
    descricao: 'Variação no reforçador (não comestível)',
    pontos: 2,
    pontuacao:
      '2= Pelo menos 10 coisas diferentes ou atividades que servem de reforçador e que são controláveis por um instrutor em situações de aprendizagem \n\n1= Pelo menos 5 coisas ou atividades que sirvam como reforçadores.',
  },
  {
    id: 13,
    cod: 'A13',
    descricao: 'Reforçamento tangível e intermitente',
    pontos: 4,
    pontuacao:
      '4= Toma partido em 5 respostas de aquisição para um reforçador comestível ou tangível; \n\n3= 2 respostas de aquisição e 3 respostas de manutenção para cada 1 reforçador \n\n2= 4 respostas de manutenção para reforçadores comestíveis ou tangíveis \n\n1= 2 respostas de manutenção para reforçadores comestíveis ou tangíveis.',
  },
  {
    id: 14,
    cod: 'A14',
    descricao: 'Interação com o instrutor serve como reforço',
    pontos: 4,
    pontuacao:
      '4= Produz 5 respostas de aprendizagem consecutivas para conseguir a interação com o professor; \n\n3= 2 respostas de aprendizagem e 3 respostas de manutenção para conseguir a interação; \n\n2= 4 respostas de manutenção para conseguir a interação com o professor; \n\n1= 2 respostas de manutenção para conseguir a interação com o professor;',
  },
  {
    id: 15,
    cod: 'A15',
    descricao: 'Observar alteração de expressão e voz do instrutor',
    pontos: 2,
    pontuacao:
      '2= Olha para o professor para ver sua reação quando termina uma resposta pelo menos em 70% das vezes; \n\n1= As vezes olha para o professor buscando sua reação quando realiza uma resposta (sem que o professor tenha que fazer uma expressão exagerada para captar a atenção do aluno)',
  },
  {
    id: 16,
    cod: 'A16',
    descricao: 'Responder a reforços sociais',
    pontos: 4,
    pontuacao:
      '4= Trabalha durante 15 minutos somente para obter elogio \n\n3= Trabalha durante 15 minutos com um reforçador de reserva \n\n2= Trabalha durante 5 minutos para obter um reformador de reserva \n\n1= Trabalha para obter elogio durante 3 respostas antes de receber o reforçador de reserva',
  },
  {
    id: 17,
    cod: 'A17',
    descricao: 'Aguardar apropriadamente se a entrega do reforçador é atrasada',
    pontos: 4,
    pontuacao:
      '4= Espera 5 minutos \n\n3= 1 minuto \n\n2= 10 segundos \n\n1= 5 segundos',
  },
  {
    id: 18,
    cod: 'A18',
    descricao: 'Busca por aprovação uma vez que completa a tarefa',
    pontos: 2,
    pontuacao:
      '2= Pede para que outros vejam o que ele fez \n\n1= Olha para ver se outros notaram o que ele fez',
  },
  {
    id: 19,
    cod: 'A19',
    descricao: 'Completar a atividade serve como reforçador',
    pontos: 2,
    pontuacao:
      '2= Trabalha independentemente durante 10 minutos para obter o reforçador por completar a tarefa \n\n1= Trabalha durante 5 minutos somente para ganhar um elogio como reforçador.',
  },
];

export { coperacaoEficaciaReforcador };
