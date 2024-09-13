<template>
  <title-custom title="Minha Assinatura" />

  <div class="text-body1 q-ma-sm"><b>Seu plano</b></div>
  <q-card flat bordered class="my-card q-ma-sm" :class="'bg-grey-2'">
    <q-card-section>
      <q-badge color="green q-mb-md q-pa-sm">
        TESTE GRÁTIS
      </q-badge>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-body2">
            <div class="text-body1">Mensal</div>
            <span class="text-h6">R$ 44,90</span>
          </div>

          <div class="text-body2 q-mt-sm">
            <div>A próxima cobrança será em 19 setembro de 2024</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <div class="q-ma-sm">
    <q-btn label="Gerenciar Assinatura" no-caps color="info" class="full-width" />
  </div>

</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';

</script>
