import jsPDF from 'jspdf';
import { RelatorioBuilder } from '../RelatorioBuilder';

export class Diretor {
  /**
   * Este é o operador ! de afirmação de não nulidade do TypeScript.
   * Indica ao compilador que você sabe que a variável será inicializada antes de ser usada,
   * mesmo que o compilador não consiga determinar isso por si mesmo.
   */
  private builder!: RelatorioBuilder;

  private pdf!: jsPDF;

  /**
   * O Diretor trabalha com qualquer instância de builder que o cliente passa para ele.
   */
  public setBuilder(builder: RelatorioBuilder, _pdf: jsPDF): void {
    this.builder = builder;
    this.pdf = _pdf;
  }

  /**
   * O Diretor pode construir as várias partes que compõe o relatório.
   */
  public buildDataHora(dataHora: string): any {
    return this.builder.dataHora(this.pdf, dataHora);
  }

  public buildLinhaDivisoria(
    marginLR: number,
    yPos: number,
    largura: number
  ): jsPDF {
    return this.builder.linhaDivisoria(this.pdf, marginLR, yPos, largura);
  }

  public buildTitulo(title: string, yPos: number): jsPDF {
    return this.builder.gerarTitulo(this.pdf, title, yPos);
  }

  public buildTexto(title: string, yPos: number): jsPDF {
    return this.builder.linhaTexto(this.pdf, title, yPos);
  }

  public buildTextoMuitasLinhas(
    texto: string,
    larguraMax: number,
    yPos: number
  ): jsPDF {
    return this.builder.muitasLinhasTexto(this.pdf, texto, larguraMax, yPos);
  }
}
