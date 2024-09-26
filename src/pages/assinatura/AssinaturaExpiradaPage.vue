<template>
  <q-page class="flex-center">


    <div class="q-ma-md text-body1 text-center text-teal">
      <q-avatar color="pink-3" text-color="white" class="q-mt-md" size="88px">
        <q-icon name="mdi-close" />
      </q-avatar>

      <div class="text-black q-mb-md q-mt-md"><b>O seu período de 7 dias grátis expirou.</b></div>
    </div>

    <AssinaturaOpcoesPage />
  </q-page>

</template>

<script setup lang="ts">
import AssinaturaOpcoesPage from './AssinaturaOpcoesPage.vue';
</script>
