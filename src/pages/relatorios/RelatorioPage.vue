<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal-7">Gerar Relatório</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @update:model-value="pesquisar" />
            </q-form>
        </div>

        <!--
        TODO decidir se vai ser exibido ou não
        <div class="q-mt-sm row items-start q-gutter-md justify-center">
            <q-card class="my-card bg-green text-white" style="width: 45%;">
                <q-card-section>
                    <div class="text-subtitle1">FEZ SEM AJUDA
                        <br /> INDEPENDÊNCIA
                    </div>
                    <div class="text-h6">70%</div>
                </q-card-section>
            </q-card>
            <q-card class="my-card bg-red-5 text-white" style="width: 45%;">
                <q-card-section>
                    <div class=" text-subtitle1">FEZ COM AJUDA <br /> OU NÃO FEZ
                    </div>
                    <div class="text-h6">30%</div>
                </q-card-section>
            </q-card>
        </div-->

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase" v-if="exibirRelatorioBtn">Treinamentos em
            andamento:</div>
        <div v-for="(
              item, index
            ) in treinamentos" :key="index">
            <q-card flat bordered class="my-card q-mb-sm" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col">

                            <div class="text-body1"><span class="text-teal">Treinamento:</span> {{ item.treinamento
                                }}</div>
                            <div class="text-body1"><span class="text-teal">Protocolo: </span>{{
                    item.protocolo }}
                                <div class="text-caption">Início 01/06/24 até 30/06/24</div>
                            </div>
                            <div class="q-mb-md"></div>
                            <q-item-label>
                                Progresso:
                            </q-item-label>
                            <q-linear-progress size="25px" :value="progress1" color="green-5">
                                <div class="absolute-full flex flex-center">
                                    <q-badge color="white" text-color="accent" :label="progressLabel1" />
                                </div>
                            </q-linear-progress>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <div class="row justify-center">
            <q-btn label="Gerar Relatório" color="info" class="col-md-7 col-xs-12 col-sm-12 q-mt-xl q-pa-sm"
                @click="generatePdf" :disabled="!exibirRelatorioBtn" />
        </div>

        <Pie id="canvasPie" :data="dataPie" :options="dataPie.options" class="hidden-pie" />
        <Line id="canvasLine" :data="dataLine" :options="dataPie.options" class="hidden-pie" />

    </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import { jsPDF } from 'jspdf';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js'
import { Line, Pie } from 'vue-chartjs'
import { RelatorioService } from 'src/services/RelatorioService';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const dataPie = ref({
    labels: ['NÃO FEZ 40%', 'COM AJUDA 20%', 'SEM AJUDA 10%'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 10]
        }
    ],
    options: {
        responsive: true,
    }
});

const dataLine = ref({
    labels: ['1ª Sem', '2ª Sem', '3ª Sem', '4ª Sem', '5ª Sem', '6ª Sem', '7ª Sem', '8ª Sem', '9ª Sem', '10ª Sem', '11ª Sem', '12ª Sem'],
    datasets: [
        {
            label: '2024',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40, 39, 10, 40, 39, 80]
        }
    ],
    options: {
        responsive: true,
    }
});

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

const progress1 = ref(0.3)

const exibirRelatorioBtn = ref(false);

let progressLabel1 = computed(() => (progress1.value * 100).toFixed(2) + '%');

function pesquisar() {
    const raw = toRaw(form.value);

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {
            treinamentos.value = toRaw(item.treinamentos)
        });
    })

    exibirRelatorioBtn.value = true;
}

function generatePdf() {

    const service = new RelatorioService();

    const data = service.gerarRelatorio();

    //Cria uma nova instância do jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Set document properties
    pdf.setProperties({
        title: "Relatório geral de evolução",
    });

    const font = 'Newsreader';

    const pageWidth = pdf.internal.pageSize.getWidth();
    const marginLeft = 10;
    const marginRight = 10;
    const maxWidth = pageWidth - marginLeft - marginRight;

    let yPos = 60;

    let tipoProtocolo: string = '';

    data.forEach((item) => {

        //Cabeçalho do Relatório
        pdf.setFont(font, 'normal');
        pdf.setFontSize(11);//Tamanho da fonte
        pdf.text(item.cabecario.descricao, 13, 20);

        pdf.setFontSize(14);//Tamanho da fonte

        pdf.setFont(font, 'bold');
        pdf.text('Profissional:', 13, 30);
        pdf.setFont(font, 'normal');
        pdf.text(item.profissional.nome, 40, 30);

        pdf.setFont(font, 'bold');
        pdf.text('Aprendiz:', 13, 40);
        pdf.setFont(font, 'normal');
        pdf.text(item.aprendiz.nome, 35, 40);
        pdf.setFont(font, 'bold');
        pdf.text('Idade:', 13, 47);
        pdf.setFont(font, 'normal');
        pdf.text(item.aprendiz.idade, 30, 47);

        const pageHeight = pdf.internal.pageSize.getHeight() - 40;

        item.treinamentos.forEach((treinamento) => {

            pdf.setFontSize(17);
            pdf.setFont(font, 'bold');
            pdf.text('Treinamento:', 13, yPos += 5);
            pdf.text(treinamento.data, 135, yPos);
            pdf.setFont(font, 'normal');
            pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

            pdf.setFontSize(12);

            pdf.text(`Treinamento: ${treinamento.nomeTreinamento}`, 13, yPos += 5);
            pdf.text(`Protocolo: ${treinamento.protocolo}`, 13, yPos += 5);
            tipoProtocolo = treinamento.protocolo;

            pdf.setFont(font, 'bold');
            pdf.text('Descrição:', 13, yPos += 10);
            pdf.setFont(font, 'normal');
            const lines = pdf.splitTextToSize(treinamento.descricao, maxWidth);
            pdf.text(lines, 13, yPos += 5);

            yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.

            treinamento.alvosColetados.forEach((alvo) => {

                pdf.setFontSize(17);
                pdf.setFont(font, 'bold');
                pdf.text('Objetivo aplicado:', 13, yPos += 10);
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
                pdf.text(alvo.pergunta, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Descritivo do objetivo:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.descricaoAlvo, 60, yPos);

                pdf.setFont(font, 'bold');
                pdf.text('Resposta do objetivo:', 13, yPos += 5);
                pdf.setFont(font, 'normal');
                pdf.text(alvo.resposta, 60, yPos);

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

                    if (yPos > pageHeight) {
                        yPos = 10;
                        pdf.addPage();
                    }
                });

            });

            pdf.setFontSize(17);
            pdf.setFont(font, 'bold');
            pdf.text('Represetação gráfica:', 13, yPos += 10);
            pdf.setFont(font, 'normal');
            pdf.setFontSize(12);
            pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

            console.log(tipoProtocolo)

            if (tipoProtocolo == 'Protocolo ABC') {
                var imgData = document.getElementById("canvasPie").toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 13, yPos += 10, 100, 100);
            }

            if (tipoProtocolo == 'Ocorrência de respostas') {
                var imgData = document.getElementById("canvasLine").toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 13, yPos += 10, 180, 80);
            }

            yPos = 10;
            pdf.addPage();
            pdf.setFont(font, 'normal');
        });
    });

    pdf.save('test.pdf');
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

<style scoped>
.hidden-pie {
    visibility: hidden;
}

.hidden-pie {
    display: none;
}
</style>