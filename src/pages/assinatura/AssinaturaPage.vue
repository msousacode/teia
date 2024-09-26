<template>
  <title-custom title="Minha Assinatura" />

  <div class="text-body1 q-ma-sm"><b>Seu plano atual</b></div>
  <q-card flat bordered class="my-card q-ma-sm" :class="'bg-green-1'">
    <q-card-section>
      <q-badge color="green q-mb-md q-pa-sm">
        TESTE GRÁTIS
      </q-badge>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-body2">
            <div class="text-body1">7 dias Grátis</div>
            <span class="text-h6">R$ 0,00</span>
          </div>

          <div class="text-body2 q-mt-sm">
            <div>Teste termina em em 19 setembro de 2024</div>

            <!--todo quando tiver funcionando as assinaturas colocar um if para apresentar quando será a próxima cobrança-->
            <!--div>A próxima cobrança será em 19 setembro de 2024</div-->
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <AssinaturaOpcoesPage />


</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
import AssinaturaOpcoesPage from './AssinaturaOpcoesPage.vue';

</script>
