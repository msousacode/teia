interface Assinatura {
  ativo: boolean;
  assinatura_id: string;
  tipo_assinatura: 'ASSINANTE' | 'NAO_ASSINANTE'; // Definindo tipo literal
  data_contratacao: string | null; // pode ser uma string ou null
}

export interface UsuarioAssinaturaInfo {
  usuarioId: string;
  fullName: string;
  email: string;
  termoAceite: string | null; // pode ser uma string ou null
  documento: string | null; // pode ser uma string ou null
  assinatura: Assinatura;
}
