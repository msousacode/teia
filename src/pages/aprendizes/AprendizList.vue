<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="aprendizes"
        :columns="columnsCategory"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Aprendizes </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category' }"
          />
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
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'aprendiz-novo' }"
      />
    </q-page-sticky>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { columnsCategory } from './table';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useRouter } from 'vue-router';
import { liveQuery } from 'dexie';
import { db } from 'src/db';

const router = useRouter();

const loading = ref(false);

const store = useAprendizStore();

const aprendizes = ref<any[]>([]);

onMounted(() => {
  loading.value = true;

  liveQuery(() => db.aprendizes.toArray()).subscribe((res) => {
    aprendizes.value = res;
    loading.value = false;
  });
});

function handleEdit(aprendiz: any) {
  store.$state.aprendizUuid = aprendiz.uuid;
  router.push({ name: 'aprendiz-novo', params: { action: 'edit' } });
}

function handleRemoveCategory(x: any) {
  console.log(x);
}
</script>
