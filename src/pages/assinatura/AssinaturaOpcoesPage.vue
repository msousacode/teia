<template>

  <div>
    <div class="q-ma-md">
      <span class="text-body1">Assine qualquer plano abaixo para continuar usando o aplicativo SysABA.</span>
      <br><br>
      Cancele quando quiser sem cobranças adicionais.
    </div>

    <q-card flat bordered class="my-card q-ma-md" :class="'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-body2">
              <div class="text-body2 text-pink"><b>PLANO PROxxx</b></div>
              <span class="text-h6">R$ 44,90</span>
            </div>

            <div class="text-body2 q-mt-sm">
              <q-btn label="Assinar" no-caps color="info" style="width: 150px;" @click="assinarMensal" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div>
  </div>

</template>

<script setup lang="ts">


async function assinarMensal() {


}



</script>
