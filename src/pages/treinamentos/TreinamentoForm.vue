<template>
  <q-page padding>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="treinamento" label="Treino" />
      <q-tab name="alvos" label="Objetivos" v-if="store.getTreinamentoUuid" />
      <q-tab name="alvos" label="Objetivos" v-else disable />
    </q-tabs>

    <div class="row justify-center">
      <div class="col-md-7 col-xs-12 col-sm-12">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="treinamento">
            <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="salvar">
              <q-input stack-label outlined label="Nome do Treinamento" v-model="form.treinamento"
                :rules="[(val) => (val && val.length > 0) || 'Nome do treinamento é obrigatório']" />

              <q-select stack-label outlined v-model="form.protocolo" :options="protocolos" label="Tipo de Protocolo"
                :rules="[(val) => (val && val.length > 0) || 'Tipo de protocolo é obrigatório']" :readonly="editMode" />


              <q-select stack-label outlined v-model="selected" :options="habilidades" label="Tipo de Habilidade"
                class="q-mb-md" />

              <q-input stack-label outlined label="Descrição do Treinamento" v-model="form.descricao" type="textarea"
                class="q-mb-md" :rows="18" />


              <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" no-caps type="submit" />

              <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" no-caps flat
                :to="{ name: 'treinamentos' }" />

            </q-form>
          </q-tab-panel>

          <q-tab-panel name="alvos">
            <AlvoForm />
          </q-tab-panel>

        </q-tab-panels>
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

const $q = useQuasar();

const treinamentoService = new TreinamentoService();

const { success, error } = useNotify();

const routeLocation = useRoute();

const store = useTreinamentoStore();

const protocolos = ['Protocolo ABC', 'Protocolo Ocorrência de Resposta'];

const tab = ref('treinamento');

const habilidades = ["ATENCAO", "IMITACAO", "LINGUAGEM_RECEPTIVA", "LINGUAGEM_EXPRESSIVA", "PRE_ACADEMICA", "MEMORIA", "COORDENACAO", "RACIOCINIO", "SOCIALIZACAO", "AUTOAJUDDA"];

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
