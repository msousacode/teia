<template>
  <div class="q-pa-sm">
    <div class="row">
      <q-table :rows="treinamentos" :columns="props.selecionarTreinamento ? visibleColumns : columns" row-key="uuid"
        class="col-12" selection="multiple" v-model:selected="selected">
        <template v-slot:top>
          <span class="text-h6 text-teal"> Treinamentos </span>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="deletar(props.row)">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>

      <q-btn label="Confirmar" color="green" no-caps class="full-width q-mt-md q-pa-sm"
        @click="handleSelectTreinamentos" v-show="props.selecionarTreinamento" v-close-popup />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-show="!props.selecionarTreinamento">
      <q-btn fab icon="mdi-plus" color="blue" :to="{ name: 'treinamento-novo' }" />
    </q-page-sticky>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { columns, visibleColumns } from './table';
import { db } from 'src/db';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { TreinamentoService } from 'src/services/TreinamentoService';

const { success, error } = useNotify();

const router = useRouter();

const $q = useQuasar();

const treinamentoService = new TreinamentoService();

const store = useTreinamentoStore();

let treinamentos = ref<any[]>([]);

const selected = ref<any[]>([]);

const props = defineProps<{
  selecionarTreinamento: boolean;
}>();

function handleEdit(treinamento: any) {
  store.$state.treinamentoUuid = treinamento.treinamentoId;
  router.push({ name: 'treinamento-novo', params: { action: 'edit' } });
}

function deletar(treinamento: any) {

  $q.dialog({
    title: 'Confirma a exclusão da Anotação?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      $q.loading.show();
      await db.treinamentos.delete(treinamento.uuid).then(() => {
        treinamentos.value = treinamentos.value.filter((item) => item.uuid !== treinamento.uuid);
        success('Deletado com sucesso!');
      }).catch((_error) => {
        error(_error);
      });

      await db.alvos.where({ treinamento_uuid_fk: treinamento.uuid }).delete()
        .then(() => $q.loading.hide())
        .catch((_error) => {
          error(_error);
        });
    })
    .onDismiss(() => { });
}

function handleSelectTreinamentos() {
  selected.value.forEach((selected) => {
    selected.new = true;
  });
  store.$state.treinamentosSelecionados.push(...toRaw(selected.value));
}

async function getTreinamentos() {
  $q.loading.show();

  await treinamentoService.getAll().then((response) => {
    if (response.status == 200) {
      treinamentos.value = response.data.content;
    } else {
      error('Ocorreu um erro.')
    }
    $q.loading.hide();
  }).catch((_error) => {
    $q.loading.hide();
    error(_error);
  });
  $q.loading.hide();

}

onMounted(async () => {
  $q.loading.show();;

  await getTreinamentos();

  store.getTreinamentosSelecionados.forEach((treinamento) => {
    treinamentos.value = treinamentos.value.filter(item => treinamento.uuid !== item.uuid);
  });
});
</script>
