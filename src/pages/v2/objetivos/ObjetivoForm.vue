<template>
  <q-item-label header class="text-h6">Cadastro de Objetivos</q-item-label>
  <div>
    <q-item>
      <q-item-section top>
        <q-input
          v-model="nomeAlvo"
          placeholder="Informe o nome do objetivo"
          class="text-h5"
        />
      </q-item-section>
    </q-item>

    <div class="fixed-bottom q-pa-md">
      <q-btn
        icon="save"
        label="Salvar Objetivo"
        color="positive"
        no-caps
        class="full-width q-pa-sm text-h6"
        @click="salvar"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';

const { success, error } = useNotify();
const $q = useQuasar();
const alvoService = new AlvoService();

const nomeAlvo = ref('');

async function salvar() {
  $q.loading.show();

  try {
    const { data } = await alvoService.postAlvo({ nome_alvo: nomeAlvo.value });

    if (data) {
      success('Salvo com sucesso!');
    } else {
      error('Erro ao tentar atualizar.');
    }
  } catch (e) {
    throw e;
  } finally {
    $q.loading.hide();
    nomeAlvo.value = '';
  }
}
</script>
