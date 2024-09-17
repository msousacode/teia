<template>
  <title-custom title="Minha Assinatura" />

  <div class="text-body1 q-ma-sm"><b>Seu plano atual</b></div>
  <q-card flat bordered class="my-card q-ma-sm" :class="'bg-grey-2'">
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

  <div class="q-ma-md text-body2">
    Assine qualquer plano abaixo para continuar usando o aplicativo após o período de teste.
    <br><br>
    Cancele quando quiser sem cobranças adicionais.
  </div>

  <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
    <q-card-section>
      <q-badge color="orange-9 q-mb-md q-pa-sm">
        20% de DESCONTO
      </q-badge>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-body2">
            <div class="text-body1">PLANO ANUAL</div>
            <span class="text-h6">R$ 449,00</span>
          </div>

          <div class="text-body2 q-mt-sm">
            <q-btn label="Assinar Anual" no-caps color="green" />
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
            <div class="text-body1">PLANO TRIMESTRAL</div>
            <span class="text-h6">R$ 134,00</span>
          </div>

          <div class="text-body2 q-mt-sm">
            <q-btn label="Assinar Trimestral" no-caps color="info" />
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
            <div class="text-body1">PLANO MENSAL</div>
            <span class="text-h6">R$ 44,90</span>
          </div>

          <div class="text-body2 q-mt-sm">
            <q-btn label="Assinar Mensal" no-caps color="info" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';

</script>
