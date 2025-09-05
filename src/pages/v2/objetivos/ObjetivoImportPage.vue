<template>
  <q-banner class="bg-grey-3">
    <div class="column q-gutter-sm">
      <div class="row justify-center items-center text-center">
        <div class="text-body2 text-grey-7 q-mt-md">
          Selecione e importe os objetivos que deseja trabalhar com a Criança.
        </div>
      </div>

      <div class="row q-gutter-sm items-center justify-center">
        <div class="col-12 col-sm-10 col-md-8">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input v-model="searchText" outlined type="text" placeholder="Digite o objetivo" class="bg-white"
                style="min-height: 40px" dense />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-banner>

  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10 col-lg-8">
      <q-card v-for="(item, index) in list" :key="index" class="q-mb-md shadow-2" bordered>
        <q-item class="row items-center">
          <div class="col-auto q-pr-sm">
            <q-checkbox :model-value="objetivosImport.includes(item.alvoId)"
              @update:model-value="selectObjetivo(item)" />
          </div>

          <div class="col">
            <q-item-label class="text-grey-8">
              <span class="text-body1">{{ item.nome_alvo }}</span>
              <div v-if="item.tag" class="q-mt-sm">
                <q-chip dense color="blue-8" text-color="white" class="text-uppercase">{{ item.tag }}</q-chip>
              </div>
            </q-item-label>
          </div>
        </q-item>
      </q-card>

      <q-card-section class="q-pa-xl" v-if="list.length < 1">
        <div class="column items-center q-gutter-md">
          <q-icon name="note_add" size="80px" color="grey-4" />
          <div class="text-h6 text-grey-6">Nenhuma objetivo presente</div>
          <div class="text-body2 text-grey-6 text-center" style="max-width: 400px">
            Aperte o botão abaixo para incluir os objetivos e começar a
            trabalhar com as crianças.
            <div class="col-12 col-sm-auto">
              <q-btn class="bg-white full-width" outline icon="add" style="color: orange; min-height: 40px"
                label="Adicionar Objetivo" :to="{ name: 'objetivos/cadastro' }" />
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
    <div class="fixed-bottom q-pa-md">
      <q-btn class="full-width q-pa-sm text-white bg-green" outline icon="save" style="color: green"
        label="Confirmar e Importar" :disable="objetivosImport.length == 0 || objetivosImport.length > 50"
        @click="importarObjetivos" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { useObjetivosStore } from 'src/stores/objetivos';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const list = ref<any[]>([]);

const searchText = ref('');

const store = ref(useObjetivosStore());

const alvoService = new AlvoService();

const objetivosImport = ref<any[]>([]);

const routeLocation = useRoute();

const aprendizId = ref<string>('');

const { success } = useNotify();

const router = useRouter();

// Sistema de debounce para pesquisa
let searchTimeout: NodeJS.Timeout;

// Watch para detectar mudanças no texto de pesquisa
watch(searchText, (newValue) => {
  // Cancela o timeout anterior se existir
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Define um novo timeout para executar a pesquisa após 500ms
  searchTimeout = setTimeout(() => {
    pesquisar(newValue);
  }, 300);
});

async function carregarObjetivos() {
  const { data } = await alvoService.getAlvosV2();

  if (store.value.getImportadosList.length == 0) {
    store.value.setData(data);
    list.value = data;
  }

  const filteredData = data.filter(i => {
    const isExist = store.value.getImportadosList.findIndex(v => v.alvoPaiId == i.alvoId);
    return isExist === -1;
  });

  store.value.setData(filteredData);
  list.value = filteredData;
}

function selectObjetivo(objetivo: any) {
  const alvoId = objetivo.alvoId;

  const index = objetivosImport.value.indexOf(alvoId);
  if (index > -1) {
    objetivosImport.value.splice(index, 1);
  } else {
    objetivosImport.value.push(alvoId);
  }
}

async function importarObjetivos() {
  try {
    await alvoService.postImportarObjetivos({
      aprendizId: aprendizId.value,
      objetivos: objetivosImport.value,
    });

    // Reset the list after import
    objetivosImport.value = [];
    success('Objetivos importados com sucessos.');

    router.push({ name: 'v2/atendimentos', params: { id: aprendizId.value } });

    await carregarObjetivos();
  } catch (error) {
    console.error('Erro ao importar objetivos:', error);
  }
}

function pesquisar(texto: string = '') {
  if (!texto.trim()) {
    // Se não há texto de pesquisa, mostra todos os dados
    list.value = store.value.data;
  } else {
    // Filtra os dados que contêm o texto pesquisado (case insensitive)
    list.value = store.value.data.filter((item: any) =>
      item.nome_alvo.toLowerCase().includes(texto.toLowerCase())
    );
  }
}

onMounted(async () => {
  aprendizId.value = routeLocation.params.id as string;

  await carregarObjetivos();
});
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #FFF
</style>
