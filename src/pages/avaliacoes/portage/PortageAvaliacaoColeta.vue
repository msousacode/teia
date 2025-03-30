<template>
    <q-page padding>
        <div class="row justify-center">
            <q-card class="col-md-7 col-xs-12 col-sm-12 q-mt-md q-pa-md q-mb-md">
                <div class="text-uppercase text-body2">{{ descritivoTitulo
                    }} -
                    <b>Aprendiz:</b> {{ aprendizStore.nome_aprendiz }}
                    <div class="text-uppercase">
                        <q-toggle :false-value="true" :label="`Exibir não respondidas`" :true-value="false" color="red"
                            v-model="showRespondidas" />
                    </div>
                </div>
            </q-card>
        </div>

        <q-tabs v-model="tab1" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
            <q-tab name="1" label="0 a 1 ano" v-if="showAba('1')" @click="getTitulosAvaliacoes(1, '1')" />
            <q-tab name="2" label="1 a 2 anos" v-if="showAba('2')" @click="getTitulosAvaliacoes(1, '2')" />
            <q-tab name="3" label="2 a 3 anos" v-if="showAba('3')" @click="getTitulosAvaliacoes(1, '3')" />
            <q-tab name="4" label="3 a 4 anos" v-if="showAba('4')" @click="getTitulosAvaliacoes(1, '4')" />
            <q-tab name="5" label="4 a 5 anos" v-if="showAba('5')" @click="getTitulosAvaliacoes(1, '5')" />
            <q-tab name="6" label="5 a 6 anos" v-if="showAba('6')" @click="getTitulosAvaliacoes(1, '6')" />
        </q-tabs>
        <div class="q-mt-sm"></div>
        <q-tabs v-model="tab2" class="text-teal" name="avaliacoes">
            <div v-for="(item, index) in titulosNivelUm" :key="index">
                <q-tab :name=item.tipo :label=item.titulo @click="getTitulosAvaliacoes(item.tipo)" />
            </div>
        </q-tabs>
        <q-tab-panels v-model="tab3" style="background-color: #f8f5f2;">
            <q-tab-panel name="objetivos">
                <div class="row justify-center">
                    <div v-for="(item, index) in cards" :key="index" class="col-md-7 col-xs-12 col-sm-12">
                        <q-card flat bordered class="my-card" :class="'bg-teal-1'">
                            <div class="flex justify-end">
                                <div class="q-mr-md q-mt-md text-body2" v-if="item.criadoNome != ''">respondido por: {{
                                    item.criadoNome }}</div>
                            </div>
                            <q-card-section>
                                <div class="row items-center no-wrap">
                                    <div class="col">
                                        <div class="text-subtitle1"><b>({{ item.cod }})&nbsp;&nbsp;</b>{{ item.descricao
                                        }}
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>

                            <div class="q-pa-md q-gutter-y-md flex justify-center">
                                <q-btn-group style="border: 1px solid;" v-show="item.cod != '0'">
                                    <q-btn label="Sim"
                                        :class="item.selected == 1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                        @click="coletar(item, 1)" />
                                    <q-btn label="As vezes"
                                        :class="item.selected == 0.5 ? 'bg-teal text-white' : 'bg-white text-black'"
                                        @click="coletar(item, 0.5)" />
                                    <q-btn label="Não"
                                        :class="item.selected == 0 ? 'bg-teal text-white' : 'bg-white text-black'"
                                        @click="coletar(item, 0)" />
                                    <q-btn label="NA"
                                        :class="item.selected == -1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                        @click="coletar(item, -1)" />
                                </q-btn-group>
                            </div>
                        </q-card>

                        <div class="q-mt-sm"></div>
                    </div>
                </div>
            </q-tab-panel>

        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="save" color="positive" @click="salvar" />
        </q-page-sticky>

        <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn fab icon="mdi-arrow-left" color="info"
                :to="{ name: 'avaliacoes', params: { label: aprendizStore.nome_aprendiz, value: aprendizStore.uuid } }" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { portageZeroHaUmAno } from '../data/portage/portageZeroHaUmAno';
