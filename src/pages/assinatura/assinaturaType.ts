export type assinaturaType = 'FRE' | 'TRI' | 'MEN' | 'ANU' | 'CANC';

export type motivoCancelamento =
  | { id: 1; desc: 'Fim do período de teste' }
  | { id: 2; desc: 'Cancelado pelo usuário' }
  | { id: 3; desc: 'Falta de pagamento' };
