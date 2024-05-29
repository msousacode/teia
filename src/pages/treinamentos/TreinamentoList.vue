<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="treinamentos"
        :columns="props.selecionarTreinamento ? visibleColumns : columns"
        row-key="uuid"
        class="col-12"
        :loading="loading"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top>
          <span class="text-h6">
            Treinamentos {{ props.selecionarTreinamento }}
          </span>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveCategory(props.row)"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <q-btn
        label="OK"
        color="primary"
        class="full-width q-mt-md"
        rounded
        @click="handleSelectTreinamentos"
        v-show="props.selecionarTreinamento"
      />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'treinamento-novo' }"
      />
    </q-page-sticky>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { columns, visibleColumns } from './table';
import { db } from 'src/db';
import { liveQuery } from 'dexie';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRouter } from 'vue-router';

const router = useRouter();

const loading = ref(false);

const store = useTreinamentoStore();

let treinamentos = ref<any[]>([]);

const selected = ref([]);

const props = defineProps<{
  selecionarTreinamento: boolean;
}>();

onMounted(() => {
  loading.value = true;

  liveQuery(() => db.treinamentos.toArray()).subscribe((res) => {
    treinamentos.value = res;
    loading.value = false;
  });
});

function handleEdit(treinamento: any) {
  store.$state.treinamentoUuid = treinamento.uuid;
  router.push({ name: 'treinamento-novo', params: { action: 'edit' } });
}

function handleRemoveCategory(x: any) {
  console.log(x);
}

function handleSelectTreinamentos() {
  console.log(selected);
}
</script>
