<template>

  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-7 col-xs-12 col-sm-12">

        <q-tabs v-model="tab" dense class="text-grey q-mb-md" active-color="primary" indicator-color="primary"
          align="justify">
          <q-tab name="treinamento" label="Programa" />
          <q-tab name="alvos" label="Objetivos" v-if="store.getTreinamentoUuid" />
          <q-tab name="alvos" label="Objetivos" v-else disable />
        </q-tabs>

        <q-card class="q-pa-md">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="treinamento">
              <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="salvar">
                <title-custom title="Aprendiz" />
                <q-input stack-label outlined label="Nome do Programa" v-model="form.treinamento"
                  :rules="[(val) => (val && val.length > 0) || 'Nome do programa é obrigatório']"
                  class="text-uppercase" />

                <q-select stack-label outlined v-model="form.protocolo" :options="protocolos" label="Tipo de Protocolo"
                  :rules="[(val) => (val && val.length > 0) || 'Tipo de protocolo é obrigatório']" :readonly="editMode"
                  class="text-uppercase" />

                <q-input stack-label outlined label="Descrição do Treinamento" v-model="form.descricao" type="textarea"
                  class="q-mb-md text-uppercase" :rows="18" />

                <div class="q-mt-md q-gutter-x-md row justify-end">
                  <q-btn color="info" :to="{ name: 'treinamentos' }">Voltar</q-btn>
                  <q-btn color="positive" type="submit">Salvar</q-btn>
                </div>
              </q-form>

            </q-tab-panel>

            <q-tab-panel name="alvos">
              <AlvoForm />
            </q-tab-panel>

          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import AlvoForm from './AlvoForm.vue';
import { v4 as uuid } from 'uuid';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { TreinamentoService } from 'src/services/TreinamentoService';
import { useQuasar } from 'quasar';
import TitleCustom from 'src/components/TitleCustom.vue';

const $q = useQuasar();

const treinamentoService = new TreinamentoService();

const { success, error } = useNotify();

const routeLocation = useRoute();

const store = useTreinamentoStore();

const protocolos = ['ABC', 'OCORRÊNCIA DE RESPOSTA', 'SEM PROTOCOLO'];

const tab = ref('treinamento');

const selected = ref<string>('ATENCAO');

const form = ref({
  uuid: '',
  treinamento: '',
  protocolo: '',
  descricao: '',
  habilidade: '',
  sync: false,
  ativo: true,
});

let editMode = ref(routeLocation.params.action === 'edit');

async function salvar() {
  if (editMode.value) {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const object = toRaw(form.value);

  object.habilidade = selected.value;

  $q.loading.show();

  try {
    const { data } = await treinamentoService.postTreinamento(object)

    if (data) {
      store.$state.treinamentoUuid = data.treinamentoId;
      success();
      editMode.value = true;
    }

  } catch (e) {
    error('')
    throw e;
  } finally {
    $q.loading.hide();
  }
}

async function handleUpdate() {

  const object = toRaw(form.value);

  object.habilidade = selected.value;

  try {
    $q.loading.show();
    const { data } = await treinamentoService.putTreinamento(object);

    if (data) {
      store.$state.treinamentoUuid = data.treinamentoId;
      success('Salvo com sucesso!');
      editMode.value = true;
    } else {
      error("Ocorreu um erro ao salvar");
    }

  } catch (e) {
    error('Ocorreu um erro!')
    throw e;
  } finally {
    $q.loading.hide();
  }
}

function reset() {
  form.value = {
    uuid: '',
    treinamento: '',
    protocolo: '',
    descricao: '',
    sync: false,
    ativo: true,
  };

  store.$reset();
}
onMounted(async () => {

  if (routeLocation.params.action === 'edit') {

    try {
      $q.loading.show();
      const { data } = await treinamentoService.getTreinamentoById(store.getTreinamentoUuid);

      if (data) {
        form.value.uuid = data.treinamentoId || '';
        form.value.treinamento = data.treinamento;
        form.value.protocolo = data.protocolo;
        form.value.descricao = data.descricao;
        form.value.sync = data.sync;
      }
    } catch (e) {
      error('')
      throw e;
    } finally {
      $q.loading.hide();
    }
  } else {
    reset();
  }
});
</script>
