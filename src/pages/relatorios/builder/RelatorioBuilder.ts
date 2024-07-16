import jsPDF from 'jspdf';

/**
 * Interface que define os métodos que devem ser implementados por um builder (classe concreta) de relatório.
 */
export interface RelatorioBuilder {
  nomeArquivo(): string;

  dataHora(pdf: jsPDF): jsPDF;

  logoClinica(): void;

  informacoesBasicas(): void;

  treinamento(): void;

  objetivo(): void;

  anotacoes(): void;

  grafico(): void;
}
