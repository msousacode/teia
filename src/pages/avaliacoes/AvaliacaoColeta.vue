<template>
    <q-page padding>
        <q-tabs v-model="tab1" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="1" label="Nível 1" v-if="showAba('1')" @click="getTitulosAvaliacoes(1, '1')" />
            <q-tab name="2" label="Nível 2" v-if="showAba('2')" @click="getTitulosAvaliacoes(1, '2')" />
            <q-tab name="3" label="Nível 3" v-if="showAba('3')" @click="getTitulosAvaliacoes(1, '3')" />
        </q-tabs>
        <div class="q-mt-sm"></div>
        <q-tabs v-model="tab2" class="text-teal" name="avaliacoes">
            <div v-for="(item, index) in titulosNivelUm" :key="index">
                <q-tab :name=item.tipo :label=item.titulo @click="getTitulosAvaliacoes(item.tipo)" />
            </div>
        </q-tabs>
        <q-tab-panels v-model="tab3">
            <q-tab-panel name="objetivos">
                <div v-for="(item, index) in cards" :key="index">
                    <q-card flat bordered class="my-card"
                        :class="nivelSelecionado == '1' ? 'bg-orange-1' : 'bg-green-1'">
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
import { avaliacaoNivelUm } from './data/vbmappNivelUm';
import { avaliacaoNivelDois } from './data/vbmappNivelDois';
import { AvaliacaoVbmappColetas, db } from 'src/db';
import { useRoute } from 'vue-router';
import { v4 as uuid } from 'uuid';
import { toRaw } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { nextTick } from 'vue';

const { success, error } = useNotify();

const routeLocation = useRoute();

const uuidAprendiz = routeLocation.params.aprendizUuid;

const uuidVbmapp = ref();

const showNiveis = ref<string[]>([])

const tab1 = ref('1');

const tab2 = ref(1);

const tab3 = ref('objetivos');

const titulosNivelUm = ref<any[]>([]);

const cards = ref<any[]>([]);

const cardsColetaAtual = ref();

const coletados = ref<any[]>([]);

const nivelSelecionado = ref();

const showAba = (aba: string) => {
    return showNiveis.value.includes(aba)
};

async function getTitulosAvaliacoes(tipo: number, aba?: string) {

    nivelSelecionado.value = aba ?? nivelSelecionado.value;

    if (Array.isArray(avaliacaoNivelUm.avaliacoes)) {
        let objetivos;

        if (nivelSelecionado.value == '1') {
            objetivos = avaliacaoNivelUm.avaliacoes
                .filter(i => i.tipo == tipo)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        } else if (nivelSelecionado.value == '2') {
            objetivos = avaliacaoNivelDois.avaliacoes
                .filter(i => i.tipo == tipo)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        } else {
            objetivos = avaliacaoNivelDois.avaliacoes
                .filter(i => i.tipo == tipo)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        }

        // Mapeia os objetivos para adicionar a propriedade 'selected'  
        cards.value = objetivos.map(objetivo => ({
            ...objetivo,  // Mantém as propriedades existentes  
            selected: null // Adiciona a propriedade selected inicializada como null  
        }));
    }
    cardsColetaAtual.value = tipo;
    await nextTick();
}

function selectOption(item: any, value: any) {
    item.selected = value; // Atualiza a seleção do cartão  
    coletar(item, value); // Chama a função coletar com o valor  
}

function salvar() {

    let data: AvaliacaoVbmappColetas = {
        uuid: uuid(),
        nivel_coleta: 1,
        tipo: 1,
        coletas: toRaw(coletados.value),
        aprendiz_uuid_fk: uuidAprendiz.toString(),
        vbmapp_uuid_fk: uuidVbmapp.value,
        sync: false,
        ativo: true,
    };

    db.vbmappColetas.add(data).then(() => {
        success('Coletas salvas com sucesso!')
    }).catch(() => {
        error('Ocorreu um erro ao salvar as coletas.')
    });
}

async function configTela() {
    db.vbmapp
        .get({ aprendiz_uuid_fk: uuidAprendiz })
        .then((res) => {
            showNiveis.value = res?.niveis_coleta.split(',') || [];
            uuidVbmapp.value = res?.uuid;
        })
        .catch((_error) => {
            console.error('Erro ao tentar consultar os treinamentos', _error);
        });
}

function coletar(item: any, pontuacao: number) {
    const data = { id: item.id, pontuacao: pontuacao, data_coleta: Date.now() }
    coletados.value.push(data)
}

onMounted(async () => {
    await configTela();
    titulosNivelUm.value = avaliacaoNivelUm.avaliacoes;
    getTitulosAvaliacoes(tab2.value, '1');
});

</script>