<template>
    <q-page padding>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="nivel1" label="Nível 1" />
            <q-tab name="nivel2" label="Nível 2" />
            <q-tab name="nivel3" label="Nível 3" />
        </q-tabs>
        <div class="q-mt-sm"></div>
        <q-tabs v-model="tab2" class="text-teal" name="avaliacoes">
            <div v-for="(item, index) in titulosNivelUm" :key="index">
                <q-tab :name=item.tipo :label=item.titulo @click="getAvaliacoes(item.tipo)" />
            </div>
        </q-tabs>

        <q-tab-panels v-model="tab">
            <q-tab-panel name="nivel1">
                <div v-for="(item, index) in cardsNivelUm" :key="index">
                    <q-card flat bordered class="my-card" :class="'bg-orange-1'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="text-subtitle1"><b>({{ item.id }})&nbsp;&nbsp;</b>{{ item.descricao }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div class="q-pa-md q-gutter-y-md flex justify-center">
                            <q-btn-group class="bg-white" style="border: 1px solid;">
                                <q-btn label="Sim" color="teal" />
                                <q-btn label="Às vezes" />
                                <q-btn label="Não" />
                                <q-btn label="NA" />
                            </q-btn-group>
                        </div>
                    </q-card>
                    <div class="q-mt-sm"></div>
                </div>
            </q-tab-panel>

            <q-tab-panel name="nivel2">
                Teste 2
            </q-tab-panel>

            <q-tab-panel name="nivel3">
                Test3
            </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="save" color="green" @click="salvar" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import { avaliacaoNivelUm } from './data/vbmappNivelUm'

const tab = ref('nivel1');

const tab2 = ref(1);

const titulosNivelUm = ref<any[]>([]);

const cardsNivelUm = ref();

function getAvaliacoes(tipo: number) {
    cardsNivelUm.value = avaliacaoNivelUm.avaliacoes.filter(i => i.tipo == tipo).find(i => i)?.objetivos;
}

function salvar() {

}

onMounted(() => {
    titulosNivelUm.value = avaliacaoNivelUm.avaliacoes;
    getAvaliacoes(tab2.value);
});

</script>