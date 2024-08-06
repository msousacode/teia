<template>
    <q-page padding>

        <q-dialog v-model="visibleAnotacao" persistent>
            <q-card class="my-card q-pa-md full-width">
                <div class="text-center text-body1">Anotação</div>
                <q-input outlined label="Anotação no alvo" v-model="anotacao" type="textarea"
                    :rules="[(val) => (val && val.length > 0) || 'Name is required']" />
                <q-btn label="Salvar" color="green" size="18px" class="full-width q-mb-md" type="submit"
                    @click="salvarAnotacao" />


                <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" rounded flat
                    @click="visibleAnotacao = false" />
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
                                    <span class="text-subtitle2 text-teal">Alvo: </span>
                                    <div class="text-subtitle1">{{ item.alvo.nome_alvo }}</div>
                                    <span class="text-subtitle2 text-teal"
                                        v-if="item.alvo.descricao_alvo.length > 0">Descrição do Alvo:</span>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal" v-if="item.alvo.pergunta > 0">Pergunta:
                                    </span>
                                    <div class="text-subtitle1">{{ item.alvo.pergunta }}</div>
                                </div>
                                <div class="col-auto">
                                    <q-btn color="grey-7" round flat icon="more_vert">
                                        <q-menu cover auto-close>
                                            <q-list>
                                                <q-item clickable>
                                                    <q-item-section
                                                        @click="abreModalAnotacao(item, 'inserir')">Anotar</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
                                    </q-btn>
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
                                    <q-btn round dense color="info" icon="add" @click="counts[index].count++" />
                                </template>
                            </q-input>
                        </div>
                        <div v-else>
                            <q-radio v-model="respostas[item.alvo.identificador]" val="nao-fez" label="NÃO FEZ"
                                keep-color color="red" size="lg" />
                            <q-radio v-model="respostas[item.alvo.identificador]" val="com-ajuda" label="COM AJUDA"
                                keep-color color="orange" size="lg" />
                            <q-radio v-model="respostas[item.alvo.identificador]" val="sem-ajuda" label="SEM AJUDA"
                                keep-color color="green" size="lg" />
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
                                    <span class="text-subtitle2 text-teal">Alvo: </span>
                                    <div class="text-subtitle1">{{ item.alvo.nome_alvo }}</div>

                                    <span class="text-subtitle2 text-teal"
                                        v-if="item.alvo.descricao_alvo.length > 0">Descrição do
                                        Alvo:</span>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal" v-if="item.alvo.pergunta > 0">Pergunta:
                                    </span>
                                    <div class="text-subtitle1">{{ item.alvo.pergunta }}</div>
                                </div>
                                <div class="col-auto">
                                    <q-btn color="grey-7" round flat icon="more_vert">
                                        <q-menu cover auto-close>
                                            <q-list>
                                                <q-item clickable>
                                                    <q-item-section
                                                        @click="abreModalAnotacao(item, 'inserir')">Anotar</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>

                        <div v-if="_tipoColeta === 'ocorrencia'">
                            <div class="text-h6 text-teal q-ml-md q-pb-md">Total: {{ item.resposta }}</div>
                        </div>
                        <div v-else>
                            <q-radio v-model="item.resposta" val="nao-fez" label="NÃO FEZ" keep-color color="red"
                                size="lg" disable />
                            <q-radio v-model="item.resposta" val="com-ajuda" label="COM AJUDA" keep-color color="orange"
                                size="lg" disable />
                            <q-radio v-model="item.resposta" val="sem-ajuda" label="SEM AJUDA" keep-color color="green"
                                size="lg" disable />
                        </div>
                    </q-card>

                </div>
            </q-tab-panel>

            <q-tab-panel name="anotacoes">

                <div v-for="(item, index) in anotacoesFeitas" :key="index" class="q-mb-sm">
                    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                        <q-card-section>
                            <div class="row items-center no-wrap">
                                <div class="col">

                                    <div class="text-subtitle2 text-teal">Data da anotação:
                                        <span class="text-subtitle1" style="color:black !important">{{
            item.data_anotacao
        }}</span>
                                    </div>

                                    <span class="text-subtitle2 text-teal">Anotação: </span>
                                    <div class="text-subtitle1">{{ item.anotacao }}</div>
                                </div>
                                <div class="col-auto">
                                    <q-btn color="grey-7" round flat icon="more_vert">
                                        <q-menu cover auto-close>
                                            <q-list>
                                                <q-item clickable>
                                                    <q-item-section
                                                        @click="abreModalAnotacao(item, 'editar')">Editar</q-item-section>
                                                </q-item>
                                                <q-item clickable>
                                                    <q-item-section
                                                        @click="excluirAnotacao(item)">Excluir</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
                                    </q-btn>
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
import { Anotacao, db } from 'src/db';
import { v4 as uuid } from 'uuid';
import useNotify from 'src/composables/UseNotify';
import { Coleta } from 'src/db';
import { useQuasar } from 'quasar';

const router = useRouter();

const $q = useQuasar();

const { success, error } = useNotify();

const visibleAnotacao = ref(false);

const routeLocation = useRoute();

const _uuidTreinamento = routeLocation.params.uuidTreinamento;

const _uuidAprendiz = routeLocation.params.uuidAprendiz;

const _diaColeta = routeLocation.params.diaColeta;

const _tipoColeta = routeLocation.params.tipoColeta;

const tab = ref('pendentes');

const respostas = ref<any>({}); // um objeto para armazenar as respostas

