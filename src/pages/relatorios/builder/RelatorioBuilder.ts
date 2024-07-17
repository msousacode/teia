import jsPDF from 'jspdf';

/**
 * Interface que define os métodos que devem ser implementados por um builder (classe concreta) de relatório.
 */
export interface RelatorioBuilder {
  nomeArquivo(): string;

  dataHora(pdf: jsPDF): jsPDF;

  linhaDivisoria(
    pdf: jsPDF,
    marginLR: number,
    yPos: number,
    largura: number
  ): jsPDF;

  logoClinica(): void;

  gerarTitulo(pdf: jsPDF, title: string, yPos: number): jsPDF;

  linhaTexto(pdf: jsPDF, texto: string, yPos: number): jsPDF;

  informacoesBasicas(): void;

  treinamento(): void;

  objetivo(): void;

  anotacoes(): void;

  grafico(): void;
}
