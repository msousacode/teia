<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="text-h6">SysABA</div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="q-pa-md text-center">
          <span class="text-body1 text-teal">Sua Senha foi Cadastrada com sucesso! <div class="q-mt-md text-black">
              Acesse a tela de
              login e
              realize o
              acesso.</div></span>
          <br />
          <q-btn label="Ir para Login" icon="mdi-arrow-left" color="info" class="full-width q-pa-sm q-mt-sm"
            :to="{ name: 'login' }" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <div class="row justify-center q-mt-lg">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <div class="text-h6 text-teal">Criar Senha</div>
          <q-input outlined v-model="novaSenha" label="Nova senha" stack-label
            :rules="[val => (val && val.length >= 6) || 'Senha obrigatória']" type="password" />

          <q-input outlined v-model="confirmarSenha" label="Confirmar senha" stack-label
            :rules="[val => (val && val.length >= 6) || 'Confirmar senha é obrigatório']" type="password" />

          <q-btn class="full-width bg-primary text-white" no-caps label="Salvar Senha" @click="recuperar" />
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { AcessoService } from 'src/services/AcessoService';
import { useRoute } from 'vue-router';

const $q = useQuasar();

const novaSenha = ref('');

const confirmarSenha = ref('');

const { error } = useNotify();

const showDialog = ref(false);

const acessoService = new AcessoService();

const routeLocation = useRoute();

const userId = routeLocation.params.u;

const keyId = routeLocation.params.k;

async function recuperar() {
  if (novaSenha.value.trim() !== confirmarSenha.value.trim()) {
    error('As senhas não coincidem');
    return;
  }
  try {
    $q.loading.show();

    const payload = {
      senha: novaSenha.value.trim(),
      userId: userId,
      keyId: keyId
    }

    const { status } = await acessoService.resetPassword(payload);

    if (status == 200) {
      showDialog.value = true;
    }

  } catch (e) {
    console.log(e);
    error('Erro ao redefinir senha');
  } finally {
    $q.loading.hide();
  }
}

</script>
