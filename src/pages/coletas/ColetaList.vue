<template>
    <q-page padding>

        <q-dialog v-model="visibleAnotacao" persistent>
            <q-card class="my-card q-pa-md full-width">
                <div class="text-h6 text-teal">Anotação</div>
                <q-card-section>
                    <q-input outlined label="Anotação no alvo" v-model="anotacao" type="textarea"
                        :rules="[(val) => (val && val.length > 0) || 'Anotação é obrigatória']"
                        placeholder="Digite sua anotação aqui..." />
                    <q-checkbox v-model="podeImprimir" label="Marque para não exibir essa anotação no relatório."
                        class="q-mt-md" />
                </q-card-section>
                <q-card-actions align="around">
                    <q-btn label="Salvar" color="green" no-caps @click="salvarAnotacao(podeImprimir)"
                        class="full-width" />
                    <q-btn label="Voltar" color="info" no-caps @click="visibleAnotacao = false"
                        class="full-width q-mt-md" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="pendentes" label="Pendentes" />
            <q-tab name="coletados" label="Coletados" />
            <q-tab name="anotacoes" label="Anotações" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="pendentes">
                <div v-for="(item, index) in alvosPendentes" :key="index" class="q-mb-sm">
                    <div class="flex justify-center">
                        <q-chip color="primary" text-color="white text-body2 q-mb-sm"
                            v-if="exibirDivisorAlvosPorSemana(item.semana)">{{
                                item.semana }}ª
                            SEMANA</q-chip>
                    </div>

                    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="row items-center justify-between">
                                        <div class="text-h6 text-teal">{{ item.alvo.nome_alvo }}</div>
                                        <div><q-btn icon="mdi-pencil-outline" color="info" dense size="md"
                                                @click="abreModalAnotacao(item, 'inserir')" /></div>
                                    </div>
                                    <div class="row items-center q-gutter-sm"
                                        v-if="item.alvo.descricao_alvo.length > 0">
                                        <div class="text-subtitle2 text-teal q-mt-md">Descrição do Alvo:</div>
                                    </div>

                                    <div class="text-body2">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal" v-if="item.alvo.pergunta > 0">Pergunta:
                                    </span>
                                    <div class="text-subtitle1">{{ item.alvo.pergunta }}</div>
                                </div>

                            </div>
                        </q-card-section>

                        <div v-if="_tipoColeta === 'ocorrencia'">

                            <q-input v-model="counts[index].count" dense placeholder="0"
                                class="q-mb-md q-mr-xl q-ml-xl text-h6">
                                <template v-slot:before>
                                    <q-btn round dense color="orange-10" icon="remove" @click="counts[index].count--"
                                        :disable="counts[index].count < 1" />
                                </template>

                                <template v-slot:after>
                                    <q-btn round dense color="teal" icon="add" @click="counts[index].count++" />
                                </template>
                            </q-input>
                        </div>
                        <div v-else>
                            <q-radio v-model="respostas[item.coletaId]" val="nao-fez" label="NÃO FEZ" keep-color
                                color="red" size="md" />
                            <q-radio v-model="respostas[item.coletaId]" val="com-ajuda" label="COM AJUDA" keep-color
                                color="orange" size="md" />
                            <q-radio v-model="respostas[item.coletaId]" val="sem-ajuda" label="SEM AJUDA" keep-color
                                color="green" size="md" />
                            <q-radio v-model="respostas[item.coletaId]" val="nao-aplica" label="NÃO APLICAR" keep-color
                                color="grey" size="md" />
                        </div>
                    </q-card>

                </div>
            </q-tab-panel>

            <q-tab-panel name="coletados">
                <div v-for="(item, index) in alvosColetados" :key="index" class="q-mb-sm">
                    <div class="flex justify-center">
                        <q-chip color="primary" text-color="white text-body2 q-mb-sm"
                            v-if="exibirDivisorAlvosPorSemana(item.semana)">{{
                                item.semana }}ª
                            SEMANA</q-chip>
                    </div>

                    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">
                                    <div class="row items-center justify-between">
                                        <div class="text-h6 text-teal">{{ item.alvo.nome_alvo }}</div>
                                        <div><q-btn icon="mdi-pencil-outline" color="info" dense size="md"
                                                @click="abreModalAnotacao(item, 'inserir')" /></div>
                                    </div>
                                    <div class="text-subtitle2 text-teal q-mt-md"
                                        v-if="item.alvo.descricao_alvo.length > 0">
                                        Descrição do
                                        Alvo:</div>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal" v-if="item.alvo.pergunta > 0">Pergunta:
                                    </span>
                                    <div class="text-subtitle1">{{ item.alvo.pergunta }}</div>

                                    <div class="text-subtitle1 q-mt-md">
                                        <span class="text-teal">Respondido por:</span> {{ item.respondido_por }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <div v-if="_tipoColeta === 'ocorrencia'">
                            <div class="text-h6 text-teal q-ml-md q-pb-md">Total: {{ item.resposta }}</div>
                        </div>
                        <div v-else>
                            <q-radio v-model="item.resposta" val="nao-fez" label="NÃO FEZ" keep-color color="red"
                                size="md" disable />
                            <q-radio v-model="item.resposta" val="com-ajuda" label="COM AJUDA" keep-color color="orange"
                                size="md" disable />
                            <q-radio v-model="item.resposta" val="sem-ajuda" label="SEM AJUDA" keep-color color="green"
                                size="md" disable />
                            <q-radio v-model="respostas[item.coletaId]" val="nao-aplica" label="NÃO APLICA" keep-color
                                color="grey" size="md" disable />
                        </div>
                    </q-card>

                </div>
            </q-tab-panel>

            <q-tab-panel name="anotacoes">

                <div v-for="(item, index) in anotacoesFeitas" :key="index" class="q-mb-sm">
                    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                        <q-card-section>
                            <div class="row items-center justify-between">
                                <div>
                                    <div class="text-subtitle2 text-teal">Data da Anotação:</div>
                                    <div class="text-body1 text-dark">{{ item.data_anotacao }}</div>
                                    <div class="text-subtitle2 text-teal">Anotação:</div>
                                    <div class="text-body1 text-dark">{{ item.anotacao }}</div>
                                </div>
                                <div class="row items-center q-gutter-x-sm">
                                    <q-btn icon="mdi-pencil-outline" color="info" dense size="md"
                                        @click="abreModalAnotacao(item, 'editar')" />
                                    <q-btn icon="mdi-delete-outline" color="negative" dense size="md"
                                        @click="excluirAnotacao(item)" />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="save" color="green" @click="salvarRespostas" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { ColetaService } from 'src/services/ColetaService';
import { AnotacaoService } from 'src/services/AnotacaoService';

const anotacaoService = new AnotacaoService();

const coletaService = new ColetaService();

const router = useRouter();

const $q = useQuasar();

const { success, error } = useNotify();

const visibleAnotacao = ref(false);

const routeLocation = useRoute();

const _uuidTreinamento = routeLocation.params.uuidTreinamento;

const _uuidAprendiz = routeLocation.params.uuidAprendiz;

const _diaColeta = routeLocation.params.diaColeta;

const _tipoColeta = routeLocation.params.tipoColeta;

const atendimentoId = routeLocation.params.atendimentoId;

const tab = ref('pendentes');

const respostas = ref<any>({}); // um objeto para armazenar as respostas

const alvosPendentes = ref<any[]>([]);

const alvosColetados = ref<any[]>([]);

const anotacao = ref('');

const alvoSelecionadoToAnotacao = ref<any>();

const anotacoesFeitas = ref<[]>([]);

let counts = ref<any[]>([]);

let acaoAnotacao = '';

const podeImprimir = ref<boolean>(false);

async function salvarRespostas() {
    $q.loading.show();

    const _respostas = toRaw(respostas.value);

    try {
        if (_tipoColeta === 'ocorrencia') {
            counts.value.map(async (item) => {

                if (item.count === 0) {
                    return;
                }

                const coletasOcoorencias = counts.value.filter(i => i.count != 0).map(i => { return { uuid: i.identificador, resposta: i.count } });

                const { data, status } = await coletaService.putColetaResposta(coletasOcoorencias);

                if (data != null || status == 200) {
                    success("Respostas salvas com sucesso!");
                } else {
                    error("Ocorreu um erro ao salvar as respostas");
                }
            });
        } else {
            const arr = Object.entries(_respostas).map(([uuid, resposta]) => ({ uuid, resposta }));
            const { data, status } = await coletaService.putColetaResposta(arr);

            if (data != null || status == 200) {
                success("Respostas salvas com sucesso!");
            } else {
                error("Ocorreu um erro ao salvar as respostas");
            }
        }
    } catch (e) {

    } finally {
        $q.loading.hide();
        setTimeout(() => router.go(0), 1000);
    }
}

let value = 0;

function exibirDivisorAlvosPorSemana(semana: number) {

    let returnValue = false;

    if (value !== semana) {
        returnValue = true;
    }

    value = semana;

    return returnValue;//TODO ordenar a query para trazer os resultados organizados por semana para facilitar a função.
}

async function getColetas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined || _diaColeta === undefined) {
        throw new Error('uuidTreinamento, diaColeta ou uuidAprendiz não informado');
    }

    const { data, status } = await coletaService.getColetas(_uuidTreinamento);

    if (data != null || status == 200) {

        const raw = toRaw(data)

        //Pendentes de Coletas
        raw.filter(coleta => coleta.foi_respondido == false)
            .map(coleta => {

                const dia = coleta.seg ? 'seg' : coleta.ter ? 'ter' : coleta.qua ? 'qua' : coleta.qui ? 'qui' : coleta.sex ? 'sex' : coleta.sab ? 'sab' : null;

                if (dia === _diaColeta.toString()) {
                    alvosPendentes.value.push(coleta);
                    counts.value = alvosPendentes.value.map(coleta => ({ identificador: coleta.coletaId, count: coleta.resposta != null ? coleta.resposta : 0 }));
                }
            })

        //Coletadas    
        raw.filter(coleta => coleta.foi_respondido == true)
            .map(coleta => {

                const dia = coleta.seg ? 'seg' : coleta.ter ? 'ter' : coleta.qua ? 'qua' : coleta.qui ? 'qui' : coleta.sex ? 'sex' : coleta.sab ? 'sab' : null;

                if (dia === _diaColeta.toString()) {
                    alvosColetados.value.push(coleta);
                }
            });

    } else {
        error('Não foi possível carregar as coletas.');
    }

    getAnotacoes();
}

