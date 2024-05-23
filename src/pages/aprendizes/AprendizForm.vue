<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Aprendiz</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="handleSubmit"
      >
        <q-input
          label="Nome do Aprendiz"
          v-model="form.nomeCompleto"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Nascimento"
          v-model="form.nascimento"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Nome da Mãe"
          v-model="form.nomeMae"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Nome do Pai"
          v-model="form.nomePai"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Nome do Responsável"
          v-model="form.nomeResponsavel"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          label="Observações"
          v-model="form.observacao"
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
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isUpdate = ref('Update');

const form = ref({
  nomeCompleto: '',
  nascimento: '',
  nomeMae: '',
  nomePai: '',
  nomeResponsavel: '',
  observacao: '',
});

async function handleSubmit() {
  console.log('cadastro');
}
</script>
