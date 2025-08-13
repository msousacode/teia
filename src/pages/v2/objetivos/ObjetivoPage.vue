<template>
  <q-banner class="bg-grey-3">
    <div class="column q-gutter-sm">
      <div class="row justify-center text-center">
        <div class="col-12">
          <div class="text-h6 text-grey-7 q-pa-sm">Objetivos</div>
          <div class="text-body2 text-grey-7 q-mt-sm">
            Cadastre novos objetivos e trabalhe com as crianças.
          </div>
        </div>
      </div>

      <div class="row justify-center q-gutter-sm">
        <div class="col-12 col-sm-auto">
          <q-btn
            class="bg-white full-width"
            outline
            icon="add"
            style="color: orange; min-height: 40px"
            label="Adicionar Objetivo"
            :to="{ name: 'objetivos/cadastro' }"
          />
        </div>

        <div class="col-12 col-sm-8 col-md-6">
          <q-input
            v-model="searchText"
            outlined
            type="text"
            placeholder="Digite o objetivo"
            class="bg-white"
            style="min-height: 40px"
            dense
            clearable
          />
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
        <q-item>
          <q-item-section top>
            <q-item-label class="text-grey-8">
              <span class="text-body1">{{ item.nome_alvo }}</span>
              <div v-if="item.tag" class="q-mt-sm">
                <q-chip
                  dense
                  color="pink-4"
                  text-color="white"
                  class="text-uppercase"
                  >{{ item.tag }}</q-chip
                >
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="text-red"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="deletarAlvo(item)"
              />
              <q-btn
                size="12px"
                class="text-blue"
                flat
                dense
                round
                icon="edit"
                :to="{
                  name: 'objetivos/cadastro',
                  params: { action: 'edit', objetivoId: item.alvoId },
                }"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { useObjetivosStore } from 'src/stores/objetivos';
import { onMounted, ref, watch } from 'vue';

const store = ref(useObjetivosStore());

const list = ref<any[]>([]);

const searchText = ref('');

const alvoService = new AlvoService();

const $q = useQuasar();

const { success, error } = useNotify();

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

function deletarAlvo(item: any) {
  $q.dialog({
    title: 'Confirma a exclusão do Alvo?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      await alvoService
        .deletarAlvo(item.alvoId)
        .then(async () => {
          success('Alvo excluído com sucesso!');
          await carregarObjetivos();
        })
        .catch(() => {
          error('Erro ao tentar excluir o alvo.');
        });
    })
    .onDismiss(() => {});
}

async function carregarObjetivos() {
  const { data } = await alvoService.getAlvosV2();
  store.value.setData(data);
  list.value = data;
}

function pesquisar(texto: string | '') {
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
  await carregarObjetivos();
});
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #FFF
</style>
