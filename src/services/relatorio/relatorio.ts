import createHttp from '../base/baseHttp';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface Relatorio {
  titulo: string;
  profissional: Profissional[];
  aprendiz: Aprendiz;
  treinamentos: Treinamento[];
}

interface Profissional {
  // Adicione os atributos relevantes para a interface Profissional
}

interface Aprendiz {
  nome: string;
  nascimento: string;
}

interface Treinamento {
  treinamentoId: string;
  data: string | null; // ou Date, dependendo de como você preferir representar a data
  titulo: string;
  protocolo: string;
  descricao: string;
  alvosColetados: AlvoColetado[];
  profissionalDTOS: ProfissionalDTO[] | null; // ou uma estrutura que você rolla para ProfissionalDTO
  chartImage: string;
  chartImageList: string[];
}

interface AlvoColetado {
  dataColeta: string; // ou Date
  nomeAlvo: string | null;
  pergunta: string | null;
  descricaoAlvo: string;
  resposta: string;
  anotacoes: Anotacao[];
  coletadoPor: string | null;
}

interface Anotacao {
  anotacaoId: string;
  data: string; // ou Date
  descricao: string;
  anotadoPor: string | null;
}

interface ProfissionalDTO {
  // Adicione os atributos relevantes para a interface ProfissionalDTO
}

// New interfaces for v2 API response
export interface AnotacaoRelatorio {
  anotacaoId: string;
  data: string;
  descricao: string;
  anotadoPor: string;
}

export interface AlvoRelatorio {
  alvoId: string;
  nomeAlvo: string;
  tag: string;
  concluido: boolean;
  encerrado: boolean;
  totalEstrelaPositiva: number;
  totalEstrelaNegativa: number;
  anotacoes: AnotacaoRelatorio[];
}

export interface RelatorioV2 {
  alvos: AlvoRelatorio[];
}

const http = createHttp('/api');

export class RelatorioService {
  constructor() {}

  async gerarDadosRelatorio(
    aprendizId: string,
    nomeAprendiz?: string,
    nascimento?: string
  ) {
    const { data } = await http.get(`/relatorios/v2/aprendiz/${aprendizId}`);
    console.log(data);

    // Generate PDF with the fetched data
    await this.imprimirPDFV2(data as RelatorioV2, nomeAprendiz, nascimento);
  }

  async imprimirPDFV2(
    relatorio: RelatorioV2,
    nomeAprendiz?: string,
    nascimento?: string
  ): Promise<any> {
    const data = relatorio;

    const nomeDocumento: string = `relatorio_evolutivo_${
      nomeAprendiz?.replace(/\s+/g, '_') || 'aprendiz'
    }_${new Date().getUTCDate()}.pdf`;

    const pdf = new jsPDF('p', 'mm', 'a4'); //x = 210, y = 297
    pdf.setFont('Helvetica');
    pdf.setFontSize(16);
    pdf.setProperties({
      title: 'Relatório evolutivo',
    });

    let eixoY = 10;
    const eixoX = 10;
    const spaceY = 6;

    // Logo (using the same base64 image from the commented code)
    const imgData =
      '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';

    pdf.addImage(imgData, 'PNG', 180, eixoY, 15, 15);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Relatório evolutivo', eixoX, (eixoY += spaceY), {
      align: 'left',
    });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    eixoY += 5;

    pdf.text('Data do relatório', eixoX, (eixoY += spaceY), {
      align: 'left',
    });

    pdf.text(this.formatDate(new Date().toISOString()), eixoX + 50, eixoY, {
      align: 'left',
    });

    if (nomeAprendiz) {
      pdf.text('Nome aprendiz', eixoX, (eixoY += spaceY), {
        align: 'left',
      });

      pdf.text(nomeAprendiz, eixoX + 50, eixoY, {
        align: 'left',
      });
    }

    if (nascimento) {
      pdf.text('Data de nascimento', eixoX, (eixoY += spaceY), {
        align: 'left',
      });

      pdf.text(this.formatDate(nascimento), eixoX + 50, eixoY, {
        align: 'left',
      });
    }

    // Calculate summary statistics
    const totalObjectivos = data.alvos.length;
    const totalConcluidos = data.alvos.filter((alvo) => alvo.concluido).length;
    //const totalEncerrados = data.alvos.filter((alvo) => alvo.encerrado).length;
    const totalEstrelasPositivas = data.alvos.reduce(
      (sum, alvo) => sum + alvo.totalEstrelaPositiva,
      0
    );
    const totalEstrelasNegativas = data.alvos.reduce(
      (sum, alvo) => sum + alvo.totalEstrelaNegativa,
      0
    );

    // Summary section
    eixoY += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Resumo do Progresso', eixoX, eixoY, { align: 'left' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    eixoY += 6;

    pdf.text(
      `Total de objetivos trabalhados: ${totalObjectivos}`,
      eixoX,
      eixoY,
      { align: 'left' }
    );
    eixoY += 5;
    pdf.text(`Objetivos concluídos: ${totalConcluidos}`, eixoX, eixoY, {
      align: 'left',
    });
    eixoY += 5;
    /*
    pdf.text(`Objetivos encerrados: ${totalEncerrados}`, eixoX, eixoY, {
      align: 'left',
    });
    */
    eixoY += 5;
    pdf.text(
      `Total de estrelas positivas: ${totalEstrelasPositivas}`,
      eixoX,
      eixoY,
      { align: 'left' }
    );
    eixoY += 5;
    pdf.text(
      `Total de estrelas negativas: ${totalEstrelasNegativas}`,
      eixoX,
      eixoY,
      { align: 'left' }
    );

    let eixoTableY = 90;
    const limit = data.alvos.length;
    let count = 0;

    data.alvos.forEach((alvo) => {
      // Target header table
      autoTable(pdf, {
        startY: eixoTableY,
        head: [['Objetivo', 'Status', 'Estrelas']],
        body: [
          [
            `${alvo.nomeAlvo}`,
            //`Tag: ${alvo.tag}`,
            `${alvo.concluido ? 'Concluído' : 'Em andamento'}`,
            `Positivas: ${alvo.totalEstrelaPositiva} | Negativas: ${alvo.totalEstrelaNegativa}`,
          ],
        ],
        styles: {
          fillColor: [255, 183, 111], // Amarelo pastel (RGB)
          textColor: [0, 0, 0], // Preto
        },
      });

      // Annotations table if there are any
      if (alvo.anotacoes && alvo.anotacoes.length > 0) {
        autoTable(pdf, {
          head: [['Data', 'Anotação', 'Anotado por']],
          body: alvo.anotacoes.map((anotacao) => {
            return [
              this.formatDate(anotacao.data),
              anotacao.descricao,
              anotacao.anotadoPor || 'N/A',
            ];
          }),
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30 },
            2: { cellWidth: 30 },
          },
          styles: {
            fillColor: [255, 207, 154], // Cinza claro
            textColor: [0, 0, 0], // Cinza
          },
        });
      } else {
        // Show empty annotations table
        autoTable(pdf, {
          head: [['Anotações']],
          body: [['Nenhuma anotação disponível para este alvo.']],
          styles: {
            fillColor: [255, 183, 111], // Cinza claro
            //textColor: [128, 128, 128], // Cinza
            fontStyle: 'italic',
          },
        });
      }

      eixoTableY = 20;
      count++;

      if (count < limit) {
        pdf.addPage();
      }
    });

    try {
      pdf.save(nomeDocumento);
      return Promise.resolve();
    } catch (error) {
      throw new Error(`Erro ao gerar PDF: ${error}`);
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
