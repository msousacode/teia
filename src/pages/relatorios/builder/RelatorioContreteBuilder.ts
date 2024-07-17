import jsPDF from 'jspdf';
import { RelatorioBuilder } from './RelatorioBuilder';

/**
 * Classe concreta que implementa a interface RelatorioBuilder define o comportamento de cada passo
 * da construção do meu objeto.
 */
export class RelatorioConcreteBuilder implements RelatorioBuilder {
  nomeArquivo(): string {
    throw new Error('Method not implemented.');
  }

  /**
   * Método que retorna a data e hora atual.
   */
  dataHora(pdf: jsPDF): jsPDF {
    pdf.setFontSize(10);
    pdf.text('Gerado na data e hora:', 130, 20);
    pdf.text(new Date().toLocaleString().replace(',', ''), 168, 20);
    return pdf;
  }

  linhaDivisoria(
    pdf: jsPDF,
    marginLR: number,
    yPos: number,
    largura: number
  ): jsPDF {
    pdf.line(marginLR, yPos, largura, yPos);
    return pdf;
  }

  logoClinica(): void {
    throw new Error('Method not implemented.');
  }

  gerarTitulo(pdf: jsPDF, title: string, yPos: number): jsPDF {
    pdf.setFontSize(14);
    pdf.text(title, 10, yPos);
    return pdf;
  }

  informacoesBasicas(): void {
    //Receberá um objeto que permitirá a construção do objeto
    throw new Error('Method not implemented.');
  }

  treinamento(): void {
    throw new Error('Method not implemented.');
  }

  objetivo(): void {
    throw new Error('Method not implemented.');
  }

  anotacoes(): void {
    throw new Error('Method not implemented.');
  }

  grafico(): void {
    throw new Error('Method not implemented.');
  }

  init(): jsPDF {
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('Newsreader');
    pdf.setProperties({
      title: 'relatorio_evolutivo',
    });

    return pdf;
  }
}
