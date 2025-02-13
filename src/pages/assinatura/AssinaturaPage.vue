<template>
  <q-page class="q-pa-md bg-grey-1">

    <q-dialog v-model="dialogIsCancel">
      <q-card>
        <q-card-section class="q-pa-md text-center">
          <span class="text-body1">Para <b>Cancelar a Assinatura</b> envie um e-mail para:
            sysaba.suporte@gmail.com</span>
          <br />
          <br />
          <span class="text-body1">Adicione o assunto <b>CANCELAR ASSINATURA</b>.</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row justify-center" v-if="!isAssinante">
      <span class="text-h6 text-teal text-center" style="width: 350px;">Para acessar o sistema é necessário
        contratar um dos planos.</span>
      <span class="text-h6 text-teal text-center" style="width: 350px;">Após a contratação o seu acesso será
        liberado.</span>
    </div>

    <div class="q-ma-md">
      <div class="text-h6 q-mb-md text-teal" v-if="isAssinante"><b>Seu Plano Atual</b></div>
    </div>

    <!-- Cartão: Plano Pro -->
    <q-card flat bordered class="my-card q-ma-md bg-grey-3">
      <q-card-section class="q-py-md">
        <q-chip color="green-7" text-color="white" v-if="isAssinante">Ativo</q-chip>
        <div class="row items-center no-wrap">
          <div class="col">

            <div class="wrapper" style="display: flex; justify-content: space-between; width: 100%;">
              <div class="text-h6 text-blue-8"><b>STARTED</b></div>

              <div class="text-h5" style="margin-left: 10px;"><b>R$ 100,00</b>/mês</div>

            </div>

            <div class="text-body2 q-mt-sm">
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Cadastre
                até 5 aprendizes</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Acesse
                todas as
                funcionalidades</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Suporte e
                treinamento</div>
            </div>

            <div class="q-mt-md" v-if="!isAssinante">
              <q-btn label="Assinar" no-caps color="blue-9" size="md" class="full-width" @click="assinar('started')" />
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-ma-md bg-grey-3">
      <q-card-section class="q-py-md">
        <q-chip color="green-7" text-color="white" v-if="isAssinante">Ativo</q-chip>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="wrapper" style="display: flex; justify-content: space-between; width: 100%;">
              <div class="text-h6 text-green-8"><b>PROFISSIONAL</b></div>

              <div class="text-h5" style="margin-left: 10px;"><b>R$ 200,00</b>/mês</div>

            </div>
            <div class="text-body2 q-mt-sm">
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Cadastre
                até 10 aprendizes</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Acesse
                todas as
                funcionalidades</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Suporte e
                treinamento</div>
            </div>

            <div class="q-mt-md" v-if="!isAssinante">
              <q-btn label="Assinar" no-caps color="blue-9" size="md" class="full-width"
                @click="assinar('profissional')" />
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-ma-md bg-grey-3">
      <q-card-section class="q-py-md">
        <q-chip color="green-7" text-color="white" v-if="isAssinante">Ativo</q-chip>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="wrapper" style="display: flex; justify-content: space-between; width: 100%;">
              <div class="text-h6 text-orange-8"><b>CLINIC</b></div>

              <div class="text-h5" style="margin-left: 10px;"><b>R$ 400,00</b>/mês</div>

            </div>
            <div class="text-body2 q-mt-sm">
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Cadastre
                até 20 aprendizes</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Acesse
                todas as
                funcionalidades</div>
              <div class="text-body1"><q-icon name="mdi-arrow-right" size="sm" color="green" class="q-mr-xs" />Suporte e
                treinamento</div>
            </div>

            <div class="q-mt-md" v-if="!isAssinante">
              <q-btn label="Assinar" no-caps color="blue-9" size="md" class="full-width" @click="assinar('clinic')" />
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Botão: Cancelar Assinatura -->
    <q-btn label="Cancelar Assinatura" no-caps class="q-ma-sm full-width" color="red" flat dense v-if="isAssinante"
      @click="dialogIsCancel = true" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { UsuarioAssinaturaInfo } from 'src/models/assinatura.model';
import { createCheckoutSession } from 'src/services/stripe';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $q = useQuasar();

const isAssinante = ref(false);

const { error } = useNotify();

const dialogIsCancel = ref(false);

const routeLocation = useRoute();

const emailUsuario = routeLocation.params.email;

async function assinar(tipoPlano: 'started' | 'profissional' | 'clinic') {

  try {
    $q.loading.show();

    let email = '';

    const usuario: UsuarioAssinaturaInfo = JSON.parse(localStorage.getItem("userInfo") || '');

    if (usuario != null) {
      email = usuario.email;
    } else if (emailUsuario) {
      email = emailUsuario.toString();
    }

    const { url } = await createCheckoutSession(email.toLocaleLowerCase().trim(), tipoPlano);

    if (url) {
      window.location.href = url;
    } else {
      error('Erro ao criar sessão de assinatura.');
    }

  } catch (e) {
    error('Erro stripeSubscription');
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  const usuario: UsuarioAssinaturaInfo = JSON.parse(localStorage.getItem("userInfo")).data;
  isAssinante.value = !usuario.assinatura.tipo_assinatura == 'ASSINANTE';
})

</script>
