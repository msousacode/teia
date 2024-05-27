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
            label="Nome do Treinamento"
            v-model="form.treinamento"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-select
            v-model="form.protocolo"
            :options="protocolos"
            label="Tipo de Protocolo"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />

          <q-input
            label="Descrição do Treinamento"
            v-model="form.descricao"
            type="textarea"
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

      <q-tab-panel name="alvos">
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
import { ref } from 'vue';
import AlvoForm from './AlvoForm.vue';

const protocolos = ['Protocolo ABC', 'Protocolo Ocorrência de Resposta'];

const isUpdate = ref('Salvar');

const tab = ref('treinamento');

const form = ref({
  treinamento: '',
  protocolo: '',
  descricao: '',
});

function handleSubmit() {
  console.log('submit');
}

</script>
