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
          <q-input outlined label="Nome do Treinamento" v-model="form.treinamento"
            :rules="[(val) => (val && val.length > 0) || 'Nome do treinamento é obrigatório']" />

          <q-select outlined v-model="form.protocolo" :options="protocolos" label="Tipo de Protocolo"
            :rules="[(val) => (val && val.length > 0) || 'Tipo de protocolo é obrigatório']" />

          <q-input outlined label="Descrição do Treinamento" v-model="form.descricao" type="textarea" class="q-mb-md" />

          <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit" />

          <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
            :to="{ name: 'treinamentos' }" />
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
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

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
});

function salvar() {
  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.treinamentos
    .add(data)
    .then((res) => {
      store.$state.treinamentoUuid = res;
      success();
    })
    .catch((_error) => {
      error(_error);
    });
}

function handleUpdate() {
  db.treinamentos
    .update(store.getTreinamentoUuid, toRaw(form.value))
    .then(() => {
      reset();
      success();
    })
    .catch((_error) => {
      error('Ocorreu um erro ao tentar atualizar o treinamento', _error);
    });
}

function reset() {
  form.value = {
    uuid: '',
    treinamento: '',
    protocolo: '',
    descricao: '',
    sync: false,
  };

  store.$reset();
}
onMounted(() => {
  if (routeLocation.params.action === 'edit') {
    db.treinamentos
      .get(store.getTreinamentoUuid)
      .then((res) => {
        if (res) {
          form.value.uuid = res.uuid || '';
          form.value.treinamento = res.treinamento;
          form.value.protocolo = res.protocolo;
          form.value.descricao = res.descricao;
          form.value.sync = res.sync;
        }
      })
      .catch((_error) => {
        error('Erro ao tentar consultar os treinamentos', _error);
      });
  }
});
</script>