import { portageUmHaDoisAno } from '../data/portage/portageUmHaDoisAno';
import { portageDoisHaTresAno } from '../data/portage/portageDoisHaTresAno';
import { portageTresHaQuatroAno } from '../data/portage/portageTresHaQuatro';
import { portageQuatroHaCincoAno } from '../data/portage/portageQuatroHaCinco';
import { portageCincoHaSeis } from '../data/portage/portageCincoHaSeis';
import { onMounted, watch } from 'vue';
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { toRaw } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { PortageService } from 'src/services/PortageService';

const { success, error } = useNotify();

const routeLocation = useRoute();

const uuidAprendiz = ref();

const portageIdParam = ref(routeLocation.params.portageId);

const portageId = ref();

const idades = ref<string[]>([])

const tab1 = ref('1');

const tab2 = ref(1);

const tab3 = ref('objetivos');

const titulosNivelUm = ref<any[]>([]);

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

const portageService = new PortageService();

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

    if (idadeSelecionada.value == '1') {
        objetivos = portageZeroHaUmAno.avaliacoes
            .filter(i => i.tipo == tipoColeta)
            .find(i => i)?.objetivos || [];
    } else if (idadeSelecionada.value == '2') {
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
    }

    const newObjetivos = objetivos.map(obj => ({
        ...obj, // Mantém as outras propriedades  
        selected: null, // Altera a propriedade 'selected' para null 
        criadoNome: '', // Adiciona a propriedade 'criadoNome'
    }));


    return newObjetivos;
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
        const { data } = await portageService.postColetaAvaliacao(itens, usuarioId);

        if (data) {
            success('Coletas salvas com sucesso!');
        } else {
            error('Ocorreu um erro ao salvar as coletasx');
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

    const { data } = await portageService.getColetasRespondidas(portageIdParam.value);

    if (data) {
        data.forEach(row => {
            // Filtrar os cards que têm o mesmo id que o coleta_id da linha do banco  
            const card = cardsTela.find(card => card.id === row.coleta_id);

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

async function configTela() {

    try {
        $q.loading.show();
        const { uuid, idades_coleta } = await portageService.getPortageAvaliacaoConfigTelaById(portageIdParam.value);

        if (uuid != null && idades_coleta != null) {
            portageId.value = uuid;
            idades.value = idades_coleta.split(',') || [];

            idadeSelecionada.value = idades.value[0];

        } else {
            error('Erro ao tentar consultar o VBMAPP');
        }
    } catch (e) {
        error('Erro ao tentar consultar o VBMAPP');
        throw e;
    } finally {
        $q.loading.hide();
    }
}

function coletar(item: any, pontuacao: number) {
    item.selected = pontuacao; // Atualiza a seleção do cartão

    const novaColeta = {
        portage_uuid_fk: portageId.value,
        aprendiz_uuid_fk: uuidAprendiz.value.toString(),
        coleta_id: item.id,
        descricao: item.descricao,
        codigo: Number.parseInt(item.cod),
        idade_coleta: idadeSelecionada.value,
        tipo: tituloSelecionado.value,
        resposta: pontuacao,
    };

    // Usar toRaw para obter a versão reativa normal do estado  
    const stateCache = toRaw(state.cache);

    // Verifica se já existe a lista de coletas realizadas no cache  
    if (!stateCache.has("coletasRealizadas")) {
        stateCache.set("coletasRealizadas", []); // Inicializa a lista se ainda não existir  
    }

    // Obtendo a lista de coletas realizadas  
    const coletasRealizadas = stateCache.get("coletasRealizadas");

    // Verifica se a nova coleta já existe no cache  
    const coletaExistente = coletasRealizadas.find(cache => cache.coleta_id === novaColeta.coleta_id);


    if (coletaExistente) {
        // Se a coleta já existe, atualiza a pontuação  
        coletaExistente.pontuacao = novaColeta.resposta; // Atualizando pontuação  
        coletaExistente.selected = novaColeta.resposta; // Verificando se deseja atualizar o selected  
    } else {
        // Se a coleta não existe, adiciona a nova coleta  
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
    await configTela();
    titulosNivelUm.value = portageZeroHaUmAno.avaliacoes;//esse aqui fica porque é padrão não apagar.    
    getTitulosAvaliacoes(1, idadeSelecionada.value);
    getData('coletasRealizadas');
});

</script>