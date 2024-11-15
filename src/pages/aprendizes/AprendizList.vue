<template>
  <q-page class="q-pa-sm">

    <div class="row">
      <q-table :rows="aprendizes" :columns="columnsCategory" row-key="id" class="col-12"
        :rows-per-page-options="[50, 100, 150, 200]" :rows-per-page="50">
        <template v-slot:top>
          <div class="text-h6 text-teal">Aprendizes</div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="remover(props.row)">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile || $q.platform.is.desktop" fab icon="mdi-plus" color="blue"
        :to="{ name: 'aprendiz-novo' }" />
    </q-page-sticky>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { columnsCategory } from './table';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useRouter } from 'vue-router';
import { db } from 'src/db';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { AprendizService } from 'src/services/AprendizService';

const $q = useQuasar();

const { success, error } = useNotify();

const router = useRouter();

const store = useAprendizStore();

const aprendizes = ref<any[]>([]);

const aprendizService = new AprendizService();

async function carregarLista() {
  $q.loading.show();
  await aprendizService.buscar().then((response) => {
    if (response.status == 200) {
      aprendizes.value = response.data.content;
    } else {
      error('Ocorreu um erro.')
    }
    $q.loading.hide();
  }).catch((_error) => {
    error(_error);
    $q.loading.hide();
  });
}

function handleEdit(aprendiz: any) {
  store.$state.aprendizUuid = aprendiz.uuid;
  router.push({ name: 'aprendiz-novo', params: { action: 'edit' } });
}

function remover(aprendiz: any) {
  $q.dialog({
    title: 'Confirma a exclusão do Aprendiz?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      db.aprendizes.update(aprendiz.uuid, { ativo: false }).then(() => {
        carregarLista();
        success("Aprendiz excluído com sucesso");
      }).catch(() => {
        error("Ocorreu um erro ao excluir");
      });
    })
    .onDismiss(() => { });
}

onMounted(() => {
  carregarLista();
});
</script>
