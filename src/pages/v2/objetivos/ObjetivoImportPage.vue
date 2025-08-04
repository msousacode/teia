<template>
  <q-banner class="bg-grey-3">
    <div class="column q-gutter-sm">
      <div class="row justify-center items-center text-center">
        <div class="text-subtitle2 col-12 col-md-8">
          Selecione e importe os objetivos que deseja trabalhar com a Criança.
        </div>
      </div>

      <div class="row q-gutter-sm items-center justify-center">
        <div class="col-12 col-sm-10 col-md-8">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="searchText"
                outlined
                type="text"
                placeholder="Digite o objetivo"
                class="bg-white"
                style="min-height: 40px"
                dense
              />
            </div>
            <div class="col-auto">
              <q-btn
                class="bg-white"
                outline
                icon="search"
                style="color: blue; min-height: 40px"
                :to="{ name: 'objetivos/cadastro' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-banner>

  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10 col-lg-8">
      <q-card
        v-for="(item, index) in list"
        :key="index"
        class="q-mb-md shadow-2"
        bordered
      >
        <q-item class="row items-center">
          <div class="col-auto q-pr-sm">
            <q-checkbox
              :model-value="objetivosImport.includes(item.alvoId)"
              @update:model-value="selectObjetivo(item)"
            />
          </div>

          <div class="col">
            <q-item-label class="text-grey-8">
              <span class="text-body1">{{ item.nome_alvo }}</span>
            </q-item-label>
          </div>
        </q-item>
      </q-card>
    </div>

    <div class="fixed-bottom q-pa-md">
      <q-btn
        class="full-width q-pa-sm text-white bg-green"
        outline
        icon="save"
        style="color: green"
        label="Confirmar e Importar"
        :disable="objetivosImport.length == 0 || objetivosImport.length > 50"
        @click="importarObjetivos"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import AlvoService from 'src/services/AlvoService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const list = ref<any[]>([]);

const searchText = ref('');

const alvoService = new AlvoService();

const objetivosImport = ref<any[]>([]);

const routeLocation = useRoute();

const aprendizId = ref<string>('');

async function carregarObjetivos() {
  const { data } = await alvoService.getAlvosV2();
  list.value = data;
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
    await carregarObjetivos();
  } catch (error) {
    console.error('Erro ao importar objetivos:', error);
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
