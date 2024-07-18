import jsPDF from 'jspdf';

/**
 * Interface que define os métodos que devem ser implementados por um builder (classe concreta) de relatório.
 */
export interface RelatorioBuilder {
  buildNomeArquivo(item: any): string;

  buildDataHora(pdf: jsPDF, dataHora: string): jsPDF;

  buildLinhaDivisoria(
    pdf: jsPDF,
    marginLR: number,
    yPos: number,
    largura: number
  ): jsPDF;

  buildLogo(pdf: jsPDF): Promise<jsPDF>;

  buildGerarTitulo(pdf: jsPDF, title: string, yPos: number): jsPDF;

  buildLinhaTexto(
    pdf: jsPDF,
    texto: string,
    yPos: number,
    xPos?: number
  ): jsPDF;

  buildMuitasLinhasTexto(
    pdf: jsPDF,
    texto: string,
    larguraMax: number,
    yPos: number
  ): jsPDF;
}
