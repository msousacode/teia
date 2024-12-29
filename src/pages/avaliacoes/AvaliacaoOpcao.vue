<template>
    <div class="q-pa-md">

        <q-dialog v-model="showUrlDownload">
            <q-card>
                <q-card-section class="q-pa-md">
                    <div class="text-body1">Download do Relatório</div>
                    <!--div class="q-mt-md">
                        <q-input filled v-model="urlDownload" label="URL do Download" readonly dense icon="link" />
                    </div-->
                </q-card-section>

                <q-card-actions>
                    <q-btn label="Baixar PDF" color="primary" @click="downloadFile">
                        <q-icon name="cloud_download" class="q-ml-sm" />
                    </q-btn>

                    <q-btn label="Copiar Link" color="secondary" @click="copyLink">
                        <q-icon name="link" />
                    </q-btn>

                    <q-btn flat label="Fechar" @click="showUrlDownload = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <title-custom title="Protocolos" />
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

        <q-dialog v-model="dialogIsVbMapp">
            <avaliacao-grafico v-bind="graficoDataProps"></avaliacao-grafico>
        </q-dialog>

        <q-dialog v-model="dialogIsPortage">
            <portage-avaliacao-grafico v-bind="graficoDataProps"></portage-avaliacao-grafico>
        </q-dialog>

        <div v-if="isHabilitaProtocolos && isVbmapp">
            <div class="text-teal text-h6">VB-MAPP</div>
            <q-table :rows="rows" :columns="columns" row-key="name" class="my-sticky-column-table"
                :rows-per-page-options="[10]" :rows-per-page="10">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil" color="teal" @click="ir(props.row)" dense size="md" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actionsx="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-chart-line" color="amber-8" @click="dialogIsVbMapp = true" dense size="md"
                            v-if="props.row.name == 'MILESTONES'" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actionsy="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-file-pdf" color="red-8" dense size="md" />
                    </q-td>
                </template>
            </q-table>
        </div>

        <div v-if="isHabilitaProtocolos && isPortage">
            <div class="text-teal text-h6">Portage</div>
            <q-table :rows="rowsPortage" :columns="columnsPortage" row-key="name" class="my-sticky-column-table"
                :rows-per-page-options="[10]" :rows-per-page="10">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil" color="teal" @click="ir(props.row)" dense size="md" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actionsx="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-chart-line" color="amber-8" @click="dialogIsPortage = true" dense size="md" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actionsy="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-file-pdf" color="red-8" dense size="md"
                            @click="gerarRelatorioPortage(props.row)" />
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="!isHabilitaProtocolos">
            <q-btn fab icon="mdi-plus" color="blue" :to="{ name: 'avaliacoes-novo' }" />
        </q-page-sticky>
    </div>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
import AvaliacaoGrafico, { GraficoProps } from './AvaliacaoGrafico.vue';
import PortageAvaliacaoGrafico, { GraficoPortageProps } from './portage/PortageAvaliacaoGrafico.vue';
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { useAvaliacaoStore } from 'src/stores/avaliacao';
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { AprendizService } from 'src/services/AprendizService';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { AvaliacaoService } from 'src/services/AvaliacaoService';
import { useAprendizStore } from 'src/stores/aprendiz';
import { RelatorioService } from 'src/services/RelatorioService';

const aprendizService = new AprendizService();

const $q = useQuasar();

const router = useRouter();

const { error } = useNotify();

const columns = ref<any[]>([]);

const rows = ref<any[]>([]);

const columnsPortage = ref<any[]>([]);

const rowsPortage = ref<any[]>([]);

const avaliacaoColumns = ref<any[]>([]);

const avaliacaoRows = ref<any[]>([]);

const aprendizes = ref<any[]>([]);

const selected = ref([]);

const showOpcoes = ref<boolean>(false)

const store = useAvaliacaoStore();

const aprendizInfoStore = useAprendizStore();

const relatorioService = new RelatorioService();

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

const avaliacaoService = new AvaliacaoService();

const dialogIsVbMapp = ref(false);

const dialogIsPortage = ref(false);

const graficoDataProps: GraficoProps | GraficoPortageProps = reactive({
    label: '',
    avaliacaoId: '',
    nivel: '',
    idade: '3'//TODO colocar a data do aprendiz.
})

