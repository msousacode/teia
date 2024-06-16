<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal-7">Gerar Relatório</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @input="pesquisar" />
            </q-form>
        </div>

        <div class="q-mt-sm row items-start q-gutter-md justify-center">
            <q-card class="my-card bg-green text-white" style="width: 45%;">
                <q-card-section>
                    <div class="text-subtitle1">FEZ SEM AJUDA
                        <br /> INDEPENDÊNCIA
                    </div>
                    <div class="text-h6">70%</div>
                </q-card-section>
            </q-card>
            <q-card class="my-card bg-red-5 text-white" style="width: 45%;">
                <q-card-section>
                    <div class=" text-subtitle1">FEZ COM AJUDA <br /> OU NÃO FEZ
                    </div>
                    <div class="text-h6">30%</div>
                </q-card-section>
            </q-card>
        </div>

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase">Treinamentos em andamento:</div>
        <q-list bordered separator v-for="(
              item, index
            ) in treinamentos" :key="index">
            <q-item clickable v-ripple>
                <q-item-section>
                    <q-item-label class="text-subtitle1 q-mb-sm">{{ item.treinamento }}</q-item-label>
                    <q-item-label class="text-subtitle1 q-mb-sm" caption>Início: 15/06/2024</q-item-label>
                    <q-item-label class="text-subtitle1 q-mb-sm" caption>Final: 15/06/2024</q-item-label>
                    <q-item-label>
                        Progresso:
                    </q-item-label>
                    <q-linear-progress size="25px" :value="progress1" color="green-5">
                        <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="accent" :label="progressLabel1" />
                        </div>
                    </q-linear-progress>
                </q-item-section>
            </q-item>
        </q-list>

        <div class="row justify-center">
            <q-btn label="Gerar Relatório" color="info" class="col-md-7 col-xs-12 col-sm-12 q-mt-xl"
                @click="generatePdf" />
        </div>

    </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import { jsPDF } from 'jspdf';

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

const progress1 = ref(0.3)

let progressLabel1 = computed(() => (progress1.value * 100).toFixed(2) + '%');

function pesquisar() {
    const raw = toRaw(form.value);

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {
            treinamentos.value = toRaw(item.treinamentos)
        });
    })
}

function generatePdf() {
    const data = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 40, city: 'Chicago' },
    ]; // substitua isso pelos seus dados JSON

    const doc = new jsPDF();

    let yPos = 10; // inicializa a posição y

    data.forEach((item) => {
        let text = `Name: ${item.name}, Age: ${item.age}, City: ${item.city}`;
        doc.text(text, 10, yPos);
        yPos += 10; // move a posição y para baixo para a próxima linha
    });

    doc.save('test.pdf');
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