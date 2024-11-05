<template>

  <q-page>
    <title-custom title="Minha Assinatura" />

    <div class="text-body1 q-ma-sm" v-if="isContaFree"><b>Seu plano atual</b></div>

    <p class="q-pa-sm" v-if="!isContaFree">Você pode cancelar sua assinatura por aqui. Caso precise de assistência ou
      tenha alguma dúvida,
      nossa equipe está
      à disposição para ajudar!</p>

    <q-card flat bordered class="my-card q-ma-sm" :class="'bg-green-1'" v-if="isContaFree">
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
              <span class="text-body2">O período de testes termina em {{ diasRestantesTeste }}</span>

              <!--todo quando tiver funcionando as assinaturas colocar um if para apresentar quando será a próxima cobrança-->
              <!--div>A próxima cobrança será em 19 setembro de 2024</div-->
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <AssinaturaOpcoesPage v-if="isContaFree" />

    <q-btn label="Cancelar Assinatura" no-caps v-if="!isContaFree" class="q-ma-sm" color="red-4" />
  </q-page>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
import AssinaturaOpcoesPage from './AssinaturaOpcoesPage.vue';
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue';

const diasRestantesTeste = localStorage.getItem("periodoTeste");

const user = useUserStore();

const isContaFree = ref(user.getState.assinatura == 'FREE');

</script>
