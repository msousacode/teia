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
            <q-btn label="Gerar Relatório" color="info" class="col-12 q-pa-sm" size="18px" @click="gerarGraficosTela"
                :disabled="!exibirRelatorioBtn" />
        </div>

        <div ref="chartContainer"></div>

    </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
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
import useNotify from 'src/composables/UseNotify';
import { RelatorioConcreteBuilder } from './builder/RelatorioContreteBuilder';
import { Diretor } from './builder/diretor/Diretor';
import jsPDF from 'jspdf';

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

const { error } = useNotify();

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

/**
 * A função cliente passa o objeto builder para o diretor que 
 * inicia o processo de construção do objeto relatório.
 * O resultado será retornado com o objeto construído. 
 */
async function imprimirPDF() {

    const uuidAprendiz = toRaw(form.value.aprendiz.value);

    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);

    if (data[0].treinamentos.length === 0 || data === undefined) {
        $q.loading.hide();
        error("Nenhum registro encontrado para o períoodo selecionado.");
        return;
    }

    const diretor = new Diretor();
    const builder = new RelatorioConcreteBuilder();
    const pdf = builder.init();

    diretor.setBuilder(builder, pdf);

    let yPos = 40;

    data.forEach((item) => {
        diretor.buildDataHora(item.cabecario.descricao);
        diretor.buildTitulo('Relatório de evolução', 20);
        diretor.buildLinhaDivisoria(10, 25, 200);

        diretor.buildTexto(`Profissional: ${item.profissional.nome}`, yPos);
        yPos = incrementaYPos(yPos, 10);
        yPos = novaPagina(pdf, yPos)

        diretor.buildTexto(`Aprendiz: ${item.aprendiz.nome}`, yPos);
        yPos = incrementaYPos(yPos, 10);
        yPos = novaPagina(pdf, yPos)

        item.treinamentos.forEach(treinamento => {

            diretor.buildTitulo('Treinamento', yPos);
            yPos = incrementaYPos(yPos, 5);

            diretor.buildLinhaDivisoria(10, yPos, 200);
            yPos = incrementaYPos(yPos, 5);
            yPos = novaPagina(pdf, yPos);

            diretor.buildTexto(`Nome do treinamento: ${treinamento.titulo}`, yPos);
            yPos = incrementaYPos(yPos, 5);
            yPos = novaPagina(pdf, yPos);

            diretor.buildTexto(`Protocolo utilizado: ${treinamento.protocolo}`, yPos);
            yPos = incrementaYPos(yPos, 5);
            yPos = novaPagina(pdf, yPos);

            diretor.buildTextoMuitasLinhas(`Descrição do treinamento: ${treinamento.descricao}`, 200, yPos);
            yPos = incrementaYPos(yPos, 10);
            yPos = novaPagina(pdf, yPos);

            treinamento.alvosColetados.forEach(alvo => {

                diretor.buildTitulo('Objetivos coletados', yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildLinhaDivisoria(10, yPos, 200);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildTexto(`Data da coleta: ${alvo.dataColeta}`, yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildTexto(`Objetivo: ${alvo.nomeAlvo}`, yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildTexto(`Tipo de Aprendizagem: ${alvo.tipoAprendizagem}`, yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildTextoMuitasLinhas(`Descrição do objetivo: ${alvo.descricaoAlvo}`, 200, yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                diretor.buildTexto(`Resposta coletada: ${alvo.resposta}`, yPos);
                yPos = incrementaYPos(yPos, 5);
                yPos = novaPagina(pdf, yPos);

                if (alvo.anotacoes.length > 0) {
                    diretor.buildTitulo('Anotações feitas no objetivo', yPos);
                    yPos = incrementaYPos(yPos, 5);
                    yPos = novaPagina(pdf, yPos);

                    diretor.buildLinhaDivisoria(10, yPos, 200);
                    yPos = incrementaYPos(yPos, 5);
                    yPos = novaPagina(pdf, yPos);

                    alvo.anotacoes.forEach(anotacao => {
                        diretor.buildTexto(`Data da anotação: ${anotacao.data}`, yPos);
                        yPos = incrementaYPos(yPos, 5);
                        yPos = novaPagina(pdf, yPos);

                        diretor.buildTextoMuitasLinhas(`Descrição da anotação: ${anotacao.descricao}`, 200, yPos);
                        yPos = incrementaYPos(yPos, 5);
                        yPos = novaPagina(pdf, yPos);
                    });
                }


            });

            diretor.buildTitulo('Representação gráfica:', yPos);
            yPos = incrementaYPos(yPos, 5);
            yPos = novaPagina(pdf, yPos);

            if (treinamento.protocolo === 'Protocolo ABC') {
                var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');
                pdf.addImage(imgData, 'png', 10, yPos += 10, 100, 90);
                yPos = incrementaYPos(yPos, 50);
                yPos = novaPagina(pdf, yPos);

            }

            if (treinamento.protocolo === 'Protocolo Ocorrência de Resposta') {
                var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');
                pdf.addImage(imgData, 'png', 10, yPos += 10, 100, 50);
                yPos = incrementaYPos(yPos, 50);
                yPos = novaPagina(pdf, yPos);
            }
        });
    });

    $q.loading.hide();
    pdf.save(`TESTe.pdf`); //Colocar esse método dentro de um build.
    console.log('Finalizando relatório PDF');
}

//TODO depois jogar para dentro do build
function novaPagina(pdf: jsPDF, yPos: number) {
    const pageHeight = 297; // A4 page height in mm
    const bottomMargin = 10; // bottom margin in mm    

    if (yPos > pageHeight - bottomMargin) {
        pdf.addPage();
        return yPos = 20;
    }

    return yPos;
}

function incrementaYPos(yPos: number, incremento: number) {
    return yPos += incremento;
}

/* async function imprimirPDF() {
    const uuidAprendiz = toRaw(form.value.aprendiz.value);

    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);

    if (data[0].treinamentos.length === 0) {
        $q.loading.hide();
        error("Nenhum registro encontrado para o períoodo selecionado.");
        return;
    }

    //Cria uma nova instância do jsPDF
    const pdf = new jsPDF('p', 'cm', 'a4');

    // Set document properties
    pdf.setProperties({
        title: "Relatório geral de evolução",
    });

    const font = 'Newsreader';

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const marginLeft = 0;
    const marginRight = 0;
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
} */

onMounted(() => {

    //gerarRelatorioPDF();

    db.aprendizes.toArray().then((res) => {
        res.filter(i => i.ativo === true).forEach((aprendiz) => {
            aprendizes.value.push({
                label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${aprendiz.nasc_aprendiz
                    }`,
                value: aprendiz.uuid,
            });
        });
    });
})
</script>