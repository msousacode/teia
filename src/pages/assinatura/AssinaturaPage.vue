<template>
  <q-page class="q-pa-md bg-grey-1">

    <div class="row justify-center" v-if="!isAssinante">
      <div class="text-h6 text-teal">Usuário criado com sucesso!</div>
      <q-banner class="bg-blue-1 text-green-9 q-mt-md q-pa-sm text-center">
        <span class="text-h6">Para utilizar o sistema é necessário contratar um Plano.</span></q-banner>
    </div>

    <div class="q-ma-md">
      <div class="text-h6 text-teal q-mb-md" v-if="!isAssinante"><b>Contrate:</b></div>
      <div class="text-h6 q-mb-md text-teal" v-if="isAssinante"><b>Seu Plano Atual</b></div>


      <p class="q-pa-none text-body2" v-if="!isAssinante">
        Você pode contratar sua assinatura por aqui. Caso precise de assistência ou tenha alguma dúvida, nossa equipe
        está
        à disposição para ajudar!
      </p>
    </div>

    <!-- Cartão: Plano Pro -->
    <q-card flat bordered class="my-card q-ma-md bg-grey-3">
      <q-card-section class="q-py-md">
        <q-chip color="green-7" text-color="white">Ativo</q-chip>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5 text-blue"><b>PLANO PROFISSIONAL INDIVIDUAL</b></div>
            <div class="text-h5"><b>R$ 99,90/mês</b></div>

            <div class="text-body2 q-mt-sm">
              <q-icon name="event" size="md" color="grey-8" class="q-mr-xs" />
              Cobrado de modo recorrente a cada mês no cartão de crédito
            </div>

            <div class="q-mt-md" v-if="!isAssinante">
              <q-btn label="Assinar" no-caps color="primary" size="md" class="full-width" @click="assinar()" />
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-ma-md bg-grey-3 text-dark" v-if="!isAssinante">
      <!-- Cartão: Plano Atual -->
      <q-card-section class="q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5 text-blue"><b>PLANO CLÍNICAS</b></div>
            <div class="text-h5 text-primary"><b>SOB CONSULTA</b></div>

            <div class="text-body2 q-mt-sm">
              <q-icon name="event" size="md" color="grey-8" class="q-mr-xs" />
              Cobrado de modo recorrente a cada mês no cartão de crédito, boleto ou pix.
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Botão: Cancelar Assinatura -->
    <q-btn label="Cancelar Assinatura" no-caps class="q-ma-sm full-width" color="red" flat dense v-if="isAssinante" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { UsuarioAssinaturaInfo } from 'src/models/assinatura.model';
import { createCheckoutSession } from 'src/services/stripe';
import { onMounted, ref } from 'vue';

const $q = useQuasar();

const isAssinante = ref(false);

const { error } = useNotify();

async function assinar() {

  try {
    $q.loading.show();

    const usuario: UsuarioAssinaturaInfo = JSON.parse(localStorage.getItem("userInfo") || '');

    const { url } = await createCheckoutSession(usuario.email.toLocaleLowerCase().trim());

    if (url) {
      window.location.href = url;
    }
  } catch (e) {
    error('Erro stripeSubscription');
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  const usuario: UsuarioAssinaturaInfo = JSON.parse(localStorage.getItem("userInfo")).data;
  isAssinante.value = usuario.assinatura.tipo_assinatura == 'ASSINANTE';
})

</script>
