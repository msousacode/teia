<template>
  <div class="q-pa-md">
    <div class="row">
      <q-table :rows="treinamentos" :columns="props.selecionarTreinamento ? visibleColumns : columns" row-key="uuid"
        class="col-12" :loading="loading" selection="multiple" v-model:selected="selected">
        <template v-slot:top>
          <span class="text-h6"> Treinamentos </span>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCategory(props.row)">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <q-btn label="CONFIRMAR" color="primary" class="full-width q-mt-md" rounded @click="handleSelectTreinamentos"
        v-show="props.selecionarTreinamento" v-close-popup />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-show="!props.selecionarTreinamento">
      <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{ name: 'treinamento-novo' }" />
    </q-page-sticky>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { columns, visibleColumns } from './table';
import { db } from 'src/db';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

const { error } = useNotify();

const routeLocation = useRoute();

const editMode = routeLocation.params.action === 'edit';

const loading = ref(false);

const store = useTreinamentoStore();

let treinamentos = ref<any[]>([]);

const selected = ref<any[]>([]);

const props = defineProps<{
  selecionarTreinamento: boolean;
}>();

function handleEdit(treinamento: any) {
  store.$state.treinamentoUuid = treinamento.uuid;
  router.push({ name: 'treinamento-novo', params: { action: 'edit' } });
}

function handleRemoveCategory(x: any) {
  console.log(x);
}

function handleSelectTreinamentos() {
  selected.value.forEach((selected) => {
    selected.new = true;
  });
  store.$state.treinamentosSelecionados.push(...toRaw(selected.value));
}

async function getTreinamentos() {
  await db.treinamentos.toArray().then((res) => {
    treinamentos.value = res;
    loading.value = false;
  }).catch((_error) => {
    error(_error);
  });
}

onMounted(async () => {
  loading.value = true;

  await getTreinamentos();
  if (editMode) {
    store.getTreinamentosSelecionados.forEach((treinamento) => {
      treinamentos.value = treinamentos.value.filter(item => treinamento.uuid !== item.uuid);
    });
  }
});
</script>
