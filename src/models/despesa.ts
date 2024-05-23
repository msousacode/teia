import { SitutacaoDespesaTipo } from 'src/types/utils';

export class Despesa {
  constructor(
    public ano: number | null,
    public mes: string,
    public desc_despesa: string,
    public data_vencimento: string | null,
    public valor: number | string | null,
    public situacao: SitutacaoDespesaTipo | undefined,
    public client_id?: number | undefined,
    public tenant_id?: string | undefined,
    public data_pagamento: string | null,
    public observacao?: string
  ) {
    this.ano = ano;
    this.mes = mes;
    this.desc_despesa = desc_despesa;
    this.data_vencimento = data_vencimento;
    this.valor = valor;
    this.situacao = situacao;
    this.client_id = client_id;
    this.tenant_id = tenant_id;
    this.data_pagamento = data_pagamento;
    this.observacao = observacao;
  }
}
