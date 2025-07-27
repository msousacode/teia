<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <div class="text-h6">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.push({ name: 'aprendizes' })"
        />
      </div>
    </template>
    <div class="text-h6 text-orange">Cadastre uma nova Criança</div>
    <ul>
      <li class="text-subtitle2">
        A criança será compartilhada com os demais Profissionais cadastrados.
      </li>
      <li class="text-subtitle2">
        Atribua os objetivos para as crianças e pontue com as estrelinhas.
      </li>
    </ul>
  </q-banner>

  <div class="text-h6 text-orange q-pa-md">Cadastre a Criança</div>
  <div>
    <q-item>
      <q-item-section top>
        <q-input
          v-model="form.nome_aprendiz"
          placeholder="Informe o nome da criança"
          class="text-h5"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section top>
        <q-input
          placeholder="Informe a data de nascimento"
          v-model="form.nasc_aprendiz"
          class="text-h5"
          mask="##/##/####"
          :rules="[
            (val) =>
              isSubmitted
                ? (val && val.length > 0) || 'Data de nascimento é obrigatório'
                : true,
          ]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="form.nasc_aprendiz"
                  :locale="{
                    days: dias,
                    months: meses,
                    daysShort: diasAbreviados,
                    monthsShort: meses,
                  }"
                  mask="DD/MM/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item-section>
    </q-item>

    <div class="fixed-bottom q-pa-md">
      <q-btn
        class="full-width q-pa-sm"
        outline
        icon="save"
        style="color: green"
        label="Salvar Criança"
        @click="salvar"
      />
    </div>
  </div>

  <!--q-page class="q-pa-sm">
    <title-custom title="Aprendiz" />
    <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">
      <q-form @submit.prevent="submit">
        <q-input
          outlined
          stack-label
          label="Nome do Aprendiz"
          v-model="form.nome_aprendiz"
          :rules="[
            (val) =>
              isSubmitted
                ? (val && val.length > 0) || 'Nome do aprendiz é obrigatório'
                : true,
          ]"
        />

        

        <q-input
          outlined
          stack-label
          label="Nome da Mãe"
          v-model="form.nome_mae"
          class="q-mb-md"
        />

        <q-input
          outlined
          stack-label
          label="Nome do Pai"
          v-model="form.nome_pai"
          class="q-mb-md"
        />

        <q-input
          outlined
          stack-label
          label="Nome do Responsável"
          v-model="form.nome_responsavel"
          class="q-mb-md"
        />

        <q-input
          outlined
          stack-label
          label="Observações"
          v-model="form.observacao"
          type="textarea"
        />

        <div v-if="routeLocation.params.action == 'edit'">
          <div class="text-teal text-h6 q-mt-sm">Profissionais vínculados</div>

          <q-table
            :rows="rows"
            :columns="columns"
            row-key="full_name"
            class="my-sticky-column-table"
            v-model:selected="profissionaisSelecionados"
            selection="multiple"
            :rows-per-page-options="[10]"
            :rows-per-page="10"
          >
          </q-table>
        </div>
      </q-form>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="save" color="green" @click="submit" />
      </q-page-sticky>

      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn
          fab
          icon="mdi-arrow-left"
          color="primary"
          :to="{ name: 'aprendizes' }"
        />
      </q-page-sticky>
    </div>
  </q-page-->
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { v4 as uuid } from 'uuid';
import { useRoute } from 'vue-router';
//import { useAprendizStore } from 'src/stores/aprendiz';
import useNotify from 'src/composables/UseNotify';
import { dias, diasAbreviados, meses } from 'src/composables/utils';
//import { AprendizService } from 'src/services/AprendizService';
import { useQuasar } from 'quasar';
import { AprendizService } from 'src/services/AprendizService';
//import { ProfissionalService } from 'src/services/ProfissionalService';

const aprendizeService = new AprendizService();

//const profissionalService = new ProfissionalService();

//const store = useAprendizStore();

const { success, error } = useNotify();

const $q = useQuasar();

const routeLocation = useRoute();

//const columns = ref<any[]>([]);

//const rows = ref<any[]>([]);

//const profissionaisSelecionados = ref([]);

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
  profissionais: [],
});

async function salvar() {
  //isSubmitted.value = true;

  if (routeLocation.params.action == 'edit') {
    atualizar();
    return;
  }

  form.value.uuid = uuid();

  try {
    $q.loading.show();
    const { status } = await aprendizeService.postAprendiz(form.value);

    if (status == 200) {
      reset();
      success();
    }
  } catch (e) {
    error;
    throw e;
  } finally {
    $q.loading.hide();
  }
}

async function atualizar() {
  try {
    $q.loading.show();

    const object = toRaw(form.value);

    /*
    if (profissionaisSelecionados.value.length > 0) {
      const profissionais = toRaw(profissionaisSelecionados.value);
      object.profissionais = profissionais.map((i) => i.email);
    }*/

    const { data } = await aprendizeService.putAprendiz(object);

    if (data) {
      success('Atualizado com sucesso!');
      reset();
    }
  } catch (e) {
    error;
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
  //store.$reset();
}
/*
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
*/
onMounted(async () => {
  if (routeLocation.params.action === 'edit') {
    try {
      $q.loading.show();
      const { data } = await aprendizeService.getAprendizById(
        routeLocation.params.aprendizId.toString()
      );

      if (data) {
        form.value.uuid = data.uuid || '';
        form.value.nome_aprendiz = data.nome_aprendiz;
        form.value.nasc_aprendiz = data.nasc_aprendiz;
        form.value.nome_mae = data.nome_mae;
        form.value.nome_pai = data.nome_pai;
        form.value.nome_responsavel = data.nome_responsavel;
        form.value.observacao = data.observacao;
      }

      //profissionaisSelecionados.value = await buscarProfissionaisVinculados();
    } catch (e) {
      error('');
      throw e;
    } finally {
      $q.loading.hide();
    }
  }

  //await carregarProfissionais();
});
/*
async function buscarProfissionaisVinculados() {
  const { data } = await aprendizeService.getProfissionaisVinculados(
    store.getAprendizUuid
  );
  return data;
}

columns.value = [
  {
    label: 'Profissional',
    align: 'center',
    field: 'full_name',
  },
  { name: 'actions', align: 'center', label: 'E-mail', field: 'email' },
];

rows.value = [];*/
</script>
