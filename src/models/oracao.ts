export interface Oracao {
  descricao: string;
  exibir_mediuns: boolean;
  exibir_publico: boolean;
  tenant_id: string | undefined;
  client_id: number | undefined;
  solicitante?: string;
  atendida: boolean;
  autorizado: boolean;
}
