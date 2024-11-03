<template>
    <q-page padding>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="1" label="Nível 1" v-if="showAba('1')" />
            <q-tab name="2" label="Nível 2" v-if="showAba('2')" />
            <q-tab name="3" label="Nível 3" v-if="showAba('3')" />
        </q-tabs>
        <div class="q-mt-sm"></div>
        <q-tabs v-model="tab2" class="text-teal" name="avaliacoes">
            <div v-for="(item, index) in titulosNivelUm" :key="index">
                <q-tab :name=item.tipo :label=item.titulo @click="getAvaliacoes(item.tipo)" />
            </div>
        </q-tabs>

        <q-tab-panels v-model="tab">
            <q-tab-panel name="objetivos">
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
                            <q-btn-group style="border: 1px solid;">
                                <q-btn label="Sim"
                                    :class="item.selected === 1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="selectOption(item, 1)" />
                                <q-btn label="Às vezes"
                                    :class="item.selected === 0.5 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="selectOption(item, 0.5)" />
                                <q-btn label="Não"
                                    :class="item.selected === 0 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="selectOption(item, 0)" />
                                <q-btn label="NA"
                                    :class="item.selected === -1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="selectOption(item, -1)" />
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
import { db } from 'src/db';
import { useRoute } from 'vue-router';

const routeLocation = useRoute();

const showNiveis = ref<string[]>([])

const tab = ref('objetivos');

const tab2 = ref(1);

const titulosNivelUm = ref<any[]>([]);

const cardsNivelUm = ref();

const cardsColetaAtual = ref();

const coletados = ref<any[]>([]);

//const titulosNivelDois = ref<any[]>([]);

//const cardsNivelDois = ref();

const showAba = (aba: string) => {
    return showNiveis.value.includes(aba)
};

function getAvaliacoes(tipo: number) {

    if (Array.isArray(avaliacaoNivelUm.avaliacoes)) {
        const objetivos = avaliacaoNivelUm.avaliacoes
            .filter(i => i.tipo == tipo)
            .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  

        // Mapeia os objetivos para adicionar a propriedade 'selected'  
        cardsNivelUm.value = objetivos.map(objetivo => ({
            ...objetivo,  // Mantém as propriedades existentes  
            selected: null // Adiciona a propriedade selected inicializada como null  
        }));
    }
    cardsColetaAtual.value = tipo;
}

function selectOption(item: any, value: any) {
    item.selected = value; // Atualiza a seleção do cartão  
    coletar(item, value); // Chama a função coletar com o valor  
}

function salvar() {

}

async function configTela() {

    const uuidAprendiz = routeLocation.params.aprendizUuid;

    db.vbmapp
        .get({ aprendiz_uuid_fk: uuidAprendiz })
        .then((res) => {
            showNiveis.value = res?.niveis_coleta.split(',') || [];
        })
        .catch((_error) => {
            console.error('Erro ao tentar consultar os treinamentos', _error);
        });
}

function coletar(item: any, pontuacao: number) {
    //Qual o grupo que esta sendo coletado:
    const data = { id: item.id, pontuacao: pontuacao }
    console.log(data)

    coletados.value.push(data)
    console.log(coletados.value)


    /** Quando eu salvar vai montar esse json
     {
        "uuid": "aaaa",
        "cadrs_coleta_tipo": 1,
        "coletados": [
            {
                "id": 1,
                "pontuacao": 1
            },
            {
                "id": 2,
                "pontuacao": 0,5
            },
            {
                "id": 3,
                "pontuacao": 0
            },
        ],
        "aprendiz_uuid_fk": "asdf",
        "data_coleta": "",
     }
     */
}

onMounted(async () => {
    await configTela();
    titulosNivelUm.value = avaliacaoNivelUm.avaliacoes;
    getAvaliacoes(tab2.value);
});

</script>