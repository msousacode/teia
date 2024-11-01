<template>
    <div class="q-pa-md">

        <div class="q-mb-md">
            <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz" />
        </div>
        <q-list bordered>
            <q-expansion-item expand-separator label="VB-MAPP">
                <q-table :rows="rows" :columns="columns" row-key="name" class="my-sticky-column-table"
                    :rows-per-page-options="[10]" :rows-per-page="10">
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-pencil" color="teal">
                                <q-tooltip> Coleta </q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>
                    <template v-slot:body-cell-actionsx="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-chart-line" color="blue-3">
                                <q-tooltip> Gráfico </q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>
                </q-table>
            </q-expansion-item>

            <q-expansion-item expand-separator label="Protocolo Portage">
                <q-card>
                    <q-card-section>
                        EM BREVE
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { db } from 'src/db';
import { onMounted } from 'vue';

const columns = ref<any[]>([]);

const rows = ref<any[]>([]);

const aprendizes = ref<any[]>([]);

const form = ref({
    uuid: '',
    aprendiz: '',
    data_inicio: '',
    sync: false,
    treinamentos: [{}],
    aprendiz_uuid_fk: '',
});

function carregarSelectAprendizes() {
    db.aprendizes.toArray().then((res) => {
        res.filter(i => i.ativo === true).forEach((aprendiz) => {
            aprendizes.value.push({
                label: aprendiz.nome_aprendiz,
                value: aprendiz.uuid,
            });
        });
    });
}

onMounted(() => {
    carregarSelectAprendizes()
}),

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
        name: 'SUBTESTE ECOICO',
    },
    {
        name: 'TAREFAS',
    },
    {
        name: 'BARREIRAS',
    },
    {
        name: 'TRANSIÇÃO',
    },
    {
        name: 'PEI',
    },
]

</script>

<style lang="sass">
.my-sticky-column-table    

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