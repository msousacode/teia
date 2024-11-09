<template>

  <div v-show="!mostrarIframe">
    <div class="q-ma-md">
      <span class="text-body1">Assine qualquer plano abaixo para continuar usando o aplicativo SysABA.</span>
      <br><br>
      Cancele quando quiser sem cobranças adicionais.
    </div>
    <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
      <q-card-section>
        <q-badge color="green q-mb-md q-pa-sm">
          ECONOMIA DE 20%
        </q-badge>
        <q-badge color="orange-9 q-mb-md q-pa-sm q-ml-sm">
          MELHOR OPÇÃO
        </q-badge>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-body2">
              <div class="text-body2 text-pink"><b>PLANO ANUAL</b></div>
              <span class="text-h6">R$ 449,00</span>
            </div>

            <div class="text-body2 q-mt-sm">
              <q-btn label="Assinar Anual" no-caps color="info" style="width: 150px;" @click="assinarAnual" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-body2">
              <div class="text-body2 text-pink"><b>PLANO TRIMESTRAL</b></div>
              <span class="text-h6">R$ 134,00</span>
            </div>

            <div class="text-body2 q-mt-sm">
              <q-btn label="Assinar Trimestral" no-caps color="info" style="width: 150px;" @click="assinarTrimestral" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-body2">
              <div class="text-body2 text-pink"><b>PLANO MENSAL</b></div>
              <span class="text-h6">R$ 44,90</span>
            </div>

            <div class="text-body2 q-mt-sm">
              <q-btn label="Assinar Mensal" no-caps color="info" style="width: 150px;" @click="assinarMensal" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>

  <div v-show="mostrarIframe">
    <iframe :src="urlPagamento"></iframe>
  </div>

</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { AsaasService } from 'src/services/AsaasService';
import { ref } from 'vue';

const $q = useQuasar();

const asaasService = new AsaasService();

const mostrarIframe = ref(false);

const urlPagamento = ref('');

function assinarMensal() {
  asaasService.criarLinkPagamento('MONTHLY', 44.90).then(res => {
    $q.loading.show();
    urlPagamento.value = res;
    mostrarIframe.value = true;
    $q.loading.hide();
  }).catch(() => {
    $q.loading.hide();
  });
}

async function assinarTrimestral() {
  await asaasService.criarLinkPagamento('QUARTERLY', 134.00).then(res => {
    $q.loading.show();
    urlPagamento.value = res;
    mostrarIframe.value = true;
    $q.loading.hide();
  }).catch(() => {
    $q.loading.hide();
  });
}

function assinarAnual() {
  asaasService.criarLinkPagamento('YEARLY', 449.00).then(res => {
    $q.loading.show();
    urlPagamento.value = res;
    mostrarIframe.value = true;
    $q.loading.hide();
  }).catch(() => {
    $q.loading.hide();
  });
}

</script>
