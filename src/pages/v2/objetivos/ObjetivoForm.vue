<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <div class="text-h6">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.push({ name: 'objetivos' })"
        />
      </div>
    </template>
    <div class="text-h6 text-orange">Dicas para um bom objetivo</div>
    <ul>
      <li>Seja específico e claro</li>
      <li>Use linguagem simples e objetiva</li>
      <li>Considere a idade da criança</li>
      <li>Use modelos do ABLLS, Portage e VB-MAPP</li>
    </ul>
  </q-banner>

  <div class="text-h6 text-orange q-pa-md">Digite o objetivo</div>

  <q-item>
    <q-item-section top>
      <q-input
        type="textarea"
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
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { useRoute } from 'vue-router';

const { success, error } = useNotify();

const $q = useQuasar();

const alvoService = new AlvoService();

const nomeAlvo = ref('');

const routeLocation = useRoute();

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

onMounted(async () => {
  if (routeLocation.params.objetivoId) {
    try {
      $q.loading.show();
      const { data } = await alvoService.getAlvoById(
        routeLocation.params.objetivoId.toString().trim()
      );

      if (data) {
        nomeAlvo.value = data.nome_alvo;
      }

      //profissionaisSelecionados.value = await buscarProfissionaisVinculados();
    } catch (e) {
      error('');
      throw e;
    } finally {
      $q.loading.hide();
    }
  }
});
</script>
