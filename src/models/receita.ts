export const receitasTipos = ['Trabalho', 'Contruibuição'];

export class Receita {
  constructor(
    public ano: number | null,
    public mes: string,
    public data_coleta: string | null,
    public valor: number | string | null,
    public client_id?: number | undefined,
    public tenant_id?: string | undefined,
    public observacao?: string,
    public tipo_receita: string = 'Contruibuição'
  ) {
    this.ano = ano;
    this.mes = mes;
    this.data_coleta = data_coleta;
    this.valor = valor;
    this.client_id = client_id;
    this.tenant_id = tenant_id;
    this.observacao = observacao;
    this.tipo_receita = tipo_receita;
  }
}
