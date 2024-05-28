import Dexie, { Table } from 'dexie';

export interface Treinamento {
  uuid?: string;
  treinamento: string;
  protocolo: string;
  descricao: string;
  sync: boolean;
}

export interface Alvo {
  uuid?: string;
  nome_alvo: string;
  pergunta: string;
  descricao_alvo: string;
  repetir: number;
  treinamento_uuid_fk: string;
  sync: boolean;
}

export class DataBase extends Dexie {

  treinamentos!: Table<Treinamento>;

  alvos!: Table<Alvo>;

  constructor() {
    super('teiaDB');
    this.version(1).stores({
      treinamentos: 'uuid, sync',
      alvos: 'uuid, treinamento_uuid_fk, sync',
      //behaviors: '++cod, behaviorId, [programId+patientId]'//Primary key and indexed props
    });
  }
}

export const db = new DataBase();
