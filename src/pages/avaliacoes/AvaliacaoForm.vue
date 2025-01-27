<template>
    <div class="q-pa-md">
        <title-custom title="Nova Avaliação" />
        <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
            <q-form>
                <div class="q-mb-md">
                    <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes"
                        label="Selecione o Aprendiz" />
                </div>
                <div class="q-mb-md">
                    <q-select stack-label outlined v-model="form.protocolo" :options="protocolos" label="Protocolos" />
                </div>

                <q-input outlined stack-label label="Objetivo do Documento" v-model="form.objetivo_documento"
                    class="q-mb-md" />
            </q-form>
        </div>

        <div class="q-mb-md" v-show="isVbmapp">
            <q-table :rows="rowsVbMapp" :columns="columnsVbMapp" row-key="name" class="my-sticky-column-table"
                v-model:selected="niveisSelcionados" selection="single" :rows-per-page-options="[10]"
                :rows-per-page="10">
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

        <div class="q-mb-md" v-show="isPortage">
            <q-table :rows="rowsPortage" :columns="columnsPortage" row-key="name" class="my-sticky-column-table"
                v-model:selected="idadeSelcionados" selection="multiple" :rows-per-page-options="[10]"
                :rows-per-page="10">
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

        <div class="q-mb-md" v-show="isAblls">
            <q-table :rows="rowsPortage" :columns="columnsPortage" row-key="name" class="my-sticky-column-table"
                v-model:selected="idadeSelcionados" selection="multiple" :rows-per-page-options="[10]"
                :rows-per-page="10">
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

        <div class="row q-pa-md">
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
import { useQuasar } from 'quasar';
import TitleCustom from 'src/components/TitleCustom.vue';
import useNotify from 'src/composables/UseNotify';
import { AprendizService } from 'src/services/AprendizService';
import { VbMappService } from 'src/services/VbMappService';
import { computed, onMounted, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { avaliacaoColumns, avaliacaoRows, avaliacaoPortageColumns, avaliacaoPortageRows, avaliacaoAbllsRows, avaliacaoAbllsColumns } from './table';
import { PortageService } from 'src/services/PortageService';

const aprendizService = new AprendizService();

const $q = useQuasar();

const { error } = useNotify();

const router = useRouter()

const columnsVbMapp = ref<any[]>(avaliacaoColumns);

const rowsVbMapp = ref<any[]>(avaliacaoRows);

const niveisSelcionados = ref([]);

const columnsPortage = ref<any[]>(avaliacaoPortageColumns);

const rowsPortage = ref<any[]>(avaliacaoPortageRows);

const idadeSelcionados = ref([]);

const columnsAblls = ref<any[]>(avaliacaoAbllsColumns);

const rowsAblls = ref<any[]>(avaliacaoAbllsRows);

const form = ref({
    uuid: '',
    aprendiz_uuid_fk: '',
    nome_aprendiz: '',
    protocolo: '',
    aprendiz: '',
    objetivo_documento: '',
    niveis_coleta: '',
    idades_coleta: ''
});

const aprendizes = ref<any[]>([]);

const protocolos = ref([
    { label: 'VB-MAPP', value: '1' },
    { label: 'PORTAGE', value: '2' },
    { label: 'ABLLS-R', value: '3' },
    //{ label: 'SOCIALLY SAVVY', value: '4' }
]);

const isVbmapp = computed(() => form.value.protocolo.label === 'VB-MAPP');

const isPortage = computed(() => form.value.protocolo.label === 'PORTAGE');

const isAblls = computed(() => form.value.protocolo.label === 'ABLLS-R');

const isAvancarDisabled = computed(() => (form.value.aprendiz == '' || form.value.protocolo == '') || (!(niveisSelcionados.value.length > 0 || idadeSelcionados.value.length > 0)));

const vbMappService = new VbMappService();

const portageService = new PortageService();

async function avancar() {

    if (isVbmapp.value)
        criarAvaliacaoVbMapp();
    else if (isPortage.value)
        criarAvaliacaoPortage();
    else
        throw new Error('Nenhum protocolo selecionado.')
}

async function criarAvaliacaoVbMapp() {
    const avaliacoes = niveisSelcionados.value.map(i => i.id);

    form.value.aprendiz_uuid_fk = form.value.aprendiz.value;
    form.value.niveis_coleta = avaliacoes.toString();
    form.value.protocolo = form.value.protocolo.label;

    const object = toRaw(form.value);

    try {
        $q.loading.show();
        const { data, status } = await vbMappService.postAvaliacao(object);

        if (data != null && status == 200) {
            const uuid = form.value.aprendiz_uuid_fk;
            router.push({ name: 'avaliacoes-coleta/vbmapp', params: { aprendizUuid: uuid, tipoAvaliacao: 'milestones', vbmappUuid: data } });
        } else {
            error('erro ao criar avaliação.')
        }

    } catch (e) {
        throw e;
    } finally {
        $q.loading.hide();
    }
}

async function criarAvaliacaoPortage() {
    const avaliacoes = idadeSelcionados.value.map(i => i.id);

    form.value.aprendiz_uuid_fk = form.value.aprendiz.value;
    form.value.idades_coleta = avaliacoes.toString();
    form.value.protocolo = form.value.protocolo.label;

    const object = toRaw(form.value);

    console.log(object);

    try {
        $q.loading.show();
        const { data, status } = await portageService.postAvaliacao(object);

        if (data != null && status == 200) {
            const uuid = form.value.aprendiz_uuid_fk;
            router.push({ name: 'avaliacoes-coleta/portage', params: { aprendizUuid: uuid, portageId: data } });
        } else {
            error('erro ao criar avaliação.')
        }

    } catch (e) {
        throw e;
    } finally {
        $q.loading.hide();
    }

}

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

onMounted(() => {
    carregarSelectAprendizes();
});

</script>