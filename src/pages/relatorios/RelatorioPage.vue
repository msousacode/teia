<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal-7">Gerar Relatório</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    :rules="[(val) => (val && val.length > 0) || 'Aprendiz é obrigatório']" />

            </q-form>
        </div>
        <div class="row justify-center">
            <q-btn @click="submit" label="Salvar" color="primary" class="col-md-7 col-xs-12 col-sm-12" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { db } from 'src/db'

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

function submit() { }

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