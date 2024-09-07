import Dexie, { Table } from 'dexie';

export interface Treinamento {
  uuid?: string;
  treinamento: string;
  protocolo: string;
  descricao: string;
  sync: boolean;
  ativo: boolean;
}

export interface Alvo {
  uuid?: string;
  nome_alvo: string;
  pergunta: string;
  descricao_alvo: string;
  repetir: number;
  treinamento_uuid_fk: string;
  sync: boolean;
  identificador: string;
  ativo: boolean;
}

export interface Aprendiz {
  uuid?: string;
  nome_aprendiz: string;
  nasc_aprendiz: string;
  nome_mae: string;
  nome_pai: string;
  nome_responsavel: string;
  observacao: string | '';
  sync: boolean;
  ativo: boolean;
}

export interface Atendimento {
  uuid?: string;
  aprendiz: { label: string; value: string };
  data_inicio: string;
  sync: boolean;
  treinamentos: any[];
  ativo: boolean;
}

export interface Coleta {
  uuid?: string;
  aprendiz_uuid_fk: string;
  treinamento_uuid_fk: string;
  data_coleta: string;
  resposta: string | number;
  sync: boolean;
  foi_respondido: boolean;
  alvo: any;
  data_final_coleta: string;
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  sab: boolean;
  ativo: boolean;
}

export interface Anotacao {
  uuid: string;
  alvo_identidicador_fk: string;
  treinamento_uuid_fk: string;
  data_anotacao: string;
  anotacao: string;
  sync: boolean;
  ativo: boolean;
}

export class DataBase extends Dexie {
  treinamentos!: Table<Treinamento>;

  alvos!: Table<Alvo>;

  aprendizes!: Table<Aprendiz>;

  atendimentos!: Table<Atendimento>;

  coletas!: Table<Coleta>;

  anotacoes!: Table<Anotacao>;

  constructor() {
    super('sysabaDB');
    this.version(1).stores({
      aprendizes: 'uuid',
      treinamentos: 'uuid',
      alvos: 'uuid,treinamento_uuid_fk',
      atendimentos: 'uuid,aprendiz_uuid_fk',
      coletas: 'uuid,[aprendiz_uuid_fk+treinamento_uuid_fk]',
      anotacoes: 'uuid,treinamento_uuid_fk',
    });
  }
}

export const db = new DataBase();
