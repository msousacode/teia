<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Plano Atual -->
    <div class="q-ma-md">
      <div class="text-h6 q-mb-md"><b>Seu Plano Atual</b></div>

      <p class="q-pa-none text-body2">
        Você pode cancelar sua assinatura por aqui. Caso precise de assistência ou tenha alguma dúvida, nossa equipe
        está
        à disposição para ajudar!
      </p>
    </div>
    <q-card flat bordered class="my-card q-ma-md bg-grey-3 text-dark">
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

    <!-- Cartão: Plano Pro -->
    <q-card flat bordered class="my-card q-ma-md bg-grey-3">
      <q-card-section class="q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h5 text-blue"><b>PLANO PROFISSIONAL INDIVIDUAL</b></div>
            <div class="text-h5"><b>R$ 99,90/mês</b></div>

            <div class="text-body2 q-mt-sm">
              <q-icon name="event" size="md" color="grey-8" class="q-mr-xs" />
              Cobrado de modo recorrente a cada mês no cartão de crédito
            </div>

            <div class="q-mt-md">
              <q-btn label="Assinar" no-caps color="primary" size="md" class="full-width" @click="assinar()" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Botão: Cancelar Assinatura -->
    <q-btn label="Cancelar Assinatura" no-caps class="q-ma-sm full-width" color="red" flat dense />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { createCheckoutSession } from 'src/services/stripe';
import { StripeService } from 'src/services/stripe/StripeService';
import { UsuarioService } from 'src/services/UsuarioService';

const stripeService = new StripeService();

const usuarioService = new UsuarioService();

const $q = useQuasar();

async function assinar() {
  $q.loading.show();
  const { usuarioId, email } = await usuarioService.getUsuarioInfo();

  const { stripeSubscriptionId } = await stripeService.getUsuarioInfoStripe(email);

  const { url } = await createCheckoutSession(usuarioId, email, stripeSubscriptionId);

  if (url) {
    window.location.href = url;
  }
  $q.loading.hide();
}

</script>
