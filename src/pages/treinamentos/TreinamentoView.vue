<template>
    <div v-for="(item, index) in list" :key="index" class="q-pa-sm">

        <q-card>
            <q-card-section :class="'bg-grey-2'">

                <div class="col">
                    <div class="text-subtitle2 text-teal">Título do objetivo:</div>
                    <div class="text-subtitle1">{{ item.nomeAlvo }}</div>

                    <div class="text-subtitle2 text-teal">Descrição do Alvo:
                    </div>
                    <div class="text-body2 q-mt-sm" style="white-space: pre-line;">{{ item.descricao }}</div>

                </div>
            </q-card-section>

        </q-card>

    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn fab icon="mdi-arrow-left" color="primary" :to="{ name: 'treinamento-import' }" />
    </q-page-sticky>

</template>
<script setup lang="ts">
import { TreinamentoService } from 'src/services/TreinamentoService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const routeLocation = useRoute();

const id: any = routeLocation.params.id;

const treinamento = new TreinamentoService();

const list = ref();

onMounted(() => {
    treinamento.getTreinamentoBaseById(id).then((data) => {
        list.value = data.data;
    });
});

</script>