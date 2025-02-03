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
            <span class="text-body1">Confira seu email e siga as orientações para criar a senha.</span></q-banner>
          <div class="text-h6 text-teal">Recuperação de Senha</div>
          <q-input outlined v-model="email" label="E-mail" stack-label />

          <div class="full-width">
            <q-btn class="full-width bg-primary text-white q-pa-sm" no-caps label="Recuperar senha"
              @click="recuperar" />
          </div>

          <div class="full-width">
            <q-btn class="full-width text-teal" color="white" text-color="blue-9" unelevated to="/" label="Voltar"
              no-caps />
          </div>
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { AcessoService } from 'src/services/AcessoService';
import useNotify from 'src/composables/UseNotify';

const $q = useQuasar();

const { error } = useNotify();

const email = ref('');

const mostarMensagemSucesso = ref(false);

const service = new AcessoService();

async function recuperar() {
  $q.loading.show();

  try {
    const { data } = await service.esqueciMinhaSenha(email.value.toLocaleLowerCase().trim()); data

    if (data == "Ok") {
      mostarMensagemSucesso.value = true;
      email.value = '';
    } else {
      error('Erro ao recuperar a senha contate o Suporte.');
    }

  } catch (e) {
    error('Erro ao recuperar a senha contate o Suporte.');
  } finally {
    $q.loading.hide();
  }

}
</script>
