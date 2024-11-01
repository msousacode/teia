<template>
    <div class="q-pa-md">
        <title-custom title="Configurações Iniciais da Nova Avaliação (VB-MAPP)" />
        <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
            <div class="q-mb-md">
                <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes"
                    label="Selecione o Aprendiz" />
            </div>

            <q-form @submit.prevent="submit">

                <q-input outlined stack-label label="Queixa Inicial do Tratamento (CID)" v-model="formX.nome_aprendiz"
                    class="q-mb-md" />

                <q-input outlined stack-label label="Objetivo do Documento" v-model="formX.nome_mae" class="q-mb-md" />

                <q-input outlined stack-label label="Metodologia utilizada" v-model="formX.nome_pai" class="q-mb-md" />

                <!--TODO depois lançar os botões em uma única linha um do lado do outro-->
                <div class="fixed-bottom q-pa-md">
                    <q-btn label="Avançar" color="blue-8" class="full-width q-pa-sm" no-caps type="submit" />

                    <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-sm" no-caps flat
                        :to="{ name: 'avaliacoes' }" />
                </div>
            </q-form>
        </div>

        <div class="q-mb-md">
            <q-table :rows="avaliacaoRows" :columns="avaliacaoColumns" row-key="name" class="my-sticky-column-table"
                v-model:selected="selected" selection="multiple" :rows-per-page-options="[10]" :rows-per-page="10">
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
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { db } from 'src/db';
import { onMounted } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';

const avaliacaoColumns = ref<any[]>([]);

const avaliacaoRows = ref<any[]>([]);

const aprendizes = ref<any[]>([]);

const selected = ref([])

const form = ref({
    uuid: '',
    aprendiz: '',
    data_inicio: '',
    sync: false,
    treinamentos: [{}],
    aprendiz_uuid_fk: '',
});

const formX = ref({
    uuid: '',
    nome_aprendiz: '',
    nasc_aprendiz: '',
    nome_mae: '',
    nome_pai: '',
    nome_responsavel: '',
    observacao: '',
    sync: false,
    ativo: true,
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

function submit() {

}

onMounted(() => {
    carregarSelectAprendizes()
});

avaliacaoColumns.value = [
    {
        label: 'Nível que será avaliado',
        align: 'left',
        field: 'name'
    },

]

avaliacaoRows.value = [
    {
        id: 1,
        name: 'Nível 1',
        align: 'left',
    },
    {
        id: 2,
        name: 'Nível 2',
        align: 'left',
    },
    {
        id: 2,
        name: 'Nível 3',
        align: 'left',
    },
]

</script>