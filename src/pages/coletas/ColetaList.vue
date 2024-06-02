<template>
    <q-page padding>

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
                    @click="getColetas" />
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
                                    <span class="text-subtitle2 text-teal">Descrição do Alvo: </span>
                                    <div class="text-subtitle1">{{ item.alvo.descricao_alvo }}</div>

                                    <span class="text-subtitle2 text-teal">Pergunta: </span>
                                    <div class="text-subtitle1">{{ item.alvo.pergunta }}</div>

                                </div>
                            </div>
                        </q-card-section>

                        <q-radio v-model="respostas[item.identificador]" val="nao-fez" label="NÃO FEZ" keep-color
                            color="red" size="lg" />
                        <q-radio v-model="respostas[item.identificador]" val="com-ajuda" label="COM AJUDA" keep-color
                            color="orange" size="lg" />
                        <q-radio v-model="respostas[item.identificador]" val="sem-ajuda" label="SEM AJUDA" keep-color
                            color="green" size="lg" />

                    </q-card>
                </div>
            </q-tab-panel>

            <q-tab-panel name="coletados">
                Coletados
            </q-tab-panel>

            <q-tab-panel name="anotacoes">
                Anotações
            </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" @click="handleSalvarRespostas" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { db } from 'src/db';

const visible = ref(true);

const routeLocation = useRoute();

const _uuidTreinamento = routeLocation.params.uuidTreinamento;

const _uuidAprendiz = routeLocation.params.uuidAprendiz;

const tab = ref('pendentes');

const diaColeta = ref('');

const respostas = ref<any>({}); // um objeto para armazenar as respostas

const alvosPendentes = ref<any[]>([]);

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

async function getColetas() {

    if (_uuidTreinamento === undefined || _uuidAprendiz === undefined) {
        throw new Error('uuidTreinamento ou uuidAprendiz não informado');
    }

    const diasSemanasQueTemColeta = await getDiasSemanasQueTemColeta();

    db.coletas
        .where({ aprendiz_uuid_fk: _uuidAprendiz, treinamento_uuid_fk: _uuidTreinamento })
        .sortBy('semana').then((data) => {
            const raw = toRaw(data)
            raw.map(coleta => {
                if (diasSemanasQueTemColeta.includes(diaColeta.value)) {
                    alvosPendentes.value.push(coleta)
                }
            })
            visible.value = false;
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

</script>
