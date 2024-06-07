<template>
    <q-page padding>

        <q-dialog v-model="visibleAnotacao">
            <q-card class="my-card q-pa-md full-width">
                <div class="text-center text-body1">Anotação</div>
                <q-input outlined label="Anotação no alvo" v-model="anotacao" type="textarea"
                    :rules="[(val) => (val && val.length > 0) || 'Name is required']" />
                <q-btn label="Salvar" color="primary" class="full-width q-mb-md" type="submit"
                    @click="salvarAnotacao" />
            </q-card>
        </q-dialog>

        <q-dialog v-model="visible">
            <q-card class="my-card q-pa-md">
                <div class="text-center text-body1">Selecione o dia para Coleta</div>
                <div class="q-gutter-sm q-pa-md">
                    <q-radio v-model="diaColeta" val="seg" label="SEG" color="teal" />
                    <q-radio v-model="diaColeta" val="ter" label="TER" color="teal" />
                    <q-radio v-model="diaColeta" val="qua" label="QUA" color="teal" />
                    <q-radio v-model="diaColeta" val="qui" label="QUI" color="teal" />
                    <q-radio v-model="diaColeta" val="sex" label="SEX" color="teal" />
                    <q-radio v-model="diaColeta" val="sab" label="SAB" color="teal" />
                </div>
                <q-btn label="Selecionar" color="primary" class="full-width q-mb-md" type="submit"
                    @click="getColetasNaoRespondidas" />
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
                                    <span class="text-subtitle2 text-teal"
                                        v-if="item.alvo.descricao_alvo.length > 0">Descrição do Alvo:</span>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal">Alvo: </span>
                                    <div class="text-subtitle1">{{ item.alvo.nome_alvo }}</div>

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
                                                        @click="abreModalAnotacao(item)">Anotar</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>

                        <q-radio v-model="respostas[item.alvo.identificador]" val="nao-fez" label="NÃO FEZ" keep-color
                            color="red" size="lg" />
                        <q-radio v-model="respostas[item.alvo.identificador]" val="com-ajuda" label="COM AJUDA"
                            keep-color color="orange" size="lg" />
                        <q-radio v-model="respostas[item.alvo.identificador]" val="sem-ajuda" label="SEM AJUDA"
                            keep-color color="green" size="lg" />
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
                                    <span class="text-subtitle2 text-teal"
                                        v-if="item.alvo.descricao_alvo.length > 0">Descrição do Alvo:</span>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal">Alvo: </span>
                                    <div class="text-subtitle1">{{ item.alvo.nome_alvo }}</div>

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
                                                        @click="abreModalAnotacao(item)">Anotar</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
                                    </q-btn>
                                </div>
                            </div>
                        </q-card-section>

                        <q-radio v-model="item.resposta" val="nao-fez" label="NÃO FEZ" keep-color color="red" size="lg"
                            disable />
                        <q-radio v-model="item.resposta" val="com-ajuda" label="COM AJUDA" keep-color color="orange"
                            size="lg" disable />
                        <q-radio v-model="item.resposta" val="sem-ajuda" label="SEM AJUDA" keep-color color="green"
                            size="lg" disable />
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
                                                        @click="abreModalAnotacao({})">Editar</q-item-section>
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
            <q-btn fab icon="mdi-check" color="green" @click="handleSalvarRespostas" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { Anotacao, db } from 'src/db';
import { v4 as uuid } from 'uuid';
import useNotify from 'src/composables/UseNotify';
import { Coleta } from 'src/db';

const { success, error } = useNotify();

const visible = ref(true);

const visibleAnotacao = ref(false);

const routeLocation = useRoute();

const _uuidTreinamento = routeLocation.params.uuidTreinamento;

const _uuidAprendiz = routeLocation.params.uuidAprendiz;

const tab = ref('pendentes');

const diaColeta = ref('');

const respostas = ref<any>({}); // um objeto para armazenar as respostas

