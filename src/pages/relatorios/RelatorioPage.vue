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
                data: 'Data Início: //01//06/2024 data Final: 01//08//2024',
                nomeTreinamento: 'Torquent',
                protocolo: 'Protocolo ABC',
                descricao: 'Torquent urna sociosqu quis lobortis pharetra non curae turpis,\n porta nam nisl accumsan pulvinar vulputate hac vehicula\n quisque, \naliquam vulputate egestas ad gravida massa quisque.\n dolor curae faucibus laoreet blandit leo litora platea interdum habitant',

                alvosColetados: [{
                    dataColeta: '05/06/2024',
                    alvos: [
                        {
                            nomeAlvo: 'Torquent urna sociosqu quis',
                            tipoAprendizagem: 'Protocolo ABC',
                            pergunta: 'Torquent urna sociosqu quis lobortis pharetra?',
                            descricaoAlvo: 'Torquent urna sociosqu quis lobortis pharetra',
                            resposta: 'Não Fez',
                            anotacoes: [
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra\n non curae turpis, porta nam nisl accumsan pulvinar vulputate hac\n vehicula quisque, aliquam vulputate egestas ad gravida massa\n quisque. dolor curae faucibus laoreet blandit\n leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra\n non curae turpis, porta nam nisl accumsan pulvinar vulputate hac\n vehicula quisque, aliquam vulputate egestas ad gravida massa\n quisque. dolor curae faucibus laoreet blandit\n leo litora platea interdum habitant.'
                                },
                                {
                                    data: '01/05/2025',
                                    descricao: 'Torquent urna sociosqu quis lobortis pharetra\n non curae turpis, porta nam nisl accumsan pulvinar vulputate hac\n vehicula quisque, aliquam vulputate egestas ad gravida massa\n quisque. dolor curae faucibus laoreet blandit\n leo litora platea interdum habitant.'
                                }
                            ]
                        }
                    ]
                }]
            }]
        }
    ];

    const doc = new jsPDF();

    let yPos = 30;

    data.forEach((item) => {
        let text = `${item.cabecario.descricao}
        \nProfissional: ${item.profissional.nome} ${item.profissional.documento}
        \nAprendiz: ${item.aprendiz.nome}\nIdade: ${item.aprendiz.idade}
        `;

        item.treinamentos.forEach((treinamento) => {
            text += `${treinamento.titulo}
            \n${treinamento.data}
            \n${treinamento.nomeTreinamento}
            \n${treinamento.protocolo}
            \n${treinamento.descricao}
            `;

            treinamento.alvosColetados.forEach((alvo) => {
                text += `${alvo.dataColeta}
                `;

                alvo.alvos.forEach((alvo) => {
                    text += `${alvo.nomeAlvo}
                    \n${alvo.tipoAprendizagem}
                    \n${alvo.pergunta}
                    \n${alvo.descricaoAlvo}
                    \n${alvo.resposta}
                    `;

                    alvo.anotacoes.forEach((anotacao) => {
                        text += `${anotacao.data}
                        \n${anotacao.descricao}
                        `;
                    });
                });
            });
        });

        doc.text(text, 10, yPos);
        yPos += 5; // move a posição y para baixo para a próxima linha
    });

    doc.save('test.pdf');
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