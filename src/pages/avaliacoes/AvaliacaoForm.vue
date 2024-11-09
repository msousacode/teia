<template>
    <div class="q-pa-md">
        <title-custom title="Criar Nova Avaliação" />
        <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
            <q-form>
                <div class="q-mb-md">
                    <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes"
                        label="Selecione o Aprendiz" />
                </div>
                <div class="q-mb-md">
                    <q-select stack-label outlined v-model="form.protocolo" :options="protocolos" label="Protocolos" />
                </div>

                <q-input outlined stack-label label="Queixa Inicial do Tratamento (CID)" v-model="form.queixa"
                    class="q-mb-md" />

                <q-input outlined stack-label label="Objetivo do Documento" v-model="form.objetivo_documento"
                    class="q-mb-md" />

                <q-input outlined stack-label label="Metodologia utilizada" v-model="form.metodologia" class="q-mb-md" />
            </q-form>
        </div>

        <div class="q-mb-md" v-show="isVbmapp">
            <q-table :rows="rows" :columns="columns" row-key="name" class="my-sticky-column-table"
                v-model:selected="niveisSelcionados" selection="multiple" :rows-per-page-options="[10]" :rows-per-page="10">
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
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import { toRaw } from 'vue';
import { avaliacaoColumns, avaliacaoRows } from './table'
import { useRouter } from 'vue-router';
import { db } from 'src/db';
import { computed } from 'vue';
import { v4 as uuid } from 'uuid';

const router = useRouter()

const columns = ref<any[]>(avaliacaoColumns);

const rows = ref<any[]>(avaliacaoRows);

const niveisSelcionados = ref();

const form = ref({
    uuid: '',
    aprendiz_uuid_fk: '',
    nome_aprendiz: '',
    protocolo: '',
    aprendiz: '',
    queixa: '',
    objetivo_documento: '',
    metodologia: '',
    niveis_coleta: '',
    sync: false,
    ativo: true,
});

const aprendizes = ref<any[]>([]);

const protocolos = ref([
    { label: 'VB-MAPP', value: '1' },
    //{ label: 'ABLLS', value: '2' },
    //{ label: 'PORTAGE', value: '3' },
    //{ label: 'SOCIALLY SAVVY', value: '4' }
]);

const isVbmapp = computed(() => form.value.protocolo.label === 'VB-MAPP');

const isAvancarDisabled = false;//computed(() => { return selected.value.length == 0 })

async function avancar() {

    const avaliacoes = niveisSelcionados.value.map(i => i.id);

    form.value.uuid = uuid();
    form.value.aprendiz_uuid_fk = form.value.aprendiz.value;
    form.value.nome_aprendiz = form.value.aprendiz.label;
    form.value.niveis_coleta = avaliacoes.toString();

    const data = toRaw(form.value);

    await db.vbmapp.add(data).then(result => {
        const uuid = form.value.aprendiz_uuid_fk;
        router.push({ name: 'avaliacoes-coleta/vbmapp', params: { aprendizUuid: uuid, vbmappUuid: result } });
    });
}

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
    carregarSelectAprendizes();
});

</script>