<template>
  <q-page class="q-pa-sm">

    <div class="row justify-center">
      <q-table :rows="aprendizes" :columns="columnsCategory" row-key="id" class="col-md-7 col-xs-12 col-sm-12"
        :rows-per-page-options="[50, 100, 150, 200]" :rows-per-page="50">
        <template v-slot:top>
          <div class="text-h6">Aprendizes</div>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="editar(props.row)">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="remover(props.row)">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>

      </q-table>

    </div>

    <div class="row justify-center">
      <q-card class="q-pa-md q-mt-sm col-md-7 col-xs-12 col-sm-12">
        <div class="q-gutter-x-md row justify-end">
          <q-btn color="secondary" :to="{ name: 'aprendiz-novo' }">Incluir</q-btn>
        </div>
      </q-card>
    </div>

  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { columnsCategory } from './table';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AprendizService } from 'src/services/AprendizService';
import useNotify from 'src/composables/UseNotify';

const aprendizService = new AprendizService();

const store = useAprendizStore();

const aprendizes = ref<any[]>([]);

const { success, error } = useNotify();

const $q = useQuasar();

const router = useRouter();

async function listar() {
  $q.loading.show();
  try {
    const { data } = await aprendizService.getAprendizes();
    aprendizes.value = data;
  } catch (e) {
    error('');
    throw e;
  } finally {
    $q.loading.hide();
  }
}

function editar(aprendiz: any) {
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

      const { status } = await aprendizService.deleteAprendizById(aprendiz.uuid);

      if (status == 200) {
        success('Aprendiz excluído com sucesso!');
        listar();
      }
    })
    .onDismiss(() => { });
}

onMounted(() => {
  listar();
});
</script>
