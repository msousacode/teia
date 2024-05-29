<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Aprendiz</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12"
        @submit.prevent="handleSubmit"
      >
        <q-input
          outlined
          label="Nome do Aprendiz"
          v-model="form.nome_aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Nascimento"
          type="date"
          v-model="form.nasc_aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Nome da Mãe"
          v-model="form.nome_mae"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Nome do Pai"
          v-model="form.nome_pai"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Nome do Responsável"
          v-model="form.nome_responsavel"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Observações"
          v-model="form.observacao"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          type="textarea"
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
          :to="{ name: 'aprendizes' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useRoute } from 'vue-router';
import { useAprendizStore } from 'src/stores/aprendiz';

const store = useAprendizStore();

const routeLocation = useRoute();

const form = ref({
  uuid: '',
  nome_aprendiz: '',
  nasc_aprendiz: '',
  nome_mae: '',
  nome_pai: '',
  nome_responsavel: '',
  observacao: '',
  sync: false,
});

function handleSubmit() {
  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.aprendizes
    .add(data)
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar salvar');
    });
}

function handleUpdate() {
  db.aprendizes
    .update(store.getAprendizUuid, toRaw(form.value))
    .then(() => {
      console.log('Atualizado com sucesso');
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar atualizar');
    });
}

onMounted(() => {
  if (routeLocation.params.action === 'edit') {
    db.aprendizes
      .get(store.getAprendizUuid)
      .then((res) => {
        if (res) {
          form.value.uuid = res.uuid || '';
          form.value.nome_aprendiz = res.nome_aprendiz;
          form.value.nasc_aprendiz = res.nasc_aprendiz;
          form.value.nome_mae = res.nome_mae;
          form.value.nome_pai = res.nome_pai;
          form.value.nome_responsavel = res.nome_responsavel;
          form.value.observacao = res.observacao;
          form.value.sync = res.sync;
        }
      })
      .catch(() => {
        throw Error('Ocorreu um erro ao tentar buscar o treinamento');
      });
  }
});
</script>
