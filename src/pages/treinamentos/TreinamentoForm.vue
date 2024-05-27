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
      <q-tab name="mails" label="Treino" />
      <q-tab name="alarms" label="Alvos" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        <q-form
          class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
          @submit.prevent="handleSubmit"
        >
          <q-input
            label="Nome do Treinamento"
            v-model="form.nomeCompleto"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-input
            label="Tipo de Protocolo"
            v-model="form.nascimento"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-input
            label="Descrição"
            v-model="form.nomeMae"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-btn
            :label="isUpdate ? 'Update' : 'Save'"
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

      <q-tab-panel name="alarms">
        <AlvoForm />
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<script setup lang="ts">
import AlvoForm from './AlvoForm.vue';

import { ref } from 'vue';

const isUpdate = ref('Update');

const tab = ref('mails');

const form = ref({
  nomeCompleto: '',
  nascimento: '',
  nomeMae: '',
  nomePai: '',
  nomeResponsavel: '',
  observacao: '',
});

function handleSubmit() {
  console.log('submit');
}
</script>
