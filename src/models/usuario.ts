export type SituacaoUsuarioTipo =
  | 'pendente'
  | 'bloqueado'
  | 'inativo'
  | 'ativo'; //TODO futuramente existirá uma tela para o adm liberar o acesso do usuário.

export type UsuarioTipo = 'terreiro' | 'membro';

export type TerreiroTipo = 'umbanda' | 'quimbanda' | 'candomblé';

export type Estado =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO';

export interface UsuarioCache {
  nome?: string | null;
  email?: string | null;
  ver_evento_privado?: boolean;
  client_id?: number | undefined;
  tenant_id?: string | undefined;
  login_date: number;
}

export class Usuario {
  public id?: number;
  constructor(
    public nome: string,
    public email: string,
    public celular: string,
    public senha: string,
    public cidade: string,
    public cep: string,
    public endereco: string,
    public endereco_numero: string,
    public estado: Estado,
    public tipo_usuario: UsuarioTipo,
    public client_id?: number | undefined,
    public tenant_id?: string | undefined,
    public tipo_terreiro?: TerreiroTipo | undefined,
    public nome_terreiro?: string | undefined,
    public ver_evento_privado?: boolean,
    public dados_bancarios?: string,
    public autorizado: boolean = false,
    public assas_customer_id?: string | undefined,
    public premium: boolean = false
  ) {
    this.nome = nome;
    this.email = email;
    this.celular = celular;
    this.senha = senha;
    this.cidade = cidade;
    this.cep = cep;
    this.endereco = endereco;
    this.endereco_numero = endereco_numero;
    this.estado = estado;
    this.tipo_usuario = tipo_usuario;
    this.client_id = client_id;
    this.tenant_id = tenant_id;
    this.tipo_terreiro = tipo_terreiro;
    this.nome_terreiro = nome_terreiro;
    this.ver_evento_privado = ver_evento_privado;
    this.dados_bancarios = dados_bancarios;
    this.autorizado = autorizado;
    this.assas_customer_id = assas_customer_id;
    this.premium = premium;
  }
}

export class Terreiro extends Usuario {
  constructor(
    public tipo_terreiro: TerreiroTipo,
    public nome_terreiro: string,
    public nome: string,
    public email: string,
    public celular: string,
    public senha: string,
    public cidade: string,
    public estado: Estado,
    public tipo_usuario: UsuarioTipo
  ) {
    super(
      nome,
      email,
      celular,
      senha,
      cidade,
      estado,
      tipo_usuario,
      undefined,
      undefined,
      tipo_terreiro,
      nome_terreiro
    );
  }
}

export class Membro extends Usuario {
  constructor(
    public nome: string,
    public email: string,
    public celular: string,
    public senha: string,
    public cidade: string,
    public estado: Estado,
    public tipo_usuario: UsuarioTipo,
    public client_id: number,
    public tenant_id: string,
    public premium: boolean
  ) {
    super(
      nome,
      email,
      celular,
      senha,
      cidade,
      estado,
      tipo_usuario,
      client_id,
      tenant_id,
      premium
    );
  }
}
