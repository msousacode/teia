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
                <div v-for="(item, index) in alvosPendentes" :key="index" class="q-mb-sm">
                    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <span class="text-subtitle2 text-teal">Descrição do Alvo: </span>
                                    <div class="text-subtitle1">{{ item.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal">Pergunta: </span>
                                    <div class="text-subtitle1">{{ item.pergunta }}</div>

                                </div>
                            </div>
                        </q-card-section>

                        <q-radio v-model="respostas[item.identificador]" val="nao-fez" label="NÃO FEZ" keep-color
                            color="red" size="lg" @click="handleResposta(item.identicador)" />
                        <q-radio v-model="respostas[item.identificador]" val="com-ajuda" label="COM AJUDA" keep-color
                            color="orange" size="lg" @click="handleResposta(item.identicador)" />
                        <q-radio v-model="respostas[item.identificador]" val="sem-ajuda" label="SEM AJUDA" keep-color
                            color="green" size="lg" @click="handleResposta(item.identicador)" />

                    </q-card>
                </div>
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

//const items = ref<any[]>([]); // seus itens
const respostas = ref<any>({}); // um objeto para armazenar as respostas

interface Alvo {
    descricao_alvo: string;
    nome_alvo: string;
    pergunta: string;
    tipo_aprendizado: string;
    treinamento_uuid_fk: string;
    uuid: string;
    identificador: string;
}

const alvosPendentes = ref<Alvo[]>([]);

function handleResposta(uuid: string) {
    console.log(uuid)
    console.log(toRaw(respostas.value))
}

onMounted(() => {

    const _uuidTreinamento = routeLocation.params.uuidTreinamento;
    const _uuidAprendiz = routeLocation.params.uuidAprendiz;

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined) {
        throw new Error('uuidTreinamento ou uuidAprendiz não informado');
    }

    liveQuery(() => db.coletas.where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento }).toArray()).subscribe((data) => {
        const raw = toRaw(data)
        raw.map(i => {
            alvosPendentes.value.push(i.alvo)
        })
    })
});
</script>
