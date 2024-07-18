import jsPDF from 'jspdf';
import { RelatorioBuilder } from './RelatorioBuilder';

/**
 * Classe concreta que implementa a interface RelatorioBuilder define o comportamento de cada passo
 * da construção do meu objeto.
 */
export class RelatorioConcreteBuilder implements RelatorioBuilder {
  /**
   * Função chave que inicializa o objeto que será construído.
   * Neste caso é o objeto jsPDF que é o nosso relatório/PDF.
   */
  init(): jsPDF {
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('Helvetica');
    pdf.setProperties({
      title: 'relatorio_evolutivo',
    });

    return pdf;
  }

  buildNomeArquivo(item: any): string {
    return (
      item.profissional.nome +
      ' - ' +
      item.aprendiz.nome +
      '-' +
      new Date().toLocaleDateString()
    );
  }

  /**
   * Método que retorna a data e hora atual.
   */
  buildDataHora(pdf: jsPDF, dataHora: string): jsPDF {
    pdf.setFontSize(10);
    pdf.text(dataHora, 150, 20);
    return pdf;
  }

  buildLinhaDivisoria(
    pdf: jsPDF,
    marginLR: number,
    yPos: number,
    largura: number
  ): jsPDF {
    pdf.line(marginLR, yPos, largura, yPos);
    return pdf;
  }

  async buildLogo(pdf: jsPDF): Promise<jsPDF> {
    const imgData = await loadImageData('src/assets/integration-slim.png');
    const imgDataWithoutPrefix = imgData.split(',')[1];
    pdf.addImage(imgDataWithoutPrefix, 'png', 10, 100, 80, 80);
    return pdf;
  }

  buildGerarTitulo(pdf: jsPDF, title: string, yPos: number): jsPDF {
    pdf.setFontSize(14);
    pdf.setFont('bold');
    pdf.text(title, 10, yPos);
    return pdf;
  }

  buildLinhaTexto(
    pdf: jsPDF,
    texto: string,
    yPos: number,
    xPos?: number
  ): jsPDF {
    pdf.setFontSize(12);
    pdf.setFont('normal');
    pdf.text(texto, xPos ? xPos : 10, yPos);
    return pdf;
  }

  buildMuitasLinhasTexto(
    pdf: jsPDF,
    texto: string,
    larguraMax: number,
    yPos: number
  ): jsPDF {
    const lines = pdf.splitTextToSize(texto, larguraMax);
    pdf.text(lines, 10, yPos);
    return pdf;
  }
}

async function loadImageData(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