async function getAnotacoes() {

    try {
        $q.loading.show()
        const { data, status } = await anotacaoService.getAnotacoes(atendimentoId, _uuidTreinamento);

        if (data != null || status == 200) {
            anotacoesFeitas.value = data;
        } else {
            error("Erro ao carregar as anotações")
        }
    } catch (e) {
        error("Erro ao carregar as anotações")
    } finally {
        $q.loading.hide();
    }
}

function abreModalAnotacao(item: any, acao: string) {
    visibleAnotacao.value = true;
    anotacao.value = item.anotacao;
    alvoSelecionadoToAnotacao.value = item;
    acaoAnotacao = acao === 'inserir' ? 'inserir' : 'editar';
}

async function salvarAnotacao(isImprimirRelatorio: boolean) {

    const object = {
        uuid: alvoSelecionadoToAnotacao?.value?.uuid,
        atendimentoId: atendimentoId,
        treinamentoId: _uuidTreinamento,
        coletaId: alvoSelecionadoToAnotacao?.value?.coletaId,
        anotacao: anotacao.value,
        imprimirRelatorio: !isImprimirRelatorio
    }

    if (acaoAnotacao === 'editar') {
        atualizarAnotacao(object);
    } else {

        try {
            $q.loading.show();
            const { data, status } = await anotacaoService.postAnotacao(object);

            if (data != null || status == 200) {
                success("Anotação salva com sucesso!")
            } else {
                error("Ocorreu um erro ao salvar a anotação.")
            }

        } catch (e) {
            error("Ocorreu um erro ao salvar a anotação.")
        } finally {
            visibleAnotacao.value = false;
            anotacao.value = '';
            await getAnotacoes();;
            $q.loading.hide();
        }
    }

}

async function atualizarAnotacao(object: any) {

    try {
        $q.loading.show();
        const { data, status } = await anotacaoService.putAnotacao(object);

        if (data != null || status == 200) {
            success("Anotação salva com sucesso!")
        } else {
            error("Ocorreu um erro ao salvar a anotação.")
        }


    } catch (e) {
        error("Ocorreu um erro ao salvar a anotação.")
    } finally {
        visibleAnotacao.value = false;
        anotacao.value = '';
        await getAnotacoes();
        $q.loading.hide();
    }
}

function excluirAnotacao(item: any) {
    console.log(item)
    $q.dialog({
        title: 'Confirma a exclusão da Anotação?',
        ok: true,
        cancel: true,
    })
        .onOk(async () => {
            /** TODO fazer o delete
            db.anotacoes.delete(item.uuid).then(() => {
                getAnotacoes();
                success("Anotação excluída com sucesso");
            }).catch((_error) => {
                error("Ocorreu um erro ao excluir a anotação: ", _error);
            });
             */
        })
        .onDismiss(() => { });
}

onMounted(() => {
    getColetas();
});

</script>
