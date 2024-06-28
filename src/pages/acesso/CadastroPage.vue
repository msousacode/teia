<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="text-h6">SysABA</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row justify-center q-mt-md">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">

          <section>
            <q-input class="q-mt-md" outlined v-model="formCadastro.nome" label="Nome Completo" stack-label />

            <q-input type="email" class="q-mt-md" outlined v-model="formCadastro.email" label="E-mail" stack-label />

            <q-input type="password" class="q-mt-md" outlined v-model="formCadastro.senha" label="Senha" stack-label />

            <q-input type="password" class="q-mt-md" outlined v-model="formCadastro.senhaConfirmada"
              label="Confirme a senha" stack-label />
          </section>

          <div class="full-width q-mt-md">
            <q-btn class="q-px-xl q-py-xs full-width bg-primary text-white" label="Cadastrar" @click="cadastrar()" />

            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/" label="Voltar"
              no-caps />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import useNotify from 'src/composables/UseNotify';
import useAuth from 'src/composables/useAuth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();

const $q = useQuasar();

const { register } = useAuth();

const { success, error } = useNotify();

const formCadastro = reactive({
  nome: '',
  email: '',
  senha: '',
  senhaConfirmada: ''
});

async function cadastrar() {
  $q.loading.show();
  if (formCadastro.senha.trim() !== formCadastro.senhaConfirmada.trim()) {
    error('Senhas não conferem');
    return;
  }

  await register(formCadastro.email.trim(), formCadastro.senha.trim()).then(() => {
    success('Usuário cadastrado com sucesso verifique seu e-mail para ativar sua conta');
    $q.loading.hide();
    router.push({ name: 'confirmado' });
  }).catch(() => {
    error('Erro ao cadastrar usuário x');
    $q.loading.hide();
  });
};
</script>
