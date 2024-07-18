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
import autoTable from 'jspdf-autotable';
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

async function imprimirPDF() {

    let nomeArquivo: string = '';

    const uuidAprendiz = toRaw(form.value.aprendiz.value);

    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);

    if (data[0].treinamentos.length === 0 || data === undefined) {
        $q.loading.hide();
        error("Nenhum registro encontrado para o períoodo selecionado.");
        return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('Helvetica');
    pdf.setProperties({
        title: 'relatorio_evolutivo',
    });

    data.forEach((item) => {

        if (nomeArquivo === '') {
            nomeArquivo = 'provisorio';
        }

        autoTable(pdf, {
            head: [['PROFISSIONAL', 'APRENDIZ', 'NÚMERO']],
            body: [
                [item.profissional.nome.toUpperCase(), item.aprendiz.nome.toUpperCase(), 333],
            ],
            theme: 'plain',
        });

        //builder.buildLinhaDivisoria(pdf, 10, 30, 200);

        item.treinamentos.forEach(treinamento => {

            autoTable(pdf, {
                head: [['DATA ÍNICIO', 'NOME DO TREINAMENTO', 'PROTOCOLO', 'DESCRIÇÃO']],
                body: [
                    [treinamento.data, treinamento.titulo, treinamento.protocolo, treinamento.descricao],
                ],
                headStyles: { fillColor: '#f06c8a' }
            });

            autoTable(pdf, {
                head: [['DATA', 'OBJETIVO', 'TP. APRENDIZAGEM', 'RESPOSTA COLETA']],
                body:
                    treinamento.alvosColetados.map(alvo => {
                        return [alvo.dataColeta, alvo.nomeAlvo, alvo.tipoAprendizagem, alvo.resposta]
                    }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            autoTable(pdf, {
                head: [['DATA', 'ANOTAÇÃO']],
                body:
                    treinamento.alvosColetados.map(alvo => {
                        return alvo.anotacoes.map(anotacao => {
                            return anotacao.data, anotacao.descricao
                        })
                    }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');

            autoTable(pdf, {
                head: [['REPRESENTAÇÃO GRÁFICA:']],
                body: [['']],
                columnStyles: {
                    0: { cellWidth: 100, minCellHeight: treinamento.protocolo === 'Protocolo ABC' ? 100 : 50 }, // Definindo a largura da segunda coluna para 100 e a altura mínima para 200
                },
                didDrawCell: (data) => {
                    if (data.section === 'body' && data.column.index === 0) {
                        pdf.addImage(imgData, 'PNG', data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                    }
                },
                theme: 'plain',
            });
        });
    });

    $q.loading.hide();
    pdf.save(`${nomeArquivo}.pdf`);
}

onMounted(() => {
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