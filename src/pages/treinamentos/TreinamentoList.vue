<template>
  <div class="q-pa-sm">

    <div class="q-my-sm justify-start">
      <q-select stack-label outlined v-model="habilidadeFiltro" :options="habilidades" label="Tipo de Habilidade" />
    </div>

    <div class="row">
      <q-table :rows="treinamentos" :columns="props.selecionarTreinamento ? visibleColumns : columns"
        row-key="treinamentoId" class="col-12" selection="multiple" v-model:selected="selected">
        <template v-slot:top>
          <span class="text-h6 text-teal"> Programas </span>
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

    <div class="q-my-md flex justify-center" v-show="!props.selecionarTreinamento">
      <div class="q-mt-md text-body2">
        (*) Você pode importar programas prontos do nosso banco de programas.
      </div>
    </div>

    <div class="q-pa-md q-gutter-md flex justify-center" v-if="!props.selecionarTreinamento">
      <q-btn label="Acessar Banco de Programas" color="info" class="q-pa-sm" no-caps
        :to="{ name: 'treinamento-import' }" />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-show="!props.selecionarTreinamento">
      <q-btn fab icon="mdi-plus" color="blue-9" :to="{ name: 'treinamento-novo' }" />
    </q-page-sticky>

  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue';
import { columns, visibleColumns } from './table';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { TreinamentoService } from 'src/services/TreinamentoService';

const habilidades = ["TODOS", "ATENCAO", "IMITACAO", "LINGUAGEM_RECEPTIVA", "LINGUAGEM_EXPRESSIVA", "PRE_ACADEMICA", "MEMORIA", "COORDENACAO", "RACIOCINIO", "SOCIALIZACAO", "AUTOAJUDDA"];

const habilidadeFiltro = ref<string>('');

const { error } = useNotify();

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
  console.log(treinamento)

  $q.dialog({
    title: 'Confirma a exclusão do Treinamento?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      $q.loading.show();

      /* TODO fazer esse 
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
        });*/
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
  try {
    $q.loading.show();
    const { data } = await treinamentoService.getTreinamentos();
    treinamentos.value = data;
    store.$state.treinamentos = data;
  } catch (e) {
    error('');
    throw e;
  } finally {
    $q.loading.hide();
  }
}

watch(habilidadeFiltro, () => {
  filtrar();
});

async function filtrar() {
  if (habilidadeFiltro.value == 'TODOS') {
    treinamentos.value = await store.$state.treinamentos;
  } else {
    treinamentos.value = treinamentos.value.filter((item) => item.habilidade == habilidadeFiltro.value);
  }
  return treinamentos.value
}


onMounted(() => {
  getTreinamentos();
  store.getTreinamentosSelecionados.forEach((treinamento) => {
    treinamentos.value = treinamentos.value.filter(item => treinamento.treinamentoId !== item.treinamentoId);
  });
});
</script>
