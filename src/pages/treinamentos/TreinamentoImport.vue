<template>
    <q-page padding>
        <div class="q-my-sm justify-start">
            <q-select stack-label outlined v-model="selected" :options="habilidades" label="Tipo de Habilidade" />
        </div>

        <div class="q-my-sm flex justify-end">
            <q-btn label="Confirmar Importação" icon="upload" color="green" class="q-pa-sm" no-caps
                @click="importarTreinamentos" />
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card bg-grey-2 full-width" v-for="item in treinamentos" :key="item.treinamentoBaseId">
                <q-card-section>
                    <q-chip color="blue-9" class="text-white" dense>{{ item.habilidade }}</q-chip>
                    <q-chip color="orange-10" class="text-white" dense>Protocolo ABC</q-chip>
                    <div class="text-body1 q-mb-md q-mt-md"><b>{{ item.titulo }}</b></div>

                    <div class="text-body2 text-justify">{{ item.descricao }}</div>
                </q-card-section>

                <q-separator dark />

                <q-card-actions>
                    <q-checkbox v-model="item.importado" color="primary"
                        @click="handleSelectTreinamentos(item.treinamentoBaseId)" label="Selecionar para impotação" />
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>
<script setup lang="ts">

import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { TreinamentoService } from 'src/services/TreinamentoService';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { onMounted, ref, watch } from 'vue';

interface Treinamento {
    treinamentoBaseId: string;
    titulo: string;
    habilidade: string; //"Atenção" | "Imitação" | "Linguagem Receptiva" | "Linguagem Expressiva" | "Pré-acadêmicas" | "Memória" | "Coordenação" | "Raciocínio" | "Socialização" | "Autoajuda";
    descricao: string;
    procololo: string // "ABC" | "Ocorrência de Resposta",    
    isImportado: boolean;
}

const service = new TreinamentoService();

const treinamentos = ref<Treinamento[]>();

const $q = useQuasar();

const { success, error } = useNotify();

const treinamentosSelecionados = ref<string[]>([]);

const habilidades = ["ATENCAO", "IMITACAO", "LINGUAGEM_RECEPTIVA", "LINGUAGEM_EXPRESSIVA", "PRE_ACADEMICA", "MEMORIA", "COORDENACAO", "RACIOCINIO", "SOCIALIZACAO", "AUTOAJUDDA"];

const selected = ref<string>('');

const store = useTreinamentoStore();

function handleSelectTreinamentos(treinamentoBaseId: string) {

    const index = treinamentosSelecionados.value.indexOf(treinamentoBaseId);
    if (index > -1) {
        treinamentosSelecionados.value.splice(index, 1);
        return;
    }
    treinamentosSelecionados.value.push(treinamentoBaseId)
}

async function importarTreinamentos() {
    $q.loading.show();
    try {
        await service.importarTreinamentos(treinamentosSelecionados.value);
        success('Treinamentos importados com sucesso');
    } catch (e) {
        error('Erro ao importar treinamentos');
    } finally {
        $q.loading.hide();
    }
}

watch(selected, () => {
    filtrar();
});

function filtrar() {
    if (selected.value === '') {
        treinamentos.value = store.getTreinamentosBase;
        return;
    }
    treinamentos.value = store.getTreinamentosBase.filter((item) => item.habilidade === selected.value);
}

onMounted(async () => {

    $q.loading.show();
    try {
        await service.getTreinamentosBase().then((response) => {
            store.setTreinamentosBase(response.data);
            treinamentos.value = store.getTreinamentosBase;
        });
    } catch (error) {
        console.error(error);
    } finally {
        $q.loading.hide();
    }
});

</script>