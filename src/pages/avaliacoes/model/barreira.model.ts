export interface BarreiraList {
  coletas: Barreira[];
}

export interface Barreira {
  vbMappBarreiraId: string | null;
  descricao: string;
  questao: string;
  resposta: string;
  codigo: number;
}
