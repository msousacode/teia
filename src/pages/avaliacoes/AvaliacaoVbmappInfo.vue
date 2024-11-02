<template>
    <div class="q-pa-md">
        <title-custom title="Configurações Iniciais da Nova Avaliação (VB-MAPP)" />
        <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
            <div class="q-mb-md">
                <q-select stack-label outlined v-model="selectedForm.aprendiz" label="Selecione o Aprendiz"
                    :readonly="true" />
            </div>

            <q-form @submit.prevent="submit">

                <q-input outlined stack-label label="Queixa Inicial do Tratamento (CID)"
                    v-model="infoAvaliacaoForm.queixa" class="q-mb-md" />

                <q-input outlined stack-label label="Objetivo do Documento"
                    v-model="infoAvaliacaoForm.objetivo_documento" class="q-mb-md" />

                <q-input outlined stack-label label="Metodologia utilizada" v-model="infoAvaliacaoForm.metodologia"
                    class="q-mb-md" />

                <div class="fixed-bottom q-pa-md">
                    <div class="row">
                        <div class="col">
                            <q-btn label="Voltar" color="primary" class="full-width q-pa-sm" no-caps flat
                                :to="{ name: 'avaliacoes' }" />
                        </div>
                        <div class="col">
                            <q-btn label="Avançar" color="blue-8" class="full-width q-pa-sm" no-caps @click="avancar"
                                :disabled="isAvancarDisabled" />
                        </div>
                    </div>
                </div>
            </q-form>
        </div>

        <div class="q-mb-md">
            <q-table :rows="rows" :columns="columns" row-key="name" class="my-sticky-column-table"
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
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import { useAvaliacaoStore } from 'src/stores/avaliacao';
import { toRaw } from 'vue';
import { avaliacaoColumns, avaliacaoRows } from './table'
import { useRouter } from 'vue-router';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';

const router = useRouter()

const columns = ref<any[]>(avaliacaoColumns);

const rows = ref<any[]>(avaliacaoRows);

const selected = ref<any[]>([])

const selectedForm = ref({
    uuid: '',
    aprendiz: {}
});

const infoAvaliacaoForm = ref({
    uuid: '',
    uuid_aprendiz: '',
    nome_aprendiz: '',
    queixa: '',
    objetivo_documento: '',
    metodologia: '',
    niveis_coleta: '',
    sync: false,
    ativo: true,
});

const store = useAvaliacaoStore();

const isAvancarDisabled = computed(() => { return selected.value.length == 0 })

function aprendizSelecionado() {
    selectedForm.value.aprendiz = toRaw(store.get.aprendizSelected);
}

async function submit() {

    const avaliacoes = selected.value.map(i => i.id);

    infoAvaliacaoForm.value.uuid = uuid();
    infoAvaliacaoForm.value.uuid_aprendiz = selectedForm.value.aprendiz.value;
    infoAvaliacaoForm.value.nome_aprendiz = selectedForm.value.aprendiz.label;
    infoAvaliacaoForm.value.niveis_coleta = avaliacoes.toString();

    const data = toRaw(infoAvaliacaoForm.value);

    db.vbmapp.add(data);
}

async function avancar() {
    await submit().then(() => {
        const uuid = infoAvaliacaoForm.value.uuid_aprendiz;
        router.push({ name: 'avaliacoes-coleta/vbmapp', params: { aprendizUuid: uuid } });
    }).catch(() => {
        console.error("erro ao salvar vbmapp");//TODO depois colocar uma mensagem bonitinha com notify.
    });
}

onMounted(() => {
    aprendizSelecionado();
});

</script>