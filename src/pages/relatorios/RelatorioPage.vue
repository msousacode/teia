<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal-7">Gerar Relatório</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @input="pesquisar" />
            </q-form>
        </div>

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
        </div>

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase">Treinamentos em andamento:</div>
        <q-list bordered separator v-for="(
              item, index
            ) in treinamentos" :key="index">
            <q-item clickable v-ripple>
                <q-item-section>
                    <q-item-label class="text-subtitle1 q-mb-sm">{{ item.treinamento }}</q-item-label>
                    <q-item-label class="text-subtitle1 q-mb-sm" caption>Início: 15/06/2024</q-item-label>
                    <q-item-label class="text-subtitle1 q-mb-sm" caption>Final: 15/06/2024</q-item-label>
                    <q-item-label>
                        Progresso:
                    </q-item-label>
                    <q-linear-progress size="25px" :value="progress1" color="green-5">
                        <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="accent" :label="progressLabel1" />
                        </div>
                    </q-linear-progress>
                </q-item-section>
            </q-item>
        </q-list>

        <div class="row justify-center">
            <q-btn label="Gerar Relatório" color="info" class="col-md-7 col-xs-12 col-sm-12 q-mt-xl"
                @click="generatePdf" />
        </div>

        <Pie id="canvas" :data="data" :options="{ responsive: true }" class="hidden-pie" />

    </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import { jsPDF } from 'jspdf';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);

const data = ref({
    labels: ['NÃO FEZ', 'COM AJUDA', 'SEM AJUDA'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 10]
        }
    ]
});

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

const progress1 = ref(0.3)

let progressLabel1 = computed(() => (progress1.value * 100).toFixed(2) + '%');

function pesquisar() {
    const raw = toRaw(form.value);

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {
            treinamentos.value = toRaw(item.treinamentos)
        });
    })
}

function generatePdf() {

    const data = [
        {
            cabecario: {
                descricao: 'Relatório gerado em 16/06/2024'
            },
            profissional: {
                nome: 'Catarina Soares Sobral',
                documento: 'CRO 5406'
            },
            aprendiz: {
                nome: 'José Henrique',
                idade: '3 anos'
            },
            treinamentos: [{
                titulo: 'Treinamento',
                data: 'Data Início: 01/06/2024 data Final: 01/08/2024',
                nomeTreinamento: 'Torquent',
                protocolo: 'Protocolo ABC',
                descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant',

                alvosColetados: [{
                    alvos: [
                        {
                            dataColeta: '05/06/2024',
                            nomeAlvo: 'Torquent urna sociosqu quis',
                            tipoAprendizagem: 'Protocolo ABC',
                            pergunta: 'Torquent urna sociosqu quis lobortis pharetra?',
                            descricaoAlvo: 'Torquent urna sociosqu quis lobortis pharetra',
                            resposta: 'Não Fez',
                            anotacoes: [
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant. Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                },
                            ]
                        }
                    ]
                }]
            }]
        }
    ];

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

        pdf.setFontSize(17);
        pdf.setFont(font, 'bold');
        pdf.text('Treinamento:', 13, 60);
        pdf.setFont(font, 'normal');
        pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

        pdf.setFontSize(12);

        let showTituloAlvos = true;
        let showTituloAnotacoes = true;
        const pageHeight = pdf.internal.pageSize.getHeight();

        item.treinamentos.forEach((treinamento) => {

            pdf.text(treinamento.data, 13, yPos += 10);
            pdf.text(`Treinamento: ${treinamento.nomeTreinamento}`, 13, yPos += 5);
            pdf.text(`Protocolo: ${treinamento.protocolo}`, 13, yPos += 5);

            pdf.setFont(font, 'bold');
            pdf.text('Descrição:', 13, yPos += 10);
            pdf.setFont(font, 'normal');
            const lines = pdf.splitTextToSize(treinamento.descricao, maxWidth);
            pdf.text(lines, 13, yPos += 5);

            yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.

            treinamento.alvosColetados.forEach((alvo) => {

                if (showTituloAlvos) {
                    pdf.setFontSize(17);
                    pdf.setFont(font, 'bold');
                    pdf.text('Objetivos aplicados:', 13, yPos += 10);
                    pdf.setFontSize(12);
                    pdf.line(13, yPos += 2, 200, yPos);//Linha divisória
                }

                showTituloAlvos = false;

                alvo.alvos.forEach((alvo) => {

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

                    alvo.anotacoes.forEach((anotacao) => {

                        if (showTituloAnotacoes) {
                            pdf.setFontSize(17);
                            pdf.setFont(font, 'bold');
                            pdf.text('Anotações dos objetivos aplicados:', 13, yPos += 15);
                            pdf.setFont(font, 'normal');
                            pdf.setFontSize(12);
                            pdf.line(13, yPos += 2, 200, yPos);//Linha divisória
                        }

                        showTituloAnotacoes = false;

                        pdf.setFont(font, 'bold');
                        pdf.text('Data da anotação: ', 13, yPos += 10);
                        pdf.setFont(font, 'normal');
                        pdf.text(anotacao.data, 47, yPos);
                        const lines = pdf.splitTextToSize(anotacao.descricao, maxWidth);
                        pdf.text(lines, 13, yPos += 5);

                        yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.

                        if (yPos > pageHeight - 40) {
                            pdf.addPage();
                            yPos = 10;
                        }
                    });

                    pdf.setFontSize(17);
                    pdf.setFont(font, 'bold');
                    pdf.text('Represetação gráfica:', 13, yPos += 10);
                    pdf.setFont(font, 'normal');
                    pdf.line(13, yPos += 2, 200, yPos);//Linha divisória

                    var imgData = document.getElementById("canvas").toDataURL('image/png');
                    pdf.addImage(imgData, 'PNG', 13, yPos += 10, 100, 100);
                });
            });
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