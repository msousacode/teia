<template>
    <q-page padding>
        <div class="text-teal">{{ descritivoTitulo }}</div>
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
                    <div>
                        <q-dialog persistent :key="index" v-model="visible[index]">
                            <q-card class="my-card q-px-md q-py-md" style="max-width: 90vw; width: auto;">
                                <q-card-section>
                                    <div class="text-h6">Objetivo</div>
                                    <div class="text-body1 text-justify q-mt-md q-mb-md">{{ item.observacoes.objetivo }}
                                    </div>

                                    <q-separator />

                                    <div class="text-h6">Materiais</div>
                                    <div class="text-body1 text-justify q-mt-md q-mb-md">{{ item.observacoes.materiais
                                        }}</div>

                                    <q-separator />

                                    <div class="text-h6">Exemplo</div>
                                    <div class="text-body1 text-justify q-mt-md q-mb-md">{{ item.observacoes.exemplo }}
                                    </div>

                                    <q-separator />

                                    <div class="text-h6">1 Ponto</div>
                                    <div class="text-body1 text-justify q-mt-md q-mb-md">{{
                                        item.observacoes.pontuacao.umPonto
                                    }}</div>

                                    <div class="text-h6">0,5 Ponto</div>

                                    <q-separator />
                                    <div class="text-body1 text-justify q-mt-md q-mb-md">{{
                                        item.observacoes.pontuacao.meioPonto
                                    }}
                                    </div>
                                </q-card-section>
                                <q-card-actions>
                                    <q-btn label="Fechar" color="primary" @click="fecharModalAjuda(index)" />
                                </q-card-actions>
                            </q-card>
                        </q-dialog>
                    </div>
                    <q-card flat bordered class="my-card" :class="nivelSelecionado === '1'
                        ? 'bg-orange-1'
                        : nivelSelecionado === '2'
                            ? 'bg-green-1'
                            : nivelSelecionado === '3'
                                ? 'bg-blue-1'
                                : ''">
                        <q-btn unelevated :icon="'help'" @click="abrirModalAjuda(index)" />
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="text-subtitle1"><b>({{ item.cod }})&nbsp;&nbsp;</b>{{ item.descricao }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div class="q-pa-md q-gutter-y-md flex justify-center">
                            <q-btn-group style="border: 1px solid;" v-show="item.id != 0">
                                <q-btn label="1 Ponto"
                                    :class="item.selected === 1 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 1)" />
                                <q-btn label="0,5 Ponto"
                                    :class="item.selected === 0.5 ? 'bg-teal text-white' : 'bg-white text-black'"
                                    @click="coletar(item, 0.5)" />
                                <q-btn label="0 Ponto"
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
import { avaliacaoNivelTres } from './data/vbmappNivelTres';
import { avaliacaoNivelUmTarefas } from './data/vbmappNivelUmTarefas';
import { avaliacaoNivelDoisTarefas } from './data/vbmappNivelDoisTarefas';
import { useRoute } from 'vue-router';
import { toRaw } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { computed } from 'vue';
import { VbMappService } from 'src/services/VbMappService';
import { useQuasar } from 'quasar';

const { success, error } = useNotify();

const routeLocation = useRoute();

const uuidAprendiz = ref();

const vbmappUuidParam = ref(routeLocation.params.vbmappUuid);

const tipoAvaliacao = ref(routeLocation.params.tipoAvaliacao)

const uuidVbmapp = ref();

const showNiveis = ref<string[]>([])

const tab1 = ref('1');

const tab2 = ref(1);

const tab3 = ref('objetivos');

const titulosNivelUm = ref<any[]>([]);

const cards = ref<any[]>([]);

const cardsColetaAtual = ref();

const nivelSelecionado = ref();

const descritivoTitulo = computed(() => tipoAvaliacao.value == 'milestones' ? 'VB-MAPP - Milestones' : 'VB-MAPP - Tarefas');

const showAba = (aba: string) => {
    return showNiveis.value.includes(aba)
};

const tituloSelecionado = ref()

const state = reactive({
    cache: new Map()
});

const vbMappService = new VbMappService();

const $q = useQuasar();

const visible = ref([]);

async function getTitulosAvaliacoes(tipoColeta: number, abaSelecionada?: string) {

    if (abaSelecionada)
        tab2.value = 1

    nivelSelecionado.value = abaSelecionada ?? nivelSelecionado.value;

    tituloSelecionado.value = toRaw(tipoColeta);

    cards.value = carregarAvaliacao();

    refresh();
}

function carregarAvaliacao() {

    const tipoColeta = tituloSelecionado.value

    cardsColetaAtual.value = tipoColeta;//tipo da coleta e o conjunto dos objetivos.

    let objetivos;

    if (nivelSelecionado.value == '1') {

        if (tipoAvaliacao.value == 'tarefas') {
            objetivos = avaliacaoNivelUmTarefas.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        } else {
            objetivos = avaliacaoNivelUm.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        }

    } else if (nivelSelecionado.value == '2') {

        if (tipoAvaliacao.value == 'tarefas') {
            objetivos = avaliacaoNivelDoisTarefas.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        } else {
            objetivos = avaliacaoNivelDois.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        }

    } else if (nivelSelecionado.value == '3') {

        if (tipoAvaliacao.value == 'tarefas') {
            objetivos = avaliacaoNivelDoisTarefas.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        } else {
            objetivos = avaliacaoNivelTres.avaliacoes
                .filter(i => i.tipo == tipoColeta)
                .find(i => i)?.objetivos || []; // Obtém os objetivos ou um array vazio  
        }
    }

    const newObjetivos = objetivos.map(obj => ({
        ...obj, // Mantém as outras propriedades  
        selected: null // Altera a propriedade 'selected' para null  
    }));

    return newObjetivos;
}

async function salvar() {

    const coletas = toRaw(state.cache);

    const itens = coletas.get("coletasRealizadas");

    try {
        $q.loading.show();
        const { data } = await vbMappService.postColetaAvaliacao(itens);

        if (data) {
            success('Coletas salvas com sucesso!');
            //refresh();
        } else {
            error('Ocorreu um erro ao salvar as coletas');
        }
    } catch (e) {
        error('Ocorreu um erro ao salvar as coletas');
        throw e;
    } finally {
        await refresh();
        $q.loading.hide();
    }

}

async function refresh() {

    cards.value = carregarAvaliacao();

    let cardsTela = toRaw(cards.value);

    const { data } = await vbMappService.getColetasRespondidas(vbmappUuidParam.value);

    data.forEach(row => {
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
}

async function configTela() {

    try {
        $q.loading.show();
        const { uuid, niveis_coleta } = await vbMappService.getVbMappAvaliacaoConfigTelaById(vbmappUuidParam.value);

        if (uuid != null && niveis_coleta != null) {
            uuidVbmapp.value = uuid;
            showNiveis.value = niveis_coleta.split(',') || [];
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
        vbmapp_uuid_fk: uuidVbmapp.value,
        aprendiz_uuid_fk: uuidAprendiz.value.toString(),
        coleta_id: item.id,
        nivel_coleta: 1,
        tipo: tituloSelecionado.value,
        pontuacao: pontuacao,
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
        coletaExistente.pontuacao = novaColeta.pontuacao; // Atualizando pontuação  
        coletaExistente.selected = novaColeta.selected; // Verificando se deseja atualizar o selected  
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

function abrirModalAjuda(index: number) {
    visible.value[index] = true;
}

function fecharModalAjuda(index: number) {
    visible.value[index] = false;
}

onMounted(async () => {
    uuidAprendiz.value = routeLocation.params.aprendizUuid
    vbmappUuidParam.value = routeLocation.params.vbmappUuid;
    await configTela();
    titulosNivelUm.value = avaliacaoNivelUm.avaliacoes;//esse aqui fica porque é padrão não apagar.    
    getTitulosAvaliacoes(1, '1');
    getData('coletasRealizadas');
});

</script>