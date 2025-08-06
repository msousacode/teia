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

    <div class="text-subtitle2">Seja específico e claro</div>
    <div class="text-subtitle2">Use linguagem simples e objetiva</div>
    <div class="text-subtitle2">Considere a idade da criança</div>
    <div class="text-subtitle2">Use modelos do ABLLS, Portage e VB-MAPP</div>
  </q-banner>

  <div class="text-h6 text-orange q-pa-md">Digite o objetivo</div>

  <q-item>
    <q-item-section top>
      <q-input
        type="textarea"
        v-model="nomeAlvo"
        placeholder="Informe o nome do objetivo"
        class="text-h6"
        :input-style="{ lineHeight: '1.6' }"
        autogrow
      />
    </q-item-section>
  </q-item>

  <div class="text-subtitle2 q-ma-md">
    Esse recurso é usado somente para marcar a origem do objetivo.
  </div>
  <q-card class="q-ma-md">
    <q-card-section>
      <q-option-group
        v-model="tag"
        :options="[
          { label: 'VB-MAPP', value: 'vbmap' },
          { label: 'Portage', value: 'portage' },
          { label: 'ABLLS', value: 'abbls' },
          { label: 'Socially Savvy', value: 'socially' },
          { label: 'Denver', value: 'denver' },
          { label: 'Nenhum', value: null },
        ]"
        color="orange"
        type="radio"
        class="text-body2"
      />
    </q-card-section>
  </q-card>

  <div class="fixed-bottom q-pa-md">
    <q-btn
      class="full-width q-pa-sm text-white bg-green"
      outline
      icon="save"
      style="color: green"
      label="Salvar Objetivo"
      @click="salvar"
      :disable="nomeAlvo.length == 0 || nomeAlvo.length > 500"
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

const tag = ref(null);

async function salvar() {
  $q.loading.show();

  try {
    if (routeLocation.params.objetivoId) {
      await atualizar();
      return;
    }

    const { data } = await alvoService.postAlvo({
      nome_alvo: nomeAlvo.value,
      tag: tag.value,
    });

    if (data) {
      success('Salvo com sucesso!');
    } else {
      error('Erro ao tentar salvar.');
    }
  } catch (e) {
    throw e;
  } finally {
    $q.loading.hide();
    nomeAlvo.value = '';
    tag.value = null;
  }
}

async function atualizar() {
  $q.loading.show();

  try {
    const { data } = await alvoService.putAlvo({
      alvoId: routeLocation.params.objetivoId,
      nome_alvo: nomeAlvo.value,
    });

    if (data) {
      success('Atualizado com sucesso!');
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
