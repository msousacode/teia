<template>
    <q-page class="q-pa-sm">
        <title-custom title="Cadastro Aprendiz" />
        <div class="row">
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @update:model-value="pesquisar" />
            </q-form>
            <p class="text-body1 text-teal-7 q-mt-md">Selecione o período:</p>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=30 label="Último mês" color="teal" />
            </div>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=60 label="Últimos 2 meses" color="teal" />
            </div>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=90 label="Últimos 3 meses" color="teal" />
            </div>
        </div>

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase" v-if="exibirRelatorioBtn">Treinamentos em
            andamento:</div>
        <div v-for="(
              item, index
            ) in treinamentos" :key="index">
            <card-custom :item="{
                    nomeTreinamento: item.treinamento,
                    nomeProtocolo: item.protocolo,
                    periodoTreinamento: item.periodo,
                    progresso: item.progresso
                }" />
        </div>

        <div class="row justify-center">
            <q-btn label="Gerar Relatório" color="info" class="col-12 q-pa-sm" @click="gerarGraficosTela"
                :disabled="!exibirRelatorioBtn" />
        </div>

        <div ref="chartContainer"></div>

    </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import { jsPDF } from 'jspdf';
import TitleCustom from 'src/components/TitleCustom.vue';
import CardCustom from 'src/components/CardCustom.vue';

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
import { RelatorioService } from 'src/services/RelatorioService';
import { useQuasar } from 'quasar';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const periodo = ref(30);

const service = new RelatorioService();

const $q = useQuasar();

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

const exibirRelatorioBtn = ref(false);

function pesquisar() {
    const raw = toRaw(form.value);

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {

            item.treinamentos.forEach((treinamento: any) => {
                calcularProgresso(treinamento.uuid, raw.aprendiz.value).then((progresso) => {
                    treinamento.progresso = progresso;
                });
            });

            treinamentos.value = toRaw(item.treinamentos)
        });
    });

    exibirRelatorioBtn.value = true;
}

async function calcularProgresso(treinamentoUUid: string, aprendizUUid: string) {
    let valor = 0;
    await db.coletas.where({ aprendiz_uuid_fk: aprendizUUid, treinamento_uuid_fk: treinamentoUUid }).toArray((res) => {
        const total = res.length;
        const feitos = res.filter((item) => item.foi_respondido === true).length;
        valor = feitos / total;
    })

    return valor;
}

const chartContainer = ref(null);

async function renderizarGraficos() {

    const uuidAprendiz = toRaw(form.value.aprendiz.value);
    const data = await service.gerarRelatorio(uuidAprendiz);

    const graficos = data.map(item => {
        return item.treinamentos.map(tre => {
            return { treinamentoUuid: tre.uuid, chart: tre.chartData }
        });
    })

    graficos.forEach((graf) => {
        graf.forEach((chart) => {
            const canvas = document.createElement('canvas');
            canvas.id = `${chart.treinamentoUuid}`; // Adiciona um ID único para cada canvas
            canvas.style.display = 'none';
            const ctx = canvas.getContext('2d');

            new ChartJS(ctx || '', chart.chart);

            // Anexa o canvas ao elemento div
            if (chartContainer.value) {
                chartContainer.value.appendChild(canvas);
            }
        })
    })
}

function gerarGraficosTela() {
    $q.loading.show();
    renderizarGraficos().then(() => setTimeout(imprimirPDF, 3000)).catch((err) => console.log(err));
}

