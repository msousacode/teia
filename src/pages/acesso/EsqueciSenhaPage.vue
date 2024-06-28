<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="text-h6">SysABA</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row justify-center q-mt-lg">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-banner v-if=mostarMensagemSucesso class="bg-blue-1 text-green-9 q-mb-md q-pa-sm">
            <span class="text-body1">Verifique o seu email e siga as instruções para
              recuperar a sua
              senha.</span></q-banner>
          <div class="text-h6 text-teal">Recuperação de Senha</div>
          <q-input outlined v-model="email" label="E-mail" stack-label />

          <div class="full-width">
            <q-btn class="full-width bg-primary text-white" label="Recuperar senha" @click="recuperar" />
          </div>

          <div class="full-width">
            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/" label="Voltar"
              no-caps />
          </div>
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAuth from 'src/composables/useAuth';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const auth = useAuth();

const email = ref('');

const mostarMensagemSucesso = ref(false);

async function recuperar() {
  $q.loading.show();
  try {
    await auth.sendPasswordRestEmail(email.value.trim());
    email.value = '';
    mostarMensagemSucesso.value = true;
    $q.loading.hide();
  } catch (error) {
    useNotify().error('Erro ao enviar e-mail', error);
    $q.loading.hide();
  }
}
</script>
