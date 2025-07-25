<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white"> T </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="text-grey-8">
        <span class="text-h6 text-info text-uppercase">Joaozinho Mock</span>
      </q-item-label>

      <q-item-label>
        <q-icon name="star" color="green-8" size="24px" /> 5
        <q-icon name="star" color="red-8" size="24px" class="q-ml-sm" /> 5
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-tabs v-model="tab" class="text-teal">
    <q-tab name="objetivos" label="Objetivos" />
    <q-tab name="evolucoes" label="Evoluções" />
  </q-tabs>

  <q-tab-panels v-model="tab">
    <q-tab-panel name="objetivos">
      <q-item v-for="(item, index) in list" :key="index">
        <q-item-section top>
          <q-item-label lines="1" class="text-grey-8">
            <span class="text-h6">{{ item.nome_alvo }}</span>
          </q-item-label>
          <q-item-label>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                size="12px"
                label="Concluído"
                dense
                class="bg-green text-white"
              />
              <q-btn
                size="12px"
                label="Anotar"
                dense
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

        <q-item-section side> </q-item-section>
      </q-item>
    </q-tab-panel>
    <q-tab-panel name="evolucoes"> ANOTACAO </q-tab-panel>
  </q-tab-panels>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" class="bg-green-8 text-white" />
  </q-page-sticky>

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
