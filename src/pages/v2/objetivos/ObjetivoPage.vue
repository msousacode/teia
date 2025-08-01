<template>
  <q-banner class="bg-grey-3">
    <div class="row justify-center items-center">
      <div class="text-h6 q-pa-sm">Objetivos</div>
      <div class="q-pa-sm q-mb-sm">
        Cadastre novos objetivos e trabalhe com as crianças.
      </div>

      <q-btn
        class="bg-white q-ma-sm"
        outline
        icon="add"
        style="color: orange"
        label="Adicionar Objetivo"
        :to="{ name: 'objetivos/cadastro' }"
      />

      <q-input
        v-model="searchText"
        outlined
        type="text"
        placeholder="Digite o objetivo"
        class="q-ma-sm bg-white"
        style="min-height: 40px"
        dense
      />

      <q-btn
        class="bg-white q-ma-sm"
        outline
        icon="search"
        style="color: blue"
        label="Pesquisar"
        :to="{ name: 'objetivos/cadastro' }"
      />
    </div>
  </q-banner>

  <q-page padding>
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
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { onMounted, ref } from 'vue';

const list = ref<any[]>([]);
const searchText = ref('');

const alvoService = new AlvoService();

const $q = useQuasar();

const { success, error } = useNotify();

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
  list.value = data;
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
