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
  resposta: string | number;
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

    return [relatorio];
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
                  coleta.alvo.tipo_aprendizagem || 'Sem tipo',
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

    return allTreinamentos.flat();
  }

  getDataAtual() {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
