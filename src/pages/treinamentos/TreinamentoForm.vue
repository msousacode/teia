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
      <q-tab name="alvos" label="Alvos" />
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
            :label="isUpdate ? 'Salvar' : 'Atualizar'"
            color="primary"
            class="full-width"
            rounded
            type="submit"
          />

          <q-btn
            label="Cancel"
            color="primary"
            class="full-width"
            rounded
            flat
            :to="{ name: 'aprendizes' }"
          />
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="alvos">
        <AlvoForm :treinamento-uuid="form.uuid" />
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script setup lang="ts">
import { ref, toRaw } from 'vue';
import AlvoForm from './AlvoForm.vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';

const protocolos = ['Protocolo ABC', 'Protocolo Ocorrência de Resposta'];

const isUpdate = ref('Salvar');

const tab = ref('treinamento');

const form = ref({
  uuid: '',
  treinamento: '',
  protocolo: '',
  descricao: '',
  sync: false,
});

function handleSubmit() {
  form.value.uuid = uuid();  

  const data = toRaw(form.value);

  db.treinamentos
    .add(data)
    .then((res) => {
      form.value = res;
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar salvar');
    });
}
</script>
