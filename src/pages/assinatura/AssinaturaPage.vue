<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Título -->
    <title-custom title="Minha Assinatura" />

    <!-- Plano Atual -->
    <div class="text-h6 q-mb-md"><b>Seu Plano Atual</b></div>

    <p class="q-pa-none text-body2">
      Você pode cancelar sua assinatura por aqui. Caso precise de assistência ou tenha alguma dúvida, nossa equipe está
      à disposição para ajudar!
    </p>

    <!-- Cartão: Plano Atual -->
    <q-card flat bordered class="my-card q-ma-md bg-light-green-2 text-dark">
      <q-card-section class="q-py-md">
        <q-badge color="green" class="text-subtitle2 q-mb-md q-pa-xs text-dark">
          TESTE GRÁTIS
        </q-badge>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle1"><b>7 dias grátis</b></div>
            <div class="text-h5 text-primary"><b>R$ 0,00</b></div>

            <div class="text-body2 q-mt-sm">
              <q-icon name="event" size="md" color="grey-8" class="q-mr-xs" />
              O período de testes termina em <b>{{ diasRestantesTeste }}</b>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Cartão: Plano Pro -->
    <q-card flat bordered class="my-card q-ma-md bg-grey-2">
      <q-card-section class="q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-body1 text-pink"><b>PLANO PRO</b></div>
            <div class="text-h5 text-dark"><b>R$ 44,90/mês</b></div>

            <div class="q-mt-md">
              <q-btn label="Assinar" no-caps color="primary" size="md" class="full-width" @click="checkoutSession()" />
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
import TitleCustom from 'src/components/TitleCustom.vue';
//import { createCheckoutSession, createStripeCustomer } from 'src/services/stripe';

// Pegando o período de teste do localStorage
const diasRestantesTeste = localStorage.getItem("periodoTeste") || "7 dias";

//TODO aqui eu vou pegar o email do usuário logado.
const user = JSON.parse(localStorage.getItem("user"));

console.log('x', user);

/*async function assinar() {

  const checkoutSession = await createCheckoutSession(user.usuarioId, user.email, '');

}*/


</script>
