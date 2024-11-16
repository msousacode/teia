<template>
  <q-page padding>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="treinamento" label="Treino" />
      <q-tab name="alvos" label="Objetivos" v-if="store.getTreinamentoUuid" />
      <q-tab name="alvos" label="Objetivos" v-else disable />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="treinamento">
        <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="salvar">
          <q-input stack-label outlined label="Nome do Treinamento" v-model="form.treinamento"
            :rules="[(val) => (val && val.length > 0) || 'Nome do treinamento é obrigatório']" />

          <q-select stack-label outlined v-model="form.protocolo" :options="protocolos" label="Tipo de Protocolo"
            :rules="[(val) => (val && val.length > 0) || 'Tipo de protocolo é obrigatório']" :readonly="editMode" />

          <q-input stack-label outlined label="Descrição do Treinamento" v-model="form.descricao" type="textarea"
            class="q-mb-md" :rows="18" />

          <div class="fixed-bottom q-pa-md">
            <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" no-caps type="submit" />

            <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" no-caps flat
              :to="{ name: 'treinamentos' }" />
          </div>
        </q-form>
      </q-tab-panel>


      <q-tab-panel name="alvos">
        <AlvoForm />
      </q-tab-panel>

    </q-tab-panels>
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

const form = ref({
  uuid: '',
  treinamento: '',
  protocolo: '',
  descricao: '',
  sync: false,
  ativo: true,
});

let editMode = ref(routeLocation.params.action === 'edit');

function salvar() {
  if (editMode.value) {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);
  console.log('treinamento', data)

  $q.loading.show();

  treinamentoService.salvar(data).then((response) => {
    if (response.status == 200) {
      store.$state.treinamentoUuid = response.data.treinamentoId;
      success();
      editMode.value = true;
    } else {
      error("Ocorreu um erro ao salvar");
    }

    $q.loading.hide();
  }).catch((_error) => {
    error(_error);
  });
}

function handleUpdate() {

  const data = toRaw(form.value);

  treinamentoService.atualizar(data).then((response) => {
    if (response.status == 200) {
      store.$state.treinamentoUuid = response.data.treinamentoId;
      success();
      editMode.value = true;
    } else {
      error("Ocorreu um erro ao salvar");
    }

    $q.loading.hide();
  }).catch((_error) => {
    error(_error);
  });
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
onMounted(() => {

  if (routeLocation.params.action === 'edit') {
    treinamentoService.get(store.getTreinamentoUuid)
      .then((response) => {

        if (response.data) {
          form.value.uuid = response.data.treinamentoId || '';
          form.value.treinamento = response.data.treinamento;
          form.value.protocolo = response.data.protocolo;
          form.value.descricao = response.data.descricao;
          form.value.sync = response.data.sync;
        }
      })
      .catch((_error) => {
        error('Erro ao tentar consultar os treinamentos', _error);
      });
  } else {
    reset();
  }
});
</script>