const alvosPendentes = ref<any[]>([]);

const alvosColetados = ref<any[]>([]);

const anotacao = ref('');

const alvoSelecionadoToAnotacao = ref<Coleta>();

const anotacoesFeitas = ref<Anotacao[]>([]);

let counts = ref<any[]>([]);

let acaoAnotacao = '';

function salvarRespostas() {
    const _respostas = toRaw(respostas.value);
    const arr = Object.entries(_respostas).map(([uuid, resposta]) => ({ uuid, resposta }));

    if (_tipoColeta === 'ocorrencia') {
        counts.value.map(async (item) => {

            if (item.count === 0) {
                return;
            }

            await db.coletas.update(item.identificador, { resposta: item.count, foi_respondido: true, data_coleta: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }) })
                .catch((_error) => {
                    error("Ocorreu um erro ao salvar as respostas: ", _error);
                });
            success("Respostas salvas com sucesso!");
            setTimeout(() => router.go(0), 2000);//Esse código faz um redirect para a mesma página, atualizando os dados.
        });
    }

    arr.map(async i => {
        await db.coletas.update(i.uuid, { resposta: i.resposta, foi_respondido: true, data_coleta: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }) })
            .catch((_error) => {
                error("Ocorreu um erro ao salvar as respostas: ", _error);
            });
        success("Respostas salvas com sucesso!");
        setTimeout(() => router.go(0), 2000);//Esse código faz um redirect para a mesma página, atualizando os dados.
    });
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

function getColetasNaoRespondidas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined || _diaColeta === undefined) {
        throw new Error('uuidTreinamento, diaColeta ou uuidAprendiz não informado');
    }

    db.coletas
        .where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento })
        .and(coleta => coleta.foi_respondido === false)
        .sortBy('semana').then((data) => {
            const raw = toRaw(data)
            raw.map(coleta => {

                const dia = coleta.seg ? 'seg' : coleta.ter ? 'ter' : coleta.qua ? 'qua' : coleta.qui ? 'qui' : coleta.sex ? 'sex' : coleta.sab ? 'sab' : null;

                if (dia === _diaColeta.toString()) {
                    alvosPendentes.value.push(coleta);
                    counts.value = alvosPendentes.value.map(coleta => ({ identificador: coleta.uuid, count: 0 }));
                }
            })
        });

    getAnotacoes();
    getColetasRespondidas();
}

function getAnotacoes() {
    db.anotacoes.where({ treinamento_uuid_fk: _uuidTreinamento }).toArray().then((data) => {
        anotacoesFeitas.value = data;
    });
}

function getColetasRespondidas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined || _diaColeta === undefined) {
        throw new Error('uuidTreinamento, diaColeta ou uuidAprendiz não informado');
    }

    db.coletas
        .where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento })
        .and(coleta => coleta.foi_respondido === true)
        .sortBy('semana').then((data) => {
            const raw = toRaw(data);
            raw.map(coleta => {

                const dia = coleta.seg ? 'seg' : coleta.ter ? 'ter' : coleta.qua ? 'qua' : coleta.qui ? 'qui' : coleta.sex ? 'sex' : coleta.sab ? 'sab' : null;

                if (dia === _diaColeta.toString()) {
                    alvosColetados.value.push(coleta)
                }
            })
        });

    db.anotacoes.where({ treinamento_uuid_fk: _uuidTreinamento }).toArray().then((data) => {
        anotacoesFeitas.value = data;
    });
}

function abreModalAnotacao(item: any, acao: string) {
    visibleAnotacao.value = true;
    anotacao.value = item.anotacao;
    alvoSelecionadoToAnotacao.value = item;
    acaoAnotacao = acao === 'inserir' ? 'inserir' : 'editar';
}

function salvarAnotacao() {
    if (acaoAnotacao === 'editar') {
        atualizarAnotacao()
    } else {

        db.anotacoes.add({
            uuid: uuid(),
            alvo_identidicador_fk: alvoSelecionadoToAnotacao.value?.alvo.identificador,
            treinamento_uuid_fk: alvoSelecionadoToAnotacao?.value?.alvo.treinamento_uuid_fk,
            data_anotacao: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }),
            anotacao: anotacao.value,
            sync: false,
            ativo: true
        }).then(() => {
            getAnotacoes();
            success("Anotação salva com sucesso");
        }).catch((_error) => {
            error("Ocorreu um erro ao salvar a anotação: ", _error);
        });
    }

    visibleAnotacao.value = false;
    anotacao.value = '';
}

function atualizarAnotacao() {
    db.anotacoes.update(alvoSelecionadoToAnotacao.value?.uuid, { anotacao: anotacao.value }).then(() => {
        getAnotacoes();
        success("Anotação atualizada com sucesso");
    }).catch((_error) => {
        error("Ocorreu um erro ao atualizar a anotação: ", _error);
    });

    visibleAnotacao.value = false;
    anotacao.value = '';
}

function excluirAnotacao(item: any) {

    $q.dialog({
        title: 'Confirma a exclusão da Anotação?',
        ok: true,
        cancel: true,
    })
        .onOk(async () => {
            db.anotacoes.delete(item.uuid).then(() => {
                getAnotacoes();
                success("Anotação excluída com sucesso");
            }).catch((_error) => {
                error("Ocorreu um erro ao excluir a anotação: ", _error);
            });
        })
        .onDismiss(() => { });
}

onMounted(() => {
    getColetasNaoRespondidas();
});

</script>
