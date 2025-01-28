<template>
    <q-page padding>

        <div class="q-ml-md text-teal">{{ descritivoTitulo }} - Aprendiz: {{ aprendizStore.nome_aprendiz }}</div>

        <div class="text-teal">
            <q-toggle :false-value="true" :label="`Exibir não respondidas`" :true-value="false" color="red"
                v-model="showRespondidas" />
        </div>

        <q-tabs v-model="tab1" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="1" label="0 a 1 ano" v-if="showAba('1')" @click="getTitulosAvaliacoes(1, '1')" />
        </q-tabs>

        <div class="q-mt-sm"></div>

        <q-tabs v-model="tab2" class="text-teal" name="avaliacoes">
            <q-tab :name=titulo :label=titulo />
        </q-tabs>

        <q-tab-panels v-model="objetivosTab">
            <q-tab-panel name="objetivos">
                <div v-for="(item, index) in cards" :key="index">
                    <q-card flat bordered class="my-card" :class="'bg-teal-1'">
                        <div class="flex justify-end">
                            <div class="q-mr-md q-mt-md text-body2" v-if="item.criadoNome != ''">respondido por: {{
                                item.criadoNome }}</div>
                        </div>
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="text-subtitle1"><b>({{ item.cod }})&nbsp;&nbsp;</b>{{ item.descricao }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div class="q-pa-md q-gutter-y-md flex justify-center">
                            <q-btn-group style="border: 1px solid;" v-show="item.cod != '0'">
                                <q-btn label="0"
                                    :class="item.selected == 0 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 0)" />
                                <q-btn label="1"
                                    :class="item.selected == 1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 1)" />
                                <q-btn label="2"
                                    :class="item.selected == 2 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 2)" />
                                <q-btn label="3"
                                    :class="item.selected == 3 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 3)" />
                                <q-btn label="4"
                                    :class="item.selected == 4 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 4)" />
                                <q-btn label="NA"
                                    :class="item.selected == -1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, -1)" />
                            </q-btn-group>
                        </div>
                    </q-card>

                    <div class="q-mt-sm"></div>
                </div>
            </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="save" color="green" @click="salvar" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { toRaw } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { coperacaoEficaciaReforcador } from './data/cooperacaoEficaciaReforcador';
import { AbllsService } from 'src/services/AbllsService';
import { desempenhoVisual } from './data/desempenhoVisual';
import { linguagemReceptiva } from './data/linguagemReceptiva';
import { imitacaoMotora } from './data/imitacaoMotora';

const { success, error } = useNotify();

const routeLocation = useRoute();

const uuidAprendiz = ref();

const abllsId = ref(routeLocation.params.abllsId);

const habilidade = ref(routeLocation.params.habilidade);

const idades = ref<string[]>([])

const tab1 = ref('1');

const tab2 = ref(1);

const objetivosTab = ref('objetivos');

const titulo = ref<string>('');

const cards = ref<any[]>([]);

const cardsColetaAtual = ref();

const idadeSelecionada = ref();

const descritivoTitulo = 'Portage';

const showAba = (aba: string) => {
    return idades.value.includes(aba)
};

const tituloSelecionado = ref()

const state = reactive({
    cache: new Map()
});

const abllsService = new AbllsService();

const $q = useQuasar();

const aprendizStore = reactive(JSON.parse(localStorage.getItem('aprendizInfo')));

const showRespondidas = ref(true);

const clonedCards = ref<any[]>([]);

async function getTitulosAvaliacoes(tipoColeta: number, abaSelecionada: string) {

    if (abaSelecionada)
        tab2.value = 1

    idadeSelecionada.value = abaSelecionada ?? idadeSelecionada.value;

    tituloSelecionado.value = toRaw(tipoColeta);

    cards.value = carregarAvaliacao();

    refresh();
}

function carregarAvaliacao() {

    const tipoColeta = tituloSelecionado.value;

    cardsColetaAtual.value = tipoColeta;

    let objetivos;

    //if (idadeSelecionada.value == '1') {
    objetivos = getObjetivos(habilidade.value);
    //  .find(i => i)?.descricao || [];
    /* else if (idadeSelecionada.value == '2') {
        objetivos = portageUmHaDoisAno.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];
    } else if (idadeSelecionada.value == '3') {
        objetivos = portageDoisHaTresAno.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];

    } else if (idadeSelecionada.value == '4') {
        objetivos = portageTresHaQuatroAno.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];

    } else if (idadeSelecionada.value == '5') {
        objetivos = portageQuatroHaCincoAno.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];
    } else if (idadeSelecionada.value == '6') {
        objetivos = portageCincoHaSeis.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];
    } */

    const newObjetivos = objetivos.map(obj => ({
        ...obj, // Mantém as outras propriedades  
        selected: null, // Altera a propriedade 'selected' para null 
        criadoNome: '', // Adiciona a propriedade 'criadoNome'
    }));


    return newObjetivos;
}

function getObjetivos(habilidade: string | string[]) {

    switch (habilidade) {
        case '1':
            titulo.value = 'Cooperação e Eficácia do Reforçador';
            return coperacaoEficaciaReforcador;
        case '2':
            titulo.value = 'Desempenho Visual';
            return desempenhoVisual;
        case '3':
            titulo.value = 'Linguagem Receptiva';
            return linguagemReceptiva;
        case '4':
            titulo.value = 'Imitação Motora';
            return imitacaoMotora;
        case '5':
            titulo.value = 'Imitação Motora';
            return imitacaoMotora;
    }
}

async function salvar() {

    const coletas = toRaw(state.cache);

    const itens = coletas.get("coletasRealizadas");

    try {
        const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

        if (!usuarioId) {
            error('Não foi possível salvar coletas sem um usuário logado');
            return;
        }

        if (itens == undefined) {
            $q.notify({
                message: 'Você tentou salvar sem alterar nenhuma coleta',
                textColor: 'black',
                color: 'yellow-7',
                position: 'center',
            });
            return;
        }

        if (itens.length == 0) {
            $q.notify({
                message: 'Você tentou salvar sem alterar nenhuma coleta',
                textColor: 'black',
                color: 'yellow-7',
                position: 'center',
            });
            return;
        }

        $q.loading.show();
        const { status } = await abllsService.postColetas(itens, uuidAprendiz.value, abllsId.value, 1);

        if (status == 200) {
            success('Coletas salvas com sucesso!');
        } else {
            error('Ocorreu um erro ao salvar as coletas');
        }
    } catch (e) {
        error('Ocorreu um erro ao salvar as coletasy' + e);
        throw e;
    } finally {
        showRespondidas.value = true;
        state.cache.clear();
        await refresh();
        $q.loading.hide();
    }

}

async function refresh() {

    cards.value = carregarAvaliacao();

    let cardsTela = toRaw(cards.value);

    const { data } = await abllsService.getColetasRespondidas(abllsId.value);

    if (data) {
        data.forEach(row => {
            // Filtrar os cards que têm o mesmo id que o coleta_id da linha do banco  
            const card = cardsTela.find(card => card.id === row.id);

            // Verificar se o card foi encontrado  
            if (card) {
                // Atualizar a propriedade selected do card  
                card.selected = row.resposta;
                card.criadoNome = row.criado_por_nome;
                // Adicionar o card ao array cardsRespondidos  

                // Usando map para substituir o objeto com o id específico  
                const cardsAtualizados = cardsTela.map(item =>
                    item.id === card.id ? card : item
                );

                //cards atualizados para exibir na tela.
                cards.value = cardsAtualizados;
            }
        });
    }
}

function coletar(item: any, pontuacao: number) {

    item.selected = pontuacao; // Atualiza a seleção do cartão

    const novaColeta = {
        aprendiz_uuid_fk: uuidAprendiz.value.toString(),
        codigo: item.cod,
        descricao: item.descricao,
        id: item.id,
        habilidade_coleta: idadeSelecionada.value,
        resposta: pontuacao,
    };

    const stateCache = toRaw(state.cache);

    // Verifica se já existe a lista de coletas realizadas no cache  
    if (!stateCache.has("coletasRealizadas")) {
        stateCache.set("coletasRealizadas", []); // Inicializa a lista se ainda não existir  
    }

    // Obtendo a lista de coletas realizadas  
    const coletasRealizadas = stateCache.get("coletasRealizadas");

    // Verifica se a nova coleta já existe no cache  
    const existeColeta = coletasRealizadas.find(cache => cache.id === novaColeta.id);

    if (!existeColeta) {
        coletasRealizadas.push(novaColeta);
    }

    // Opcional: atualizar o cache após as modificações  
    stateCache.set("coletasRealizadas", coletasRealizadas);
}

function getData(key: string) {
    if (state.cache.has(key)) {
        return state.cache.get(key);
    }
    state.cache.set(key, []);
}

watch(showRespondidas, async () => {
    clonedCards.value = cards.value.map(card => Object.assign({}, card));

    if (!showRespondidas.value)
        cards.value = cards.value.filter(i => i.selected == null);
    else {
        await refresh();
    }
})

watch([idadeSelecionada, tituloSelecionado], () => {
    showRespondidas.value = true;
})

onMounted(async () => {
    uuidAprendiz.value = routeLocation.params.aprendizUuid
    getTitulosAvaliacoes(1, idadeSelecionada.value);
    getData('coletasRealizadas');
});

</script>