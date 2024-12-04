<template>
    <div class="q-pa-md">
        <title-custom title="Cadastrar Protocolo para Avaliação" />
        <div class="q-mb-md">
            <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz" />
        </div>

        <div class="q-mb-md" v-show="showOpcoes">
            <q-table :rows="avaliacaoRows" :columns="avaliacaoColumns" row-key="name" class="my-sticky-column-table"
                v-model:selected="selected" selection="single" :rows-per-page-options="[10]" :rows-per-page="10">
                <template v-slot:body-cell-actionsx="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil" color="teal">
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-dialog v-model="dialog">
            <q-card class="my-card q-pa-md full-width">
                <canvas id="grafico" width="400" height="200"></canvas>
                <div class="text-center text-body1 text-teal">Gráfico</div>
            </q-card>
        </q-dialog>

        <div v-if="isHabilitaProtocolos">
            <div class="text-teal text-h6">VB-MAPP</div>
            <q-table :rows="rows" :columns="columns" row-key="name" class="my-sticky-column-table"
                :rows-per-page-options="[10]" :rows-per-page="10">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil" color="teal" @click="ir(props.row.name)" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actionsx="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-chart-line" color="blue-3" @click="abrirGrafrico()" />
                    </q-td>
                </template>
            </q-table>
        </div>



        <!--
        <div class="q-pa-sm"></div>

        <q-list bordered v-show="false">
            <q-expansion-item expand-separator label="ABLLS" :disable="!isHabilitaProtocolos">
                <q-card>
                    <q-card-section>
                        EM BREVE
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>

        <div class="q-pa-sm"></div>

        <q-list bordered v-show="false">
            <q-expansion-item expand-separator label="Protocolo Portage" :disable="!isHabilitaProtocolos">
                <q-card>
                    <q-card-section>
                        EM BREVE
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="!isHabilitaProtocolos">
            <q-btn fab icon="mdi-plus" color="blue" :to="{ name: 'avaliacoes-novo' }" />
        </q-page-sticky>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { useAvaliacaoStore } from 'src/stores/avaliacao';
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { AprendizService } from 'src/services/AprendizService';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { VbMappService } from 'src/services/VbMappService';

import { nextTick } from 'vue';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
// Registre as escalas e elementos que você pretende usar  
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const aprendizService = new AprendizService();

const $q = useQuasar();

const router = useRouter();

const { error } = useNotify();

const columns = ref<any[]>([]);

const rows = ref<any[]>([]);

const avaliacaoColumns = ref<any[]>([]);

const avaliacaoRows = ref<any[]>([]);

const aprendizes = ref<any[]>([]);

const selected = ref([]);

const showOpcoes = ref<boolean>(false)

const store = useAvaliacaoStore();

const form = ref({
    uuid: '',
    aprendiz: '',
    data_inicio: '',
    sync: false,
    treinamentos: [{}],
    aprendiz_uuid_fk: '',
});

const isHabilitaProtocolos = computed(() => {
    return selected.value.length > 0 && showOpcoes;
});

const vbmappService = new VbMappService();

const dialog = ref(false);

watch(form.value, async () => {
    showOpcoes.value = form.value.aprendiz != null;

    if (form.value != null)
        store.aprendizSelected = form.value.aprendiz;

    try {
        $q.loading.show();
        const { data } = await vbmappService.getVbMappAvaliacaoByAprendizId(form.value.aprendiz.value);

        if (data) {
            const response = data.map((i, idx) => {
                return {
                    id: i.vbMappId,
                    name: `Avaliação - ${idx + 1}`,
                    protocolo: i.protocolo,
                    nivel: i.niveisColeta,
                    align: 'left',
                }
            })
            avaliacaoRows.value = response;
        }

    } catch (e) {

    } finally {
        $q.loading.hide();
    }
});

watch(selected, () => {
    store.avaliacao = selected.value
});


async function carregarSelectAprendizes() {
    try {
        $q.loading.show();
        const { data } = await aprendizService.getAprendizes();
        if (data) {
            data.filter(i => i.ativo === true).forEach((item: any) => {
                aprendizes.value.push({
                    label: item.nome_aprendiz,
                    value: item.uuid,
                });
            });
        } else {
            error('Erro ao carregar aprendizes.')
        }

    } catch (e) {
        error('Erro ao carregar aprendizes.')
    } finally {
        $q.loading.hide();
    }
}

function ir(tipoAvaliacao: string) {

    if (tipoAvaliacao == '')
        throw new Error("precisa ser informada o tipo de avaliação.")

    const obj = toRaw(selected.value[0])
    router.push({ name: "avaliacoes-coleta/vbmapp", params: { aprendizUuid: form.value.aprendiz.value, tipoAvaliacao: tipoAvaliacao.toLocaleLowerCase(), vbmappUuid: obj.id } });
}

let myChart: ChartJS | null = null; // Declare myChart fora da função para manter o contexto  

function abrirGrafrico() {
    dialog.value = true; // Abre o diálogo  
    setTimeout(async () => {

        nextTick(() => { // Espera o próximo tick para garantir que o canvas esteja no DOM  
            const canvas = document.getElementById("grafico") as HTMLCanvasElement;

            if (canvas) {
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // Destruir o gráfico existente se houver  
                    if (myChart) {
                        myChart.destroy(); // Destroi o gráfico anterior  
                    }

                    // Definição dos dados  
                    const labels = ['Imitação', 'Ecoico', 'Ouvinte', 'PV/MTS', 'Mando', 'Tato', 'Brincar', 'Social', 'Vocal'];
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Nível 1',
                                data: [1, 2, 5, 3, 4, 3, 1, 0.5, 2.5],
                                backgroundColor: '#f2c037',
                                stack: 'Stack 0',
                            },
                        ]
                    };

                    // Configurações do gráfico  
                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            animation: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    };

                    // Criação do gráfico com as configurações apropriadas  
                    myChart = new ChartJS(ctx, config);
                } else {
                    console.error("Falha ao obter o contexto 2D do canvas.");
                }
            } else {
                console.error("Canvas não encontrado.");
            }
        });
    }, 500);
}

onMounted(() => {
    carregarSelectAprendizes()
});

columns.value = [
    {
        label: 'Avaliação',
        align: 'center',
        field: 'name'
    },
    { name: 'actions', align: 'center', label: 'Coleta', field: 'actions' },
    { name: 'actionsx', align: 'center', label: 'Gráfico', field: 'actions' }
]

rows.value = [
    {
        name: 'MILESTONES',
    },
    {
        name: 'TAREFAS',
    },
    /*{
        name: 'BARREIRAS',
    },
    {
        name: 'TRANSIÇÃO',
    },
    {
        name: 'PEI',
    },*/
]

avaliacaoColumns.value = [
    {
        label: 'Avaliações',
        align: 'left',
        field: 'name'
    },
    {
        label: 'Níveis',
        align: 'left',
        field: 'nivel'
    },
    {
        label: 'Protocolo',
        align: 'left',
        field: 'protocolo'
    },
]

</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #F0FFFF

  td:first-child
    background-color: #F0FFFF

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>