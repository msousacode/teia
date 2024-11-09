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
                    <q-card flat bordered class="my-card" :class="nivelSelecionado == '1' ? 'bg-orange-1' : 'bg-green-1'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="text-subtitle1"><b>({{ item.cod }})&nbsp;&nbsp;</b>{{ item.descricao }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div class="q-pa-md q-gutter-y-md flex justify-center">
                            <q-btn-group style="border: 1px solid;">
                                <q-btn label="Sim"
                                    :class="item.selected === 1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 1)" />
                                <q-btn label="Às vezes"
                                    :class="item.selected === 0.5 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 0.5)" />
                                <q-btn label="Não"
                                    :class="item.selected === 0 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 0)" />
                                <q-btn label="NA"
                                    :class="item.selected === -1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, -1)" />
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
            <q-btn fab icon="save" color="green" @click="salvar" :disable="false" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { ref, reactive } from 'vue';
import { avaliacaoNivelUm } from './data/vbmappNivelUm';
import { avaliacaoNivelDois } from './data/vbmappNivelDois';
import { AvaliacaoVbmappColetas, db } from 'src/db';
import { useRoute } from 'vue-router';
import { v4 as uuid } from 'uuid';
import { toRaw } from 'vue';
import useNotify from 'src/composables/UseNotify';

const { success } = useNotify();

const routeLocation = useRoute();

const uuidAprendiz = routeLocation.params.aprendizUuid;

const vbmappUuidParam = routeLocation.params.vbmappUuid;

const uuidVbmapp = ref();

const showNiveis = ref<string[]>([])

const tab1 = ref('1');

const tab2 = ref(1);

const tab3 = ref('objetivos');

const titulosNivelUm = ref<any[]>([]);

const cards = ref<any[]>([]);

const cardsColetaAtual = ref();

const nivelSelecionado = ref();

const showAba = (aba: string) => {
    return showNiveis.value.includes(aba)
};

const tituloSelecionado = ref()

const state = reactive({
    cache: new Map()
});

async function getTitulosAvaliacoes(tipoColeta: number, abaSelecionada?: string) {

    tituloSelecionado.value = toRaw(tipoColeta);

    nivelSelecionado.value = abaSelecionada ?? nivelSelecionado.value;

    let objetivos;

    if (nivelSelecionado.value == '1') {
        objetivos = avaliacaoNivelUm.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
    } else if (nivelSelecionado.value == '2') {
        objetivos = avaliacaoNivelDois.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
    } else if (nivelSelecionado.value == '3') {
        objetivos = avaliacaoNivelDois.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
    } else {
        objetivos = [{}];
    }

    // Mapeia os objetivos para adicionar a propriedade 'selected'  
    cards.value = objetivos.map(objetivo => ({
        ...objetivo,  // Mantém as propriedades existentes              
    }));

    cardsColetaAtual.value = tipoColeta;
    refresh();
}

async function salvar() {

    const coletas = toRaw(state.cache);

    const itens = coletas.get("coletasRealizadas");

    await db.vbmappColetas.bulkAdd(itens).then(() => {
        success('Coletas salvas com sucesso!');
        refresh();
    });
}

function refresh() {
    //TODO adaptar para todos os níveis
    let objetivos = avaliacaoNivelUm.avaliacoes
        .filter(i => i.tipo === tituloSelecionado.value)
        .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio;

    cards.value = objetivos.map(objetivo => ({
        ...objetivo,  // Mantém as propriedades existentes  
        selected: null // Adiciona a propriedade selected inicializada como null  
    }));

    let cardsTela = toRaw(cards.value);

    db.vbmappColetas.where({ vbmapp_uuid_fk: vbmappUuidParam }).toArray((resultDB) => {

        resultDB.forEach(row => {
            // Filtrar os cards que têm o mesmo id que o coleta_id da linha do banco  
            const card = cardsTela.find(card => card.id === row.coleta_id);

            // Verificar se o card foi encontrado  
            if (card) {
                // Atualizar a propriedade selected do card  
                card.selected = row.pontuacao;
                // Adicionar o card ao array cardsRespondidos  

                // Usando map para substituir o objeto com o id específico  
                const cardsAtualizados = cardsTela.map(item =>
                    item.id === card.id ? card : item
                );

                //cards atualizados para exibir na tela.
                cards.value = cardsAtualizados;
            }
        });
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

    item.selected = pontuacao; // Atualiza a seleção do cartão  

    const novaColeta: AvaliacaoVbmappColetas = {
        uuid: uuid(),
        vbmapp_uuid_fk: uuidVbmapp.value,
        aprendiz_uuid_fk: uuidAprendiz.toString(),
        coleta_id: item.id,
        nivel_coleta: 1,
        tipo: tituloSelecionado.value,
        pontuacao: pontuacao,
        data_coleta: Date.now()
    };

    const stateCache = toRaw(state.cache);
    //adiciona a nova coleta no cache
    stateCache.get("coletasRealizadas").push(novaColeta);
}

async function getData(key: string) {
    if (state.cache.has(key)) {
        return state.cache.get(key);
    }


    state.cache.set(key, []);
}

onMounted(async () => {
    await configTela();
    titulosNivelUm.value = avaliacaoNivelUm.avaliacoes;
    getTitulosAvaliacoes(tab2.value, '1');
    getData('coletasRealizadas');
    refresh()
});

</script>