const showUrlDownload = ref(false);

const urlDownload = ref<string>();

watch(store, () => {
    const avaliacao = store.$state.avaliacao[0];
    if (avaliacao) {
        graficoDataProps.avaliacaoId = avaliacao.id;
        graficoDataProps.label = avaliacao.name;
        graficoDataProps.nivel = avaliacao.nivel;
    }
})

watch(form.value, async () => {
    showOpcoes.value = form.value.aprendiz != null;

    if (form.value != null) {
        store.aprendizSelected = form.value.aprendiz;

        const { data } = await aprendizService.getAprendizById(store.aprendizSelected.value);

        aprendizInfoStore.setAprendizInfo({ uuid: data.uuid, nome_aprendiz: data.nome_aprendiz, nasc_aprendiz: data.nasc_aprendiz });
    }

    try {
        $q.loading.show();
        const { data } = await avaliacaoService.getAvaliacoes(form.value.aprendiz.value);

        if (data) {
            const response = data.map((i, idx) => {
                return {
                    id: i.id,
                    name: `Avaliação - ${idx + 1}`,
                    protocolo: i.protocolo,
                    nivel: i.protocolo == 'VB-MAPP' ? `Nível ${i.tipo}` : i.protocolo == 'PORTAGE' ? `Idade: ${i.tipo}` : '',
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

const isVbmapp = computed(() => {
    return selected.value[0].protocolo == 'VB-MAPP'
})

const isPortage = computed(() => {
    return selected.value[0].protocolo == 'PORTAGE'
})


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

function ir(tipoAvaliacao: any) {

    const avaliacaoEscolhida = toRaw(tipoAvaliacao);

    if (tipoAvaliacao == '')
        throw new Error("precisa ser informada o tipo de avaliação.")

    const obj = toRaw(selected.value[0])

    const tipoColeta = avaliacaoEscolhida.name.toLocaleLowerCase();

    if (isPortage.value) {
        router.push({ name: avaliacaoEscolhida.path, params: { aprendizUuid: form.value.aprendiz.value, portageId: obj.id } });
    }

    if (isVbmapp.value) {
        router.push({ name: avaliacaoEscolhida.path, params: { aprendizUuid: form.value.aprendiz.value, tipoAvaliacao: tipoColeta, vbmappUuid: obj.id } });
    }
}

async function gerarRelatorioPortage() {
    const obj = toRaw(selected.value[0])
    const portageId = obj.id;

    $q.loading.show();
    const data = await relatorioService.gerarRelatorioPortage(portageId);
    $q.loading.hideF();

    urlDownload.value = data.data.url;
    showUrlDownload.value = true;
}

function downloadFile() {
    window.open(urlDownload.value, '_blank');
    showUrlDownload.value = false;
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
    { name: 'actionsx', align: 'center', label: 'Gráfico', field: 'actions' },
    { name: 'actionsy', align: 'center', label: 'PDF', field: 'actions' }
]

rows.value = [
    {
        name: 'MILESTONES',
        path: 'avaliacoes-coleta/vbmapp'
    },
    /*{
        name: 'TAREFAS',
        path: 'avaliacoes-coleta/vbmapp'
    },*/
    {
        name: 'BARREIRAS',
        path: 'avaliacoes-coleta/vbmapp/barreiras'
    },
    /*{
        name: 'TRANSIÇÃO',
    },
    {
        name: 'PEI',
    },*/
]

columnsPortage.value = [
    {
        label: 'Avaliação',
        align: 'center',
        field: 'name'
    },
    { name: 'actions', align: 'center', label: 'Coleta', field: 'actions' },
    { name: 'actionsx', align: 'center', label: 'Gráfico', field: 'actions' },
    { name: 'actionsy', align: 'center', label: 'PDF', field: 'actions' }
]

rowsPortage.value = [
    {
        name: 'Coleta',
        path: 'avaliacoes-coleta/portage'
    },
]

avaliacaoColumns.value = [
    {
        label: 'Avaliações',
        align: 'left',
        field: 'name'
    },
    {
        label: 'Protocolo',
        align: 'left',
        field: 'protocolo'
    },
    {
        label: '#',
        align: 'left',
        field: 'nivel'
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