<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="q-mb-sm col-md-7 col-xs-12 col-sm-12">
        <title-custom title="Suporte" />

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-sm">
              <q-icon name="mdi-information" class="q-mr-sm" />
              Como podemos ajudá-lo?
            </div>
            <p class="text-body2 text-grey-7">
              Nossa equipe de suporte está disponível para esclarecer suas
              dúvidas sobre o sistema SysABA, auxiliar com problemas técnicos e
              orientar sobre o uso das funcionalidades.
            </p>
            <p class="text-body2 text-grey-7">
              Entre em contato conosco através do WhatsApp e receberá
              atendimento personalizado para resolver qualquer questão
              rapidamente.
            </p>
          </q-card-section>
        </q-card>

        <div class="row justify-center q-gutter-x-md q-mt-xl">
          <q-btn
            label="Falar com o Suporte"
            icon="mdi-whatsapp"
            color="green"
            class="q-ma-xs"
            size="md"
            href="https://wa.me/5511977860977"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
</script>
