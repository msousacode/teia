<template>
  <q-page class="q-pa-md bg-grey-1">

    <div class="row justify-center" v-if="!isAssinante">
      <span class="text-h6 text-center text-teal q-mt-md">Contrate um plano para acessar o
        Sistema.
        <br /> Após a contratação o seu acesso será
        liberado.</span>
    </div>

    <q-dialog v-model="dialogIsCancel">
      <q-card>
        <q-card-section class="q-pa-md text-center">
          <div class="text-body1">Ao clicar em <b>CONFIRMAR</b> a sua assinatura será <b>CANCELADA</b> e novas cobranças
            serão imediatamente suspensas.
          </div>
          <br />
          <div class="text-body1">Deseja prosseguir com o Cancelamento?</div>
          <br />
          <br />
          <div class="q-gutter-x-md">
            <q-btn color="grey-8">Desistir</q-btn>
            {{ emailUsuario }}
            <q-btn color="blue-8"
              :href="`https://wa.me/5511977860977?text=Quero Cancelar-${emailCancelamento}`">Confimar</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-ma-md">
      <div class="text-body1 q-mb-md text-teal text-center" v-if="isAssinante"><b>Sua Assinatura encontra-se
          ativa e você pode cancelar a
          qualquer
          momento.</b></div>
    </div>

    <!-- Cartão: Plano Pro -->
    <q-card flat bordered class="my-card q-ma-md bg-grey-3" v-if="!isAssinante">
      <q-card-section class="q-py-md">

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

    <q-card flat bordered class="my-card q-ma-md bg-grey-3" v-if="!isAssinante">
      <q-card-section class="q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="wrapper" style="display: flex; justify-content: space-between; width: 100%;">
              <div class="text-h6 text-green-8"><b>PLUS</b></div>

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

    <q-card flat bordered class="my-card q-ma-md bg-grey-3" v-if="!isAssinante">
      <q-card-section class="q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="wrapper" style="display: flex; justify-content: space-between; width: 100%;">
              <div class="text-h6 text-orange-8"><b>PRO</b></div>

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
    <q-btn label="DESEJO CANCELAR A MINHA ASSINATURA" icon="cancel" class="q-ma-sm full-width" color="pink-5"
      @click="dialogIsCancel = true" v-if="isAssinante" />

    <q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="isAssinante">
      <q-btn fab icon="mdi-arrow-left" color="primary" :to="{ name: 'relatorios' }" />
    </q-page-sticky>
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

const emailCancelamento = ref<string>();

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
  emailCancelamento.value = usuario.email;
  isAssinante.value = usuario.assinatura.tipo_assinatura == 'ASSINANTE';
})

</script>
