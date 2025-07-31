<template>
  <q-banner class="bg-grey-3">
    <div class="row justify-center items-center">
      <ul>
        <li class="text-subtitle2">
          Atribua as estrelinhas para os objetivos e acompanhe a evolução.
        </li>
        <li class="text-subtitle2">
          Ao terminar as coletas, encerre o atendimento e gere o relatório.
        </li>
      </ul>
      <div class="row">
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="add"
          style="color: blue"
          label="Importar"
        />
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="file_download"
          style="color: brown"
          label="Relatório"
        />
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="close"
          style="color: orangered"
          label="Encerrar"
        />
      </div>
    </div>
  </q-banner>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white"> T </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="text-grey-8">
        <span class="text-body1 text-info text-uppercase"
          ><b>Joaozinho Mock</b></span
        >
      </q-item-label>

      <q-item-label>
        <q-icon name="star" color="green-8" size="26px" /> 5
        <q-icon name="star" color="red-8" size="26px" class="q-ml-sm" /> 5
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-tabs v-model="tab" class="text-teal">
    <q-tab name="objetivos" label="Objetivos" />
    <q-tab name="evolucoes" label="Evoluções" />
    <!--<q-tab name="graficos" label="Gráficos" />-->
  </q-tabs>

  <q-tab-panels v-model="tab">
    <q-tab-panel name="objetivos">
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
            <q-item-label>
              <div class="text-grey-8 q-gutter-xs q-mt-sm">
                <q-btn
                  size="12px"
                  label="Concluído"
                  class="bg-green text-white"
                />
                <q-btn
                  size="12px"
                  label="Anotar"
                  class="bg-info text-white"
                  @click="visibleAnotacao = true"
                />
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn size="12px" dense round icon="star" class="text-green-8" />
              +1
              <q-btn
                size="12px"
                dense
                round
                icon="star"
                class="text-red-8 q-ml-md"
              />
              -1
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="evolucoes"> ANOTACAO </q-tab-panel>
  </q-tab-panels>

  <q-dialog v-model="visibleAnotacao" persistent>
    <q-card class="my-card q-pa-md full-width">
      <div class="text-h6 text-teal">Anotação</div>
      <q-card-section>
        <q-input
          outlined
          label="Anotação no alvo"
          v-model="anotacao"
          type="textarea"
          :rules="[
            (val) => (val && val.length > 0) || 'Anotação é obrigatória',
          ]"
          placeholder="Digite sua anotação aqui..."
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Salvar" color="green" no-caps class="full-width" />
        <q-btn
          label="Voltar"
          color="info"
          no-caps
          @click="visibleAnotacao = false"
          class="full-width q-mt-md"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import AlvoService from 'src/services/AlvoService';
import { onMounted, ref } from 'vue';

const tab = ref('objetivos');

const list = ref<any[]>([]);

const alvoService = new AlvoService();

const visibleAnotacao = ref(false);

const anotacao = ref('');

onMounted(async () => {
  const { data } = await alvoService.getAlvosV2();
  list.value = data;
});
</script>
