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
          <q-banner class="bg-blue-1 text-green-9 q-mb-md q-pa-sm">
            <span class="text-body1">Verifique o seu email e siga as instruções para
              recuperar a sua
              senha.</span></q-banner>
          <div class="text-h6 text-teal">Recuperação de Senha</div>
          <q-input outlined v-model="novaSenha" label="Nova senha" stack-label
            :rules="[val => (val && val.length >= 6) || 'Senha obrigatória']" />

          <q-input outlined v-model="confirmarSenha" label="Confirmar senha" stack-label
            :rules="[val => (val && val.length >= 6) || 'Confirmar senha é obrigatório']" />

          <q-btn class="full-width bg-primary text-white" no-caps label="Salvar nova senha" @click="recuperar" />
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
import { useRouter } from 'vue-router';

const $q = useQuasar();

const { success } = useNotify();

const router = useRouter();

const auth = useAuth();

const novaSenha = ref('');

const confirmarSenha = ref('');

async function recuperar() {
  if (novaSenha.value.trim() !== confirmarSenha.value.trim()) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'report_problem',
      message: 'As senhas não coincidem',
    });
    return;
  }
  $q.loading.show();
  try {
    await auth.resetPassword(novaSenha.value.trim())
    $q.loading.hide();
    success('Senha redefinida com sucesso');
    router.push({ name: 'login' })
  } catch (error) {
    $q.loading.show();
    console.log(error);
  }
}
</script>
