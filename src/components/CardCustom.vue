<template>
    <q-card flat bordered class="my-card q-mb-sm" :class="'bg-grey-2'">
        <q-card-section>
            <div class="row items-center no-wrap">
                <div class="col">
                    <div class="text-body2"><span class="text-teal-7">{{ treinamento }}</span>
                        <span class="text-body2">{{ item?.nomeTreinamento }}</span>
                    </div>

                    <div class="text-body2 q-mt-sm"><span class="text-teal-7">{{ protocolo }}</span>
                        <span class="text-body2">{{ item?.nomeProtocolo }}</span>
                    </div>

                    <div class="text-body2 q-mt-sm"><span class="text-teal-7">{{ periodo }}</span>
                        <span class="text-body2">{{ item?.periodoTreinamento }}</span>
                    </div>

                    <div v-if="item?.progress !== undefined || item?.progress !== null" class="q-mt-sm">
                        <q-item-label>
                            Progresso:
                        </q-item-label>
                        <q-linear-progress size="20px" :value="item?.progresso" color="green-5">
                            <div class="absolute-full flex flex-center">
                                <q-badge color="white" text-color="accent" :label="progressLabel1(item?.progresso)" />
                            </div>
                        </q-linear-progress>
                    </div>

                    <div class="flex flex-center">
                        <q-btn class="q-mt-md" color="teal" size="10px" @click="enviaEmit(item?.id)">Visualizar
                            Gráfico</q-btn>
                    </div>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">

const treinamento = 'Treinamento: ';
const protocolo = 'Protocolo: ';
const periodo = 'Período: ';

const emit = defineEmits(["selecao"]);

defineProps({
    item: Object
})

function progressLabel1(progress: number) {
    return (progress * 100).toFixed(0) + '%';
}

const enviaEmit = (id: string) => {
    emit("selecao", id);
};
</script>
