<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Aprendiz</p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="submit">
        <q-input outlined label="Nome do Aprendiz" v-model="form.nome_aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Nome do aprendiz é obrigatório']" />

        <q-input label="Data de Nasimento" outlined v-model="form.nasc_aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Data de nascimento é obrigatório']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.nasc_aprendiz" :locale="{
        days: dias,
        months: meses,
        daysShort: diasAbreviados,
        monthsShort: meses,
      }" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input outlined label="Nome da Mãe" v-model="form.nome_mae" class="q-mb-md" />

        <q-input outlined label="Nome do Pai" v-model="form.nome_pai" class="q-mb-md" />

        <q-input outlined label="Nome do Responsável" v-model="form.nome_responsavel" class="q-mb-md" />

        <q-input outlined label="Observações" v-model="form.observacao" type="textarea" class="q-mb-md" />

        <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit" />

        <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat :to="{ name: 'aprendizes' }" />
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
import useNotify from 'src/composables/UseNotify';
import {
  dias,
  diasAbreviados,
  meses
} from 'src/composables/utils';

const { success, error } = useNotify();

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

function submit() {
  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.aprendizes
    .add(data)
    .then(() => {
      success();
    })
    .catch((error) => {
      error(error)
    });
}

function handleUpdate() {
  db.aprendizes
    .update(store.getAprendizUuid, toRaw(form.value))
    .then(() => {
      reset();
      success();
    })
    .catch(() => {
      error('Ocorreu um erro ao tentar atualizar o aprendiz');
    });
}

function reset() {
  form.value = {
    uuid: '',
    nome_aprendiz: '',
    nasc_aprendiz: '',
    nome_mae: '',
    nome_pai: '',
    nome_responsavel: '',
    observacao: '',
    sync: false,
  };

  store.$reset();
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
      .catch((error) => {
        error(error);
      });
  }
});
</script>
