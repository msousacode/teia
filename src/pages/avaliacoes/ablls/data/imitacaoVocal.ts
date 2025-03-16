const imitacaoVocal = [
  {
    id: 400,
    cod: 'E1',
    descricao: 'Imitar sons quando solicitado',
    pontos: 4,
    pontuacao:
      '4= Sempre imita qualquer som corretamente \n3= 15 sons \n2= 5 sons \n1= 2 sons',
  },
  {
    id: 401,
    cod: 'E2',
    descricao: 'Imitar uma sequência de sons alternando com um modelo',
    pontos: 2,
    pontuacao:
      '2= Pode repetir pelo menos 10 sons separados em 15 segundos \n1= Pode repetir 5 sons separados em 10 segundos',
  },
  {
    id: 402,
    cod: 'E3',
    descricao: 'Imitar som inicial das palavras',
    pontos: 4,
    pontuacao:
      '4= Sempre imita pelo menos o primeiro som de qualquer palavra corretamente \n3= 15 sons \n2= 5 sons \n1= 2 sons',
  },
  {
    id: 403,
    cod: 'E4',
    descricao: 'Imitar múltiplas combinações de sons separados',
    pontos: 2,
    pontuacao:
      '2= Pode repetir ao menos 4 pares de combinações de sons de pelo menos 4 sons. \n1= Precisa de ajuda gestual para fazer coincidir a velocidade do modelo.',
  },
  {
    id: 404,
    cod: 'E5',
    descricao: 'Imitar sons curtos e rápidos vs. Sons compridos e lentos',
    pontos: 2,
    pontuacao:
      '2= Imita os sons fazendo coincidir a velocidade do modelo \n1= Precisa de ajuda gestual para fazer coincidir a velocidade do modelo.',
  },
  {
    id: 405,
    cod: 'E6',
    descricao: 'Imitar o número de repetições de um som',
    pontos: 2,
    pontuacao:
      '2= Imita até três repetições de um som sem ajuda \n1= Imita de uma em uma três repetições de um som quando lhe dá ajuda gestual.',
  },
  {
    id: 406,
    cod: 'E7',
    descricao: 'Imitar um som segurando para um segundo som',
    pontos: 2,
    pontuacao:
      '2= Pode imitar a troca de pelo menos 4 sons. \n1= Pelo menos 2 trocas.',
  },
  {
    id: 407,
    cod: 'E8',
    descricao: 'Combinações consoante / vogal, vogal / consoante',
    pontos: 2,
    pontuacao:
      '2= Pode repetir pelo menos 3 combinações de vogalconsoante ou de consoante-vogal, sem descanso entre os dois sons. \n1= Pode repetir pelo menos 3 combinações de consoante-vogal ou vogal-consoante sem descanso entre os dois sons.',
  },
  {
    id: 408,
    cod: 'E9',
    descricao: 'Consoante-vogal consoante-vogal',
    pontos: 2,
    pontuacao:
      '2= Pode repetir pelo menos 6 combinações de consoante-vogal-consoante-vogal, sem descanso entre os dois sons \n1= Pode repetir pelo menos 3 combinações de consoante-vogal ou vogal-consoante, sem descanso entre os dois sons.',
  },
  {
    id: 409,
    cod: 'E10',
    descricao: 'Combinação Consoante-vogal consoante',
    pontos: 2,
    pontuacao:
      '2= Pode repetir pelo menos 12 combinações de consoante-vogal-consoante, sem descanso entre os dois sons \n1= Pode repetir pelo menos 3 combinações de consoante-vogal-consoante sem descanso entre os dois sons.',
  },
  {
    id: 410,
    cod: 'E11',
    descricao: 'Imitar combinações de consoante',
    pontos: 4,
    pontuacao:
      '4= Sempre imita qualquer palavra com combinações de consoantes, em qualquer posição, corretamente \n3= 15 palavras nas mesmas condições \n2= 5 palavras \n1= 2 palavras',
  },
  {
    id: 411,
    cod: 'E12',
    descricao: 'Imitar palavras quando solicitado',
    pontos: 4,
    pontuacao:
      '4= Sempre imita qualquer palavra corretamente \n3= Aproximadamente 15 palavras \n2= Aproximadamente 5 palavras \n1= Aproximadamente 2 palavras',
  },
  {
    id: 412,
    cod: 'E13',
    descricao: 'Imitar frases quando solicitado',
    pontos: 4,
    pontuacao:
      '4= Sempre imita frases de 6 ou mais palavras corretamente \n3= Frases de 4 palavras \n2= Frases de 3 palavras \n1= Frases de 2 palavras',
  },
  {
    id: 413,
    cod: 'E14',
    descricao: 'Imitar sequências de número quando solicitado',
    pontos: 4,
    pontuacao:
      '4= Sempre imita uma sequencia de 7 ou mais números \n3= 4 números \n2= 3 números \n1= 2 números',
  },
  {
    id: 414,
    cod: 'E15',
    descricao: 'Imitar palavras curtas e rápido versus longas e devagar',
    pontos: 2,
    pontuacao:
      '2= Imita as palavras igualando a velocidade do modelo \n1= Precisa de ajuda para fazer isso',
  },
  {
    id: 415,
    cod: 'E16',
    descricao:
      'Imitar sons e palavras em volume alto versus sons e palavras em volume baixo',
    pontos: 2,
    pontuacao:
      '2= Imita as palavras igualando o volume do modelo \n1= Precisa de ajuda para fazer isso',
  },
  {
    id: 416,
    cod: 'E17',
    descricao: 'Imitar sons e palavras agudas versus graves',
    pontos: 2,
    pontuacao:
      '2= Imita as palavras igualando a entonação do modelo \n1= Precisa de ajuda para fazer isso',
  },
  {
    id: 417,
    cod: 'E18',
    descricao: 'Repetir mensagens curtas para uma outra pessoa',
    pontos: 2,
    pontuacao:
      '2= Pode repetir uma frase de três palavras depois de se afastar pelo menos 10 metros para repassar o conteúdo da mensagem. \n2= Pode repetir uma frase de duas palavras depois de se afastar pelo menos 5 metros para repassar o conteúdo da mensagem.',
  },
  {
    id: 418,
    cod: 'E19',
    descricao: 'Imitar espontaneamente palavras',
    pontos: 4,
    pontuacao:
      '4= Imita pelo menos 20 palavras por dia corretamente \n3= 15 palavras \n2= 5 palavras \n1= 2 palavras por dia',
  },
  {
    id: 419,
    cod: 'E20',
    descricao: 'Imitar frases espontaneamente',
    pontos: 4,
    pontuacao:
      '4= Imita frases de 6 ou mais palavras pelo menos 3 vezes por dia corretamente \n3= Frases de 4 palavras 3 vezes ao dia \n2= Frases de 3 palavras 3 vezes por dia \n1=Frases de duas palavras pelo menos 3 vezes ao dia.',
  },
];

export { imitacaoVocal };
