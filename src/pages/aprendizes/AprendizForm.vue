<template>
  <q-page class="q-pa-sm">

    <div class="row justify-center">


      <q-form @submit.prevent="submit" class="col-md-7 col-xs-12 col-sm-12">
        <q-card class="q-pa-md">
          <title-custom title="Aprendiz" />

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

          <div v-if="routeLocation.params.action == 'edit'">
            <div class="text-body1 q-mt-md q-mb-md">Profissionais vínculados</div>

            <q-table :rows="rows" :columns="columns" row-key="full_name" class="my-sticky-column-table"
              v-model:selected="profissionaisSelecionados" selection="multiple" :rows-per-page-options="[10]"
              :rows-per-page="10">
            </q-table>
          </div>

          <div class="q-mt-md q-gutter-x-md row justify-end">
            <q-btn color="info" :to="{ name: 'aprendizes' }">Voltar</q-btn>
            <q-btn color="positive" @click="submit">Salvar</q-btn>
          </div>

        </q-card>
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
import { ProfissionalService } from 'src/services/ProfissionalService';

const aprendizeService = new AprendizService();

const profissionalService = new ProfissionalService();

const store = useAprendizStore();

const { success, error } = useNotify();

const $q = useQuasar();

const routeLocation = useRoute();

const columns = ref<any[]>([]);

const rows = ref<any[]>([]);

const profissionaisSelecionados = ref([]);

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
  profissionais: []
});

async function submit() {
  isSubmitted.value = true;

  if (routeLocation.params.action === 'edit') {
    atualizar();
    return;
  }

  form.value.uuid = uuid();

  try {

    const object = toRaw(form.value);

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

    const object = toRaw(form.value);

    if (profissionaisSelecionados.value.length > 0) {
      const profissionais = toRaw(profissionaisSelecionados.value)
      object.profissionais = profissionais.map(i => i.email);
    }

    const { data } = await aprendizeService.putAprendiz(object);

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

async function carregarProfissionais() {
  try {
    const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

    if (!usuarioId) {
      error('Não foi possível localizar o usuário logado.');
      return;
    }

    $q.loading.show();
    const data = await profissionalService.getProfissionais(usuarioId);

    if (data) {
      rows.value = data.data;
    }
  } catch (e) {
    error('Erro ao carregar profissionais');
    throw e;
  } finally {
    $q.loading.hide();
  }
}

onMounted(async () => {
  if (routeLocation.params.action === 'edit') {
    try {
      $q.loading.show();
      const { data } = await aprendizeService.getAprendizById(store.getAprendizUuid);

      if (data) {
        form.value.uuid = data.uuid || '';
        form.value.nome_aprendiz = data.nome_aprendiz;
        form.value.nasc_aprendiz = data.nasc_aprendiz;
        form.value.nome_mae = data.nome_mae;
        form.value.nome_pai = data.nome_pai;
        form.value.nome_responsavel = data.nome_responsavel;
        form.value.observacao = data.observacao;;
      }


      profissionaisSelecionados.value = await buscarProfissionaisVinculados();

    } catch (e) {
      error('')
      throw e;
    } finally {
      $q.loading.hide();
    }
  }

  await carregarProfissionais();
});

async function buscarProfissionaisVinculados() {
  const { data } = await aprendizeService.getProfissionaisVinculados(store.getAprendizUuid);
  return data;

}

columns.value = [
  {
    label: 'Profissional',
    align: 'center',
    field: 'full_name'
  },
  { name: 'actions', align: 'center', label: 'E-mail', field: 'email' },
]

rows.value = [
]
</script>
