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

    </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import { jsPDF } from 'jspdf';

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
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis, porta nam nisl accumsan pulvinar vulputate hac vehicula quisque, aliquam vulputate egestas ad gravida massa quisque. dolor curae faucibus laoreet blandit leo litora platea interdum habitant.'
                                }
                            ]
                        }
                    ]
                }]
            }]
        }
    ];

    //Cria uma nova instância do jsPDF
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
        title: "Relatório geral de evolução",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const marginLeft = 10;
    const marginRight = 10;
    const maxWidth = pageWidth - marginLeft - marginRight;

    let yPos = 85;

    data.forEach((item) => {

        //Cabeçalho do Relatório
        pdf.setFont('Newsreader', 'normal');
        pdf.setFontSize(11);//Tamanho da fonte
        pdf.text(item.cabecario.descricao, 13, 30);
        pdf.line(10, 32, 200, 32);//Linha divisória

        pdf.setFontSize(14);//Tamanho da fonte

        pdf.setFont('Newsreader', 'bold');
        pdf.text('Profissional:', 13, 40);
        pdf.setFont('Newsreader', 'normal');
        pdf.text(item.profissional.nome, 13, 45);

        pdf.setFont('Newsreader', 'bold');
        pdf.text('Aprendiz:', 13, 55);
        pdf.setFont('Newsreader', 'normal');
        pdf.text(item.aprendiz.nome, 13, 60);
        pdf.setFont('Newsreader', 'bold');
        pdf.text('Idade:', 13, 65);
        pdf.setFont('Newsreader', 'normal');
        pdf.text(item.aprendiz.idade, 13, 70);

        pdf.line(10, 75, 200, 75);

        pdf.setFontSize(17);
        pdf.setFont('Newsreader', 'bold');
        pdf.text('Treinamento', 13, 85);
        pdf.setFont('Newsreader', 'normal');
        pdf.line(13, yPos += 5, 200, yPos);//Linha divisória

        pdf.setFontSize(12);

        let showTituloAlvos = true;
        let showTituloAnotacoes = true;

        item.treinamentos.forEach((treinamento) => {

            pdf.text(treinamento.data, 13, yPos += 10);
            pdf.text(`Treinamento: ${treinamento.nomeTreinamento}`, 13, yPos += 5);
            pdf.text(`Protocolo: ${treinamento.protocolo}`, 13, yPos += 5);

            pdf.setFont('Newsreader', 'bold');
            pdf.text('Descrição:', 13, yPos += 10);
            pdf.setFont('Newsreader', 'normal');
            const lines = pdf.splitTextToSize(treinamento.descricao, maxWidth);
            pdf.text(lines, 13, yPos += 5);

            yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.

            treinamento.alvosColetados.forEach((alvo) => {

                if (showTituloAlvos) {
                    pdf.setFontSize(17);
                    pdf.setFont('Newsreader', 'bold');
                    pdf.text('Objetivos aplicados', 13, yPos += 10);
                    pdf.setFontSize(12);
                    pdf.line(13, yPos += 5, 200, yPos);//Linha divisória
                }

                showTituloAlvos = false;

                alvo.alvos.forEach((alvo) => {

                    pdf.setFont('Newsreader', 'normal');
                    pdf.text(`Data da anotação: ${alvo.dataColeta}`, 13, yPos += 10);
                    pdf.text(alvo.nomeAlvo, 13, yPos += 10);
                    pdf.text(alvo.tipoAprendizagem, 13, yPos += 10);
                    pdf.text(alvo.pergunta, 13, yPos += 10);
                    pdf.text(alvo.descricaoAlvo, 13, yPos += 10);
                    pdf.text(alvo.resposta, 13, yPos += 10);

                    alvo.anotacoes.forEach((anotacao) => {

                        if (showTituloAnotacoes) {
                            pdf.setFontSize(17);
                            pdf.setFont('Newsreader', 'bold');
                            pdf.text('Anotações dos objetivos aplicados', 13, yPos += 10);
                            pdf.setFont('Newsreader', 'normal');
                            pdf.setFontSize(12);
                            pdf.line(13, yPos += 5, 200, yPos);//Linha divisória
                        }

                        showTituloAnotacoes = false;

                        pdf.text(anotacao.data, 13, yPos += 10);
                        const lines = pdf.splitTextToSize(anotacao.descricao, maxWidth);
                        pdf.text(lines, 13, yPos += 5);

                        yPos += lines.length * 4; //Aplica um espaçamento entre as linhas dinamicamente.
                    });
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