const desempenhoVisual = [
  {
    id: 100,
    cod: 'B1',
    descricao: 'Quebra-cabeça com uma única peça de encaixe',
    pontos: 4,
    pontuacao:
      '4= Coloca 5 peças apresentadas ao mesmo tempo \n3= 3 peças apresentadas como grupo, olhando e colocando \n2= 5 peças entregues separadamente, a criança a tentativa e erro para encaixá-los \n1= coloca até 3 peças entregues separadamente, a criança usa a tentativa e erro para encaixá-los.',
  },
  {
    id: 101,
    cod: 'B2',
    descricao: 'Jogo de Encaixe',
    pontos: 4,
    pontuacao:
      '4= Coloca 6 peças, primeiro olha a peça depois localiza visualmente o buraco correspondente \n3= Coloca 4 peças, primeiro olhando e depois localizando o buraco \n2= 4 peças usando tentativa e erro \n1= 2 peças usando tentativa e erro.',
  },
  {
    id: 102,
    cod: 'B3',
    descricao: 'Emparelhar objetos idênticos ao exemplo',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 identificações de objetos com 8 objetos dispostos na mesa \n3= Pelo menos 5 identificações quando existem 4 objetos dentre os disponíveis \n2= Pelo menos 2 identificações dentre dois objetos para selecionar \n1= Pode igualar um objeto dentre dois disponíveis',
  },
  {
    id: 103,
    cod: 'B4',
    descricao: 'Emparelhar objetos com figuras',
    pontos: 2,
    pontuacao:
      '2= Pode igualar 3 objetos com apenas 1 instrução \n1= Por igualar um objeto por instrução',
  },
  {
    id: 104,
    cod: 'B5',
    descricao: 'Emparelhar figuras idênticas com a amostra',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 10 identificações quando há 8 desenhos para selecionar \n3= Pelo menos 5 associações dentre 4 desenhos \n2= 2 associações quando há 2 desenhos \n1= 1 associação para 2 desenhos disponíveis',
  },
  {
    id: 105,
    cod: 'B6',
    descricao: 'Emparelhar figuras com objetos',
    pontos: 2,
    pontuacao:
      '2= Pode igualar três objetos com apenas uma instrução \n1= Pode igualar um objeto por instrução.',
  },
  {
    id: 106,
    cod: 'B7',
    descricao: 'Emparelhar com fluência',
    pontos: 2,
    pontuacao:
      '2= Pode igualar pelo menos 10 objetos em 30 segundos \n1= Pode igualar 5 objetos separados em 15 segundos',
  },
  {
    id: 107,
    cod: 'B8',
    descricao: 'Separar objetos não idênticos',
    pontos: 4,
    pontuacao:
      '4= Dados 20 objetos (5 de cada uma das 4 categorias), pode classificar 10 ou mais exemplares em 4 categorias \n3= Dados 12 objetos, (3 de cada uma das 4 categorias) pode classificar pelo menos 6 exemplares em 4 categorias \n2= Dados 6 objetos (2 de cada uma das 3 categorias) pode classificar pelo menos 4 exemplares em 3 categorias \n1= Dados 4 objetos (2 de cada de 2 categorias) pode classificar 2 exemplares em 2 categorias.',
  },
  {
    id: 108,
    cod: 'B9',
    descricao: 'Sobrepor blocos no cartão com o desenho dos mesmos',
    pontos: 4,
    pontuacao:
      '4= pode completar rapidamente desenhos com seis ou mais peças (com mais alguns cubos) \n3= 4 ou mais peças (com alguns cubos a mais) \n2= pode fazer desenhos com até 4 peças (sem cubos extras) \n1= pode fazer desenhos usando duas peças (sem cubos extras)',
  },
  {
    id: 109,
    cod: 'B10',
    descricao: 'Quebra-cabeça com múltiplos conectores em moldura',
    pontos: 4,
    pontuacao:
      '4= 4 quebra-cabeças com 8 peças \n3= 4 quebra-cabeças com 5 peças \n2= 2 quebra-cabeças com 5 peças \n1= 1 quebra-cabeças com pelo menos 5 peças',
  },
  {
    id: 110,
    cod: 'B11',
    descricao: 'Quebra-cabeça com moldura de bordas retas',
    pontos: 4,
    pontuacao:
      '4= 3 puzzles com 5 peças \n3= 3 puzzles com 4 peças \n2= 3 puzzles com 3 peças \n1= 3 puzzles com pelo menos 2 peças',
  },
  {
    id: 111,
    cod: 'B12',
    descricao: 'Desenhos de blocos em figura',
    pontos: 4,
    pontuacao:
      '4 = Pode completar rapidamente desenhos com seis ou mais peças (com alguns cubos a mais) \n3= 4 ou mais peças (com cubos extras) \n2= Pode fazer desenhos com até 4 peças (sem cubos extras) \n1= Pode fazer desenhos usando 3 peças (sem cubos a mais)',
  },
  {
    id: 112,
    cod: 'B13',
    descricao: 'Padrão sequencial seguindo o modelo visual',
    pontos: 4,
    pontuacao:
      '4= Pode igualar um padrão de 8 peças feitas com 4 objetos diferentes mesmo que existam peças extras \n3= 8 peças com 4 objetos (sem cubos extras) \n2= 6 peças com 3 objetos (sem cubos extras) \n1= 6 peças com 2 objetos (sem cubos a mais)',
  },
  {
    id: 113,
    cod: 'B14',
    descricao: 'Quebra-cabeça com múltiplas peças',
    pontos: 4,
    pontuacao:
      '4= 4 quebra-cabeças com 5 peças \n3= 4 quebra-cabeças com 4 peças \n2= 2 quebra-cabeças com 3 peças \n1= 1 quebra-cabeças com pelo menos 3 peças',
  },
  {
    id: 114,
    cod: 'B15',
    descricao: 'Quebra-cabeça sem moldura',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 4 quebra-cabeças com 12 peças \n3= 2 quebra-cabeças com 12 peças \n2 = 2 quebra-cabeças com 8 peças \n1 = 1 quebra-cabeças com pelo menos 8 peças',
  },
  {
    id: 115,
    cod: 'B16',
    descricao: 'Emparelhar figuras associadas',
    pontos: 4,
    pontuacao:
      '4= Pode igualar ao menos 2 desenhos associados com 20 ou mais objetos \n3= 2 desenhos com 10 objetos \n2= 1 desenho com 10 objetos 1= 1 desenho com 5 objetos',
  },
  {
    id: 116,
    cod: 'B17',
    descricao: 'Separar pela função',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 5 objetos de 4 funções \n3= 5 objetos/3 funções \n2= 5 objetos/2 funções \n1= 2 objetos/2 funções',
  },
  {
    id: 117,
    cod: 'B18',
    descricao: 'Separar por característica',
    pontos: 4,
    pontuacao:
      '4= Pelo menos 5 objetos de 4 características \n3= 5 objetos/3 características \n2= 5 objetos/2 características \n1= 2 objetos/2 características',
  },
  {
    id: 118,
    cod: 'B19',
    descricao: 'Separar por categoria',
    pontos: 4,
    pontuacao:
      '4= 5 objetos de 4 classes. \n3= 5 objetos de 3 classes. \n2= 5 objetos de 2 classes. \n1= 2 objetos de 2 classes.',
  },
  {
    id: 119,
    cod: 'B20',
    descricao: 'Replicar uma sequência com atraso',
    pontos: 4,
    pontuacao:
      '4= Imediatamente com três objetos depois de uma demora de até 5 segundos; \n3= 3 objetos depois de 2 segundos de demora \n2= 2 objetos depois de 2 segundos de demora sem apoio \n1= 2 objetos depois de 2 segundos de demora com ajuda verbal ou gestual',
  },
  {
    id: 120,
    cod: 'B21',
    descricao: 'Encontrar amostra com atraso',
    pontos: 4,
    pontuacao:
      '4= Imediatamente, com três objetos, depois de uma demora de 5 segundos \n3= Mais objetos com uma demora maior \n2= 2 objetos depois de 2 segundos de demora e sem ajuda \n1= 2 objetos com 2 segundos de demora com instruções verbais e gestuais',
  },
  {
    id: 121,
    cod: 'B22',
    descricao: 'Continuar um padrão',
    pontos: 4,
    pontuacao:
      '4= Continua um padrão irregular com pelo menos 3 estímulos diferentes com peças irrelevantes \n3= 3 objetos com um padrão regular com peças irrelevantes \n2= 3 objetos em um padrão regular \n1= 2 objetos com um padrão regular',
  },
  {
    id: 122,
    cod: 'B23',
    descricao: 'Replicar um objeto 3D simples',
    pontos: 4,
    pontuacao:
      '2= Pode duplicar 2 objetos usando pelo menos 6 cubos ou outros objetos \n1= Pode duplicar 2 objetos usando pelo menos 3 cubos ou outros objetos.',
  },
  {
    id: 123,
    cod: 'B24',
    descricao: 'Sequência de emparelhamento dependente',
    pontos: 4,
    pontuacao:
      '2= Pode colocar imediatamente depois, um objeto para cada objeto apresentado pelo professor em uma série de pelo menos 6 respostas, \n1= Pode colocar imediatamente depois, um objeto para cada objeto apresentado em uma série de pelo menos 3 respostas.',
  },
  {
    id: 124,
    cod: 'B25',
    descricao: 'Seriação',
    pontos: 4,
    pontuacao:
      '4= Pode colocar pelo menos 4 grupos de objetos para cada um dos 4 atributos específicos, \n3= 2 grupos de objetos para 3 atributos \n2= 2 grupos de objetos para 2 atributos \n1= 2 grupos de objetos para 1 atributo.',
  },
  {
    id: 125,
    cod: 'B26',
    descricao: 'Sequência de figuras',
    pontos: 4,
    pontuacao:
      '4= Pode ordenar ao menos 5 grupos de 4 objetos em uma sequencia, \n3= 5 grupos de objetos em uma sequencia de três cartões. \n2= 3 grupos de objetos em uma sequencia de 3 cartões. \n1= 2 grupos de objetos para uma sequencia de 3 cartões.',
  },
  {
    id: 126,
    cod: 'B27',
    descricao: 'Labirinto',
    pontos: 4,
    pontuacao:
      '2= Pode desenhar uma linha desde o começo até o final de um labirinto que tem 3 opções para escolher o caminho correto. \n1= Pode desenhar uma linha desde o começo até o final de um labirinto que tem apenas 1 opção para escolher o caminho correto.',
  },
];

export { desempenhoVisual };
