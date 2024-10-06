<template>

  <div class="q-ma-md">
    <span class="text-body1">Assine qualquer plano abaixo para continuar usando o aplicativo SysABA.</span>
    <br><br>
    Cancele quando quiser sem cobranças adicionais.
  </div>

  <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
    <q-card-section>
      <q-badge color="green q-mb-md q-pa-sm">
        20% de DESCONTO
      </q-badge>
      <q-badge color="blue-9 q-mb-md q-pa-sm q-ml-sm">
        MELHOR OPÇÃO
      </q-badge>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-body2">
            <div class="text-body2 text-pink"><b>PLANO ANUAL</b></div>
            <span class="text-h6">R$ 449,00</span>
            <div>Nesse plano será cobrado o valor de <b>R$ 37,41</b> a cada mês pelo período de 12 meses.</div>
          </div>

          <div class="text-body2 q-mt-sm">
            <q-btn label="Assinar Anual" no-caps color="info" style="width: 150px;" />
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
            <q-btn label="Assinar Trimestral" no-caps color="info" style="width: 150px;" />
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
            <q-btn label="Assinar Mensal" no-caps color="info" style="width: 150px;" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>
<script setup lang="ts">

</script>
