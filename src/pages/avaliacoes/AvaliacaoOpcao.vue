<template>
    <div class="q-pa-md">
        <title-custom title="Avaliações" />
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
                        <q-btn icon="mdi-chart-line" color="blue-3">
                        </q-btn>
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
import { db } from 'src/db';
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

watch(form.value, () => {
    showOpcoes.value = form.value.aprendiz != null;

    if (form.value != null)
        store.aprendizSelected = form.value.aprendiz;

    db.vbmapp.where({ aprendiz_uuid_fk: form.value.aprendiz.value }).toArray((res) => {

        const response = res.map((i, idx) => {
            return {
                id: i.uuid,
                name: `Avaliação - ${idx++}`,
                protocolo: i.protocolo.label,
                align: 'left',
            }
        })
        avaliacaoRows.value = response;
    });
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
    /*{
        name: 'SUBTESTE ECOICO',
    },*/
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