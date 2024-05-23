export interface TerreiroInterface {
  nome_terreiro: string;
  email: string;
  celular: string;
  pix: string;
  nome_pai: string;
  nome_mae: string;
  sobre: string;
  endereco: string;
  dados_bancarios: string;
  img_url: string;
  tenant_id: string | undefined;
  client_id: number | undefined;
}
