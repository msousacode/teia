<template>
  <div class="q-pa-md">

    <q-dialog v-model="visible" header="Aprendizes" modal="true">
      <q-card class="my-card">
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
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.seg">
                      {{ item.configuracoes.seg ? 'SEG' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.ter">
                      {{ item.configuracoes.ter ? 'TER' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.qua">
                      {{ item.configuracoes.qua ? 'QUA' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.qui">
                      {{ item.configuracoes.qui ? 'QUI' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.sex">
                      {{ item.configuracoes.sex ? 'SEX' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.sab">
                      {{ item.configuracoes.sab ? 'SAB' : '' }}
                    </q-chip>
                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn dense label="Coletar" color="primary" :to="{ name: 'coletas' }" />
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
          <q-btn v-if="$q.platform.is.desktop" label="Add New" color="primary" icon="mdi-plus" dense
            :to="{ name: 'form-category' }" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-play-outline" color="teal" dense size="sm" @click="visible = true">
              <q-tooltip> Edit </q-tooltip>
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
//import { useRouter } from 'vue-router';
import { liveQuery } from 'dexie';
import { db } from 'src/db';

//const router = useRouter();

const loading = ref(false);

const visible = ref(false);

const atendimentos = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

onMounted(() => {
  loading.value = true;

  liveQuery(() => db.atendimentos.toArray()).subscribe((res) => {
    atendimentos.value = toRaw(res);

    atendimentos.value.forEach((item) => {
      treinamentos.value = toRaw(item.treinamentos)
    });

    loading.value = false;
  });
});
</script>
