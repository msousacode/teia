import { EventoTipo, SimNaoTipo } from 'src/types/utils';

export interface Evento {
  nome_evento: string;
  evento_tipo: EventoTipo;
  evento_descricao: string;
  observacao_geral: string;
  data_evento: string;
  gratuito: SimNaoTipo;
  valor: number | undefined;
  observacao_pagamento: string;
  img_url: string;
  exibir_mediuns: boolean;
  exibir_publico: boolean;
  tenant_id: string | undefined;
  client_id: number | undefined;
}
