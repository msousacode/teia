<template>
  <q-page padding>

    <div :class="props.selecionarTreinamento ? '' : 'row justify-center'">
      <q-card class="col-md-7 col-xs-12 col-sm-12 q-mb-sm q-pa-md">
        <q-select stack-label outlined v-model="habilidadeFiltro" :options="habilidades" label="Tipo de Habilidade" />
      </q-card>
    </div>

    <div :class="props.selecionarTreinamento ? '' : 'row justify-center text-uppercase'">
      <q-table :rows="treinamentos" :columns="props.selecionarTreinamento ? visibleColumns : columns"
        row-key="treinamentoId" selection="multiple" v-model:selected="selected"
        :class="props.selecionarTreinamento ? '' : 'col-md-7 col-xs-12 col-sm-12'">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil" outline color="info" dense size="sm" @click="handleEdit(props.row)">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" outline color="negative" dense size="sm" @click="deletar(props.row)">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <div :class="props.selecionarTreinamento ? 'q-mt-md row justify-end' : 'q-gutter-x-md row justify-end'">
      <q-btn color="positive" @click="handleSelectTreinamentos" v-show="props.selecionarTreinamento"
        :disable=isConfirm>Incluir</q-btn>
    </div>

    <div :class="props.selecionarTreinamento ? '' : 'row justify-center'" v-show="!props.selecionarTreinamento">
      <q-card class="q-pa-md q-mt-sm col-md-7 col-xs-12 col-sm-12">
        <div class="q-gutter-x-md row justify-end">
          <q-btn color="info" :to="{ name: 'treinamento-import' }" v-if="!props.selecionarTreinamento">banco de
            programas</q-btn>
          <q-btn color="positive" :to="{ name: 'treinamento-novo' }">Incluir</q-btn>
        </div>
      </q-card>
    </div>

  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from 'vue';
import { columns, visibleColumns } from './table';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { TreinamentoService } from 'src/services/TreinamentoService';

//const habilidades = ["TODOS", "ATENCAO", "IMITACAO", "LINGUAGEM_RECEPTIVA", "LINGUAGEM_EXPRESSIVA", "PRE_ACADEMICA"];

const habilidades = ["TODOS", "ATENCAO", "IMITACAO"];

const habilidadeFiltro = ref<string>('');

const { success, error } = useNotify();

const router = useRouter();

const $q = useQuasar();

const treinamentoService = new TreinamentoService();

const store = useTreinamentoStore();

let treinamentos = ref<any[]>([]);

const selected = ref<any[]>([]);

const isConfirm = ref<boolean>(true);

const props = defineProps<{
  selecionarTreinamento: boolean;
}>();

function handleEdit(treinamento: any) {
  store.$state.treinamentoUuid = treinamento.treinamentoId;
  router.push({ name: 'treinamento-novo', params: { action: 'edit' } });
}

function deletar(treinamento: any) {
  $q.dialog({
    title: 'Confirma a exclusão do Treinamento?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      $q.loading.show();

      try {
        const { status } = await treinamentoService.deleteTreinamento(treinamento.treinamentoId);

        if (status == 200) {
          success('Deletado com sucesso!');
          getTreinamentos();
          $q.loading.show();
        } else {
          error('Não foi possível excluir o Treinamento.');
        }
      } catch (e) {
        throw e;
      }
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

watch(selected, (newValue) => {

  const qtdSelecionados = toRaw(newValue).length;

  if (qtdSelecionados == 0) {
    isConfirm.value = true;
    return;
  }

  if (qtdSelecionados > 3) {
    $q.notify({
      message: 'Só é permitido adicionar no máximo 3 treinamentos por programa.',
      textColor: 'black',
      color: 'yellow-7',
      position: 'center',
    });
    isConfirm.value = true;
  } else {
    isConfirm.value = false;
  }

});

async function filtrar() {
  if (habilidadeFiltro.value == 'TODOS') {
    treinamentos.value = await store.$state.treinamentos;
  } else {
    treinamentos.value = store.$state.treinamentos.filter((item) => item.habilidade == habilidadeFiltro.value);
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
