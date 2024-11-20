<template>
  <q-page class="q-pa-sm">
    <title-custom title="Aprendiz" />
    <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
      <q-form @submit.prevent="submit">

        <q-input outlined stack-label label="Nome do Aprendiz" v-model="form.nome_aprendiz"
          :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome do aprendiz é obrigatório' : true]" />

        <q-input label="Data de Nasimento" outlined stack-label v-model="form.nasc_aprendiz" mask="##/##/####"
          :rules="[val => isSubmitted ? (val && val.length > 0) || 'Data de nascimento é obrigatório' : true]">
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

        <q-input outlined stack-label label="Nome da Mãe" v-model="form.nome_mae" class="q-mb-md" />

        <q-input outlined stack-label label="Nome do Pai" v-model="form.nome_pai" class="q-mb-md" />

        <q-input outlined stack-label label="Nome do Responsável" v-model="form.nome_responsavel" class="q-mb-md" />

        <q-input outlined stack-label label="Observações" v-model="form.observacao" type="textarea" />

        <div class="fixed-bottom q-pa-md">
          <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" no-caps type="submit"
            :disable="!isSubmitted" />

          <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-sm" no-caps flat
            :to="{ name: 'aprendizes' }" />
        </div>
      </q-form>
    </div>

  </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { v4 as uuid } from 'uuid';
import { useRoute } from 'vue-router';
import { useAprendizStore } from 'src/stores/aprendiz';
import useNotify from 'src/composables/UseNotify';
import TitleCustom from 'src/components/TitleCustom.vue';
import {
  dias,
  diasAbreviados,
  meses
} from 'src/composables/utils';
import { AprendizService } from 'src/services/AprendizService';
import { useQuasar } from 'quasar';

const aprendizeService = new AprendizService();

const store = useAprendizStore();

const { success, error } = useNotify();

const $q = useQuasar();

const routeLocation = useRoute();

let isSubmitted = computed(() => {
  return form.value.nome_aprendiz !== '' && form.value.nasc_aprendiz !== '';
});


const form = ref({
  uuid: '',
  nome_aprendiz: '',
  nasc_aprendiz: '',
  nome_mae: '',
  nome_pai: '',
  nome_responsavel: '',
  observacao: '',
  ativo: true,
});

async function submit() {
  isSubmitted.value = true;

  if (routeLocation.params.action === 'edit') {
    atualizar();
    return;
  }

  form.value.uuid = uuid();

  const object = toRaw(form.value);

  try {
    $q.loading.show();
    const { status } = await aprendizeService.postAprendiz(object);

    if (status == 200) {
      reset();
      success();
    }
  } catch (e) {
    error
    throw e;
  } finally {
    $q.loading.hide();
  }

}

async function atualizar() {
  try {
    $q.loading.show();
    const { data } = await aprendizeService.putAprendiz(toRaw(form.value));

    if (data) {
      success('Atualizado com sucesso!');
      reset();
    }
  } catch (e) {
    error
    throw e;
  } finally {
    $q.loading.hide();
  }
}

function reset() {
  form.value.uuid = '';
  form.value.nome_aprendiz = '';
  form.value.nasc_aprendiz = '';
  form.value.nome_mae = '';
  form.value.nome_pai = '';
  form.value.nome_responsavel = '';
  form.value.observacao = '';
  store.$reset();
}

onMounted(async () => {
  if (routeLocation.params.action === 'edit') {

    $q.loading.show();
    try {
      const { data } = await aprendizeService.getAprendizById(store.getAprendizUuid);

      if (data) {
        form.value.uuid = data.uuid || '';
        form.value.nome_aprendiz = data.nome_aprendiz;
        form.value.nasc_aprendiz = data.nasc_aprendiz;
        form.value.nome_mae = data.nome_mae;
        form.value.nome_pai = data.nome_pai;
        form.value.nome_responsavel = data.nome_responsavel;
        form.value.observacao = data.observacao;
      }

    } catch (e) {
      error('')
      throw e;
    } finally {
      $q.loading.hide();
    }
  }
});
</script>