async function imprimirPDF() {
    const uuidAprendiz = toRaw(form.value.aprendiz.value);
    const data = await service.gerarRelatorio(uuidAprendiz);

    //Cria uma nova instância do jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Set document properties
    pdf.setProperties({
        title: "Relatório geral de evolução",
    });

    const font = 'Newsreader';

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const marginLeft = 10;
    const marginRight = 10;
    const maxWidth = pageWidth - marginLeft - marginRight;

    let yPos = 0;

    let tipoProtocolo: string = '';

    let nomeArquivo: string = '';

    data.forEach((item) => {

        if (nomeArquivo === '') {
            nomeArquivo = item.profissional.nome + ' - ' + item.aprendiz.nome + '-' + new Date().toLocaleDateString();
        }

        //Cabeçalho do Relatório
        pdf.setFont(font, 'normal');
        pdf.setFontSize(11);//Tamanho da fonte
        pdf.text(item.cabecario.descricao, 13, 10);

        pdf.setFontSize(12);//Tamanho da fonte

        pdf.setFont(font, 'bold');
        pdf.text('Profissional:', 13, 20);
        pdf.setFont(font, 'normal');
        pdf.text(item.profissional.nome, 40, 20);

        pdf.setFont(font, 'bold');
        pdf.text('Aprendiz:', 13, 30);
        pdf.setFont(font, 'normal');
        pdf.text(item.aprendiz.nome, 35, 30);
        pdf.setFont(font, 'bold');
        pdf.text('Idade:', 13, 35);
        pdf.setFont(font, 'normal');
        pdf.text(item.aprendiz.idade, 30, 37);

        yPos = 40;

        item.treinamentos.forEach((treinamento) => {

            let objetivoCount = 1;

            pdf.setFontSize(17);
            pdf.setFont(font, 'bold');
            pdf.text('Treinamento:', 13, yPos += 5);
            pdf.text(treinamento.data, 135, yPos);
            pdf.setFont(font, 'normal');
            pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

            pdf.setFontSize(12);

            pdf.text(`Treinamento: ${treinamento.titulo}`, 13, yPos += 5);
            pdf.text(`Protocolo: ${treinamento.protocolo}`, 13, yPos += 5);
            tipoProtocolo = treinamento.protocolo;

            if (treinamento.descricao.length > 0) {
                pdf.setFont(font, 'bold');
                pdf.text('Descrição:', 13, yPos += 10);
                pdf.setFont(font, 'normal');
                const lines = pdf.splitTextToSize(treinamento.descricao, maxWidth);
                pdf.text(lines, 13, yPos += 5);

                yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.
            }

            treinamento.alvosColetados.forEach((alvo) => {

                pdf.setFontSize(17);
                pdf.setFont(font, 'bold');
                pdf.text(`${objetivoCount++} - Objetivo aplicado:`, 13, yPos += 10);
                pdf.setFontSize(12);
                pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

                pdf.setFont(font, 'bold');
                pdf.text(`Data da coleta: `, 13, yPos += 10);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.dataColeta, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Nome do objetivo:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.nomeAlvo, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Tipo de aprendizagem:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.tipoAprendizagem, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Pergunta:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.pergunta || 'N/D', 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Descritivo do objetivo:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                const lines = pdf.splitTextToSize(alvo.descricaoAlvo || 'N/D', maxWidth);
                pdf.text(lines, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Resposta do objetivo:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.resposta.toString(), 60, yPos);

                if (alvo.anotacoes.length > 0) {
                    pdf.setFontSize(17);
                    pdf.setFont(font, 'bold');
                    pdf.text('Anotações feitas no objetivo:', 13, yPos += 15);
                    pdf.setFont(font, 'normal');
                    pdf.setFontSize(12);
                    pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

                    alvo.anotacoes.forEach((anotacao) => {

                        pdf.setFont(font, 'bold');
                        pdf.text('Data da anotação: ', 13, yPos += 10);
                        pdf.setFont(font, 'normal');
                        pdf.text(anotacao.data, 47, yPos);
                        const lines = pdf.splitTextToSize(anotacao.descricao, maxWidth);
                        pdf.text(lines, 13, yPos += 5);

                        yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.

                        if (yPos + 20 > pageHeight) {
                            yPos = 10;
                            pdf.addPage();
                        }
                    });
                }
            });

            if (yPos + 20 > pageHeight) {
                yPos = 10;
                pdf.addPage();
            }

            pdf.setFontSize(17);
            pdf.setFont(font, 'bold');
            pdf.text('Represetação gráfica:', 13, yPos += 10);
            pdf.setFont(font, 'normal');
            pdf.setFontSize(12);
            pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

            if (tipoProtocolo == 'Protocolo ABC') {
                var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 13, yPos += 10, 100, 100);

                if (yPos > 18) {
                    yPos = 10;
                    pdf.addPage();
                }
            }

            if (tipoProtocolo == 'Protocolo Ocorrência de Resposta') {
                var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 13, yPos += 10, 180, 80);

                if (yPos > 18) {
                    yPos = 10;
                    pdf.addPage();
                }
            }
        })
    })

    $q.loading.hide();
    pdf.save(`${nomeArquivo}.pdf`);
}

onMounted(() => {
    db.aprendizes.toArray().then((res) => {
        res.forEach((aprendiz) => {
            aprendizes.value.push({
                label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${aprendiz.nasc_aprendiz
                    }`,
                value: aprendiz.uuid,
            });
        });
    });
})
</script>