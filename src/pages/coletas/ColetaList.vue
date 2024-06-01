<template>
    <q-page padding>
        <div class="q-gutter-sm q-pa-md">
            <q-checkbox dense v-model="formTreinamento.seg" label="SEG" color="teal" />
            <q-checkbox dense v-model="formTreinamento.ter" label="TER" color="teal" />
            <q-checkbox dense v-model="formTreinamento.qua" label="QUA" color="teal" />
            <q-checkbox dense v-model="formTreinamento.qui" label="QUI" color="teal" />
            <q-checkbox dense v-model="formTreinamento.sex" label="SEX" color="teal" />
            <q-checkbox dense v-model="formTreinamento.sab" label="SAB" color="teal" />
        </div>

        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="pendentes" label="Pendentes" />
            <q-tab name="coletados" label="Coletados" />
            <q-tab name="anotacoes" label="Anotações" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="pendentes">
                Treinamento
            </q-tab-panel>

            <q-tab-panel name="coletados">
                Coletados
            </q-tab-panel>

            <q-tab-panel name="anotacoes">
                Anotações
            </q-tab-panel>
        </q-tab-panels>
    </q-page>
</template>
<script setup lang="ts">
import { liveQuery } from 'dexie';
import { onMounted, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { db } from 'src/db';

const routeLocation = useRoute();

const tab = ref('pendentes');

const formTreinamento = ref({
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false,
});

onMounted(() => {

    const _uuidTreinamento = routeLocation.params.uuidTreinamento;
    const _uuidAprendiz = routeLocation.params.uuidAprendiz;

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined) {
        throw new Error('uuidTreinamento ou uuidAprendiz não informado');
    }

    liveQuery(() => db.coletas.where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento }).toArray()).subscribe((data) => {
        const raw = toRaw(data)
        console.log(raw)
    })
});
</script>
