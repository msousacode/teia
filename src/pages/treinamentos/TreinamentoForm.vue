<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="treinamento" label="Treino" />
      <q-tab name="alvos" label="Alvos" v-if="store.getTreinamentoUuid" />
      <q-tab name="alvos" label="Alvos" v-else disable />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="treinamento">
        <q-form
          class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
          @submit.prevent="handleSubmit"
        >
          <q-input
            outlined
            label="Nome do Treinamento"
            v-model="form.treinamento"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-select
            outlined
            v-model="form.protocolo"
            :options="protocolos"
            label="Tipo de Protocolo"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-input
            outlined
            label="Descrição do Treinamento"
            v-model="form.descricao"
            type="textarea"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-btn
            label="Salvar"
            color="primary"
            class="full-width"
            rounded
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'treinamentos' }"
          />
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

function handleSubmit() {
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
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar salvar');
    });
}

function handleUpdate() {
  db.treinamentos
    .update(store.getTreinamentoUuid, toRaw(form.value))
    .then(() => {
      console.log('Atualizado com sucesso');
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar atualizar');
    });
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
      .catch(() => {
        throw Error('Ocorreu um erro ao tentar buscar o treinamento');
      });
  }
});
</script>
