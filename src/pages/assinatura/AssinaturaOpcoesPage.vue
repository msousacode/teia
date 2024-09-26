<template>

  <div class="q-ma-md">
    <span class="text-body1">Assine qualquer plano abaixo para continuar usando o aplicativo SysABA.</span>
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
            <q-btn label="Assinar Anual" no-caps color="green" style="width: 150px;" />
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
            <div class="text-body1">PLANO MENSAL</div>
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
