<template>
  <div class="q-pa-md">
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
            <q-btn icon="mdi-play-outline" label="iniciar" color="teal" dense size="sm" @click="handleEdit(props.row)">
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
import { onMounted, ref } from 'vue';
import { columns } from './table';
//import { useAtendimentoStore } from 'src/stores/atendimento';
import { useRouter } from 'vue-router';
import { liveQuery } from 'dexie';
import { db } from 'src/db';

const router = useRouter();

const loading = ref(false);

//const store = useAtendimentoStore();

const atendimentos = ref<any[]>([]);

function handleEdit(aprendiz: any) {
  console.log(aprendiz);
  //store.$state.aprendizUuid = aprendiz.uuid;
  router.push({ name: 'aprendiz-novo', params: { action: 'edit' } });
}

onMounted(() => {
  loading.value = true;

  liveQuery(() => db.atendimentos.toArray()).subscribe((res) => {
    atendimentos.value = res;
    loading.value = false;
  });
});
</script>
