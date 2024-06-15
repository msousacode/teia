<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal-7">Gerar Relatório</p>
            </div>

            {{ form }}
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @input="pesquisar" />
            </q-form>
        </div>

        <div class="q-pa-md">
            <div class="text-body1 q-mb-sm">Selecione o dia para coleta:</div>
            <q-list bordered separator v-for="(
              item, index
            ) in treinamentos" :key="index">
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label class="text-subtitle1 q-mb-sm">{{ item.treinamento }}</q-item-label>
                        <q-item-label class="text-subtitle1 q-mt-sm">{{ item.protocolo }}</q-item-label>

                        <div v-if="item.configuracoes">
                            <q-item-label class="text-subtitle1 q-mt-sm">Repete: {{ item.configuracoes.repetir
                                }}</q-item-label>
                            <q-item-label>
                                <!-- <q-chip v-if="item.configuracoes.dias_semana" v-for="(
                                  dia, index
                                ) in item.configuracoes.dias_semana" :key="index" label="dia" /> -->
                            </q-item-label>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <div class="row justify-center">
            <q-btn label="Gerar Relatório" color="info" class="col-md-7 col-xs-12 col-sm-12" @click="pesquisar" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

function pesquisar() {
    const raw = toRaw(form.value);
    debugger

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {
            treinamentos.value = toRaw(item.treinamentos)
        });
    })
}

onMounted(() => {
    db.aprendizes.toArray().then((res) => {
        res.forEach((aprendiz) => {
            aprendizes.value.push({
                label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${aprendiz.nasc_aprendiz
                    }`,
                value: aprendiz.uuid,
            });
        });
    });
})
</script>