const alvosPendentes = ref<any[]>([]);

const alvosColetados = ref<any[]>([]);

const anotacao = ref('');

const alvoSelecionadoToAnotacao = ref<Coleta>();

const anotacoesFeitas = ref<Anotacao[]>([]);

function handleSalvarRespostas() {
    const _respostas = toRaw(respostas.value);
    const arr = Object.entries(_respostas).map(([uuid, resposta]) => ({ uuid, resposta }));

    arr.map(i => {
        db.coletas.update(i.uuid, { resposta: i.resposta, foi_respondido: true, data_coleta: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }) }).then(function (updated) {
            if (updated)
                console.log("Resposta atualizada");
            else
                console.log("Nada foi atualizado");
        });
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

async function getColetasNaoRespondidas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined) {
        throw new Error('uuidTreinamento ou uuidAprendiz não informado');
    }

    const diasSemanasQueTemColeta = await getDiasSemanasQueTemColeta();

    db.coletas
        .where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento })
        .and(coleta => coleta.foi_respondido === false)
        .sortBy('semana').then((data) => {
            const raw = toRaw(data)
            raw.map(coleta => {
                if (diasSemanasQueTemColeta.includes(diaColeta.value)) {
                    alvosPendentes.value.push(coleta)
                }
            })
            visible.value = false;
        });

    getColetasRespondidas();

    db.anotacoes.where({ treinamento_uuid_fk: _uuidTreinamento }).toArray().then((data) => {
        anotacoesFeitas.value = data;
    });
}

async function getColetasRespondidas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined) {
        throw new Error('uuidTreinamento ou uuidAprendiz não informado');
    }

    const diasSemanasQueTemColeta = await getDiasSemanasQueTemColeta();

    db.coletas
        .where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento })
        .and(coleta => coleta.foi_respondido === true)
        .sortBy('semana').then((data) => {
            const raw = toRaw(data)
            raw.map(coleta => {
                if (diasSemanasQueTemColeta.includes(diaColeta.value)) {
                    alvosColetados.value.push(coleta)
                }
            })
            visible.value = false;
        });

    db.anotacoes.where({ treinamento_uuid_fk: _uuidTreinamento }).toArray().then((data) => {
        anotacoesFeitas.value = data;
    });
}

async function getDiasSemanasQueTemColeta() {
    let configuracoesTreinamento;

    try {
        configuracoesTreinamento = await db.coletas
            .orderBy('aprendiz_uuid_fk')
            .first();
    } catch (error) {
        console.error("Ocorreu um erro ao buscar o primeiro registro: ", error);
    }

    let arr = []

    if (configuracoesTreinamento?.seg) {
        arr.push('seg')
    }
    if (configuracoesTreinamento?.ter) {
        arr.push('ter')
    }
    if (configuracoesTreinamento?.qua) {
        arr.push('qua')
    }
    if (configuracoesTreinamento?.qui) {
        arr.push('qui')
    }
    if (configuracoesTreinamento?.sex) {
        arr.push('sex')
    }
    if (configuracoesTreinamento?.sab) {
        arr.push('sab')
    }

    return arr;
}

function abreModalAnotacao(item: any) {
    visibleAnotacao.value = true;
    alvoSelecionadoToAnotacao.value = item;
}

async function salvarAnotacao() {
    await db.anotacoes.add({
        uuid: uuid(),
        alvo_identidicador_fk: alvoSelecionadoToAnotacao.value?.alvo.identificador,
        treinamento_uuid_fk: alvoSelecionadoToAnotacao?.value?.alvo.treinamento_uuid_fk,
        data_anotacao: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false }),
        anotacao: anotacao.value,
        sync: false
    }).then(() => {
        getColetasNaoRespondidas();
        success("Anotação salva com sucesso");
    }).catch((_error) => {
        error("Ocorreu um erro ao salvar a anotação: ", _error);
    });

    visibleAnotacao.value = false;
    anotacao.value = '';
}

</script>
