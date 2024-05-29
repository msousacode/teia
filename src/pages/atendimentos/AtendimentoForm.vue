<template>
  <q-dialog v-model="visible">
    <q-card class="my-card">
      <TreinamentoList :selecionar-treinamento="true" />
    </q-card>
  </q-dialog>

  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Atendimento</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12"
        @submit.prevent="handleSubmit"
      >
        <q-select
          outlined
          v-model="form.aprendiz"
          :options="aprendizes"
          label="Selecione o Aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Data Ínicio"
          type="date"
          v-model="form.data_inicio"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-btn
          label="Adicionar Treinamentos"
          color="teal"
          class="full-width q-mb-md"
          rounded
          type="submit"
          @click="visible = true"
        />

        <q-btn
          label="Salvar"
          color="primary"
          class="full-width q-mb-md"
          rounded
          type="submit"
        />

        <q-btn
          label="Voltar"
          color="primary"
          class="full-width q-mb-md"
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
import { liveQuery } from 'dexie';
import TreinamentoList from '../treinamentos/TreinamentoList.vue';

const visible = ref(false);

const store = useAprendizStore();

const routeLocation = useRoute();

const aprendizes = ref<any[]>([]);

const form = ref({
  uuid: '',
  aprendiz: '',
  data_inicio: '',
  aprendiz_uuid_fk: '',
  sync: false,
});

function handleSubmit() {
  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.atendimentos
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
  liveQuery(() => db.aprendizes.toArray()).subscribe((res) => {
    res.forEach((aprendiz) => {
      aprendizes.value.push({
        label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${
          aprendiz.nasc_aprendiz
        }`,
        value: aprendiz.uuid,
      });
    });
  });

  /*     if (routeLocation.params.action === 'edit') {
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
    } */
});
</script>
