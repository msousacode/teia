<template>
  <div class="q-pa-md">

    <q-dialog v-model="visible" header="Aprendizes" modal="true">
      <q-card class="my-card full-width">
        <div class="q-pa-md">
          <q-list bordered separator v-for="(
              item, index
            ) in treinamentos" :key="index">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-body1">{{ item.treinamento }}</q-item-label>
                <q-item-label caption>{{ item.protocolo }}</q-item-label>

                <div v-if="item.configuracoes">
                  <q-item-label caption>Repete: {{ item.configuracoes.repetir }}</q-item-label>
                  <q-item-label caption>

                    <q-radio class="text-body2" v-model="diaColeta" val="seg" label="SEG" color="teal"
                      v-if="item.configuracoes.seg" />

                    <q-radio class="text-body2" v-model="diaColeta" val="ter" label="TER" color="teal"
                      v-if="item.configuracoes.ter" />

                    <q-radio class="text-body2" v-model="diaColeta" val="qua" label="QUA" color="teal"
                      v-if="item.configuracoes.qua" />

                    <q-radio class="text-body2" v-model="diaColeta" val="qui" label="QUI" color="teal"
                      v-if="item.configuracoes.qui" />

                    <q-radio class="text-body2" v-model="diaColeta" val="sex" label="SEX" color="teal"
                      v-if="item.configuracoes.sex" />

                    <q-radio class="text-body2" v-model="diaColeta" val="sab" label="SAB" color="teal"
                      v-if="item.configuracoes.sab" />

                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn dense label="Coletar" color="primary"
                  @click="handleRedirectColetas(item.uuid, aprendizUuidSelecionado)" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </q-dialog>

    <div class="row">
      <q-table :rows="atendimentos" :columns="columns" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6"> Atendimentos </span>
          <q-space />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-play-outline" color="teal" dense size="sm" @click="handleSelectAtendimento(props.row)">
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'atendimento-novo' }" />
    </q-page-sticky>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { columns } from './table';
import { db } from 'src/db';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(false);

const visible = ref(false);

const atendimentos = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const aprendizUuidSelecionado = ref('');

const diaColeta = ref('');

function handleSelectAtendimento(atendimento: any) {
  const raw = toRaw(atendimento);
  aprendizUuidSelecionado.value = raw.aprendiz.value;
  treinamentos.value = raw.treinamentos
  visible.value = true;
}

function handleRedirectColetas(_uuidTreinamento: string, _uuidAprendiz: string) {
  router.push({ name: "coletas", params: { uuidTreinamento: _uuidTreinamento, uuidAprendiz: _uuidAprendiz, diaColeta: diaColeta.value } });
}

onMounted(() => {
  loading.value = true;

  db.atendimentos.toArray().then(res => {
    atendimentos.value = toRaw(res);

    atendimentos.value.forEach((item) => {
      treinamentos.value = toRaw(item.treinamentos)
    });

    loading.value = false;
  })
});
</script>
