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
            <q-input class="q-mt-md" outlined v-model="formCadastro.nome" label="Nome Completo" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

            <q-input type="email" class="q-mt-md" outlined v-model="formCadastro.email" label="E-mail" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]" />

            <q-input type="password" class="q-mt-md" outlined v-model="formCadastro.senha" label="Senha" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0 || val.length < 6) || 'Senha é obrigatória e deve ter mínimo 6 caracteres' : true]" />

            <q-input type="password" class="q-mt-md" outlined v-model="formCadastro.senhaConfirmada"
              label="Confirme a senha" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0 || val.length < 6) || 'Senha é obrigatória e deve ter mínimo 6 caracteres' : true]" />
          </section>

          <q-btn class="full-width bg-primary text-white q-pa-sm" no-caps label="Cadastrar" @click="cadastrar()"
            :disable="!isSubmitted" />

          <q-btn class="full-width text-teal" color="white" text-color="blue" unelevated to="/" label="Voltar"
            no-caps />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import useNotify from 'src/composables/UseNotify';
import useAuth from 'src/composables/useAuth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useSupabaseApi from 'src/composables/UseSupabaseApi'; import { AssinaturaService } from '../assinatura/AssinaturaService';
;

const supabase = useSupabaseApi();

const router = useRouter();

const $q = useQuasar();

const { register } = useAuth();

const { error } = useNotify();

const formCadastro = reactive({
  nome: '',
  email: '',
  senha: '',
  senhaConfirmada: '',
  banco_demonstracao: '3e19d9a2-2587-4d65-b673-181989780416'//Nome do banco que deve ser usado para demonstração.
});

let isSubmitted = computed(() => {
  return formCadastro.email !== '' && formCadastro.senha !== '' && formCadastro.senha.length > 5 && formCadastro.senhaConfirmada.length > 5 && formCadastro.senhaConfirmada !== '';
});


async function cadastrar() {
  $q.loading.show();
  if (formCadastro.senha.trim() !== formCadastro.senhaConfirmada.trim()) {
    error('Senhas não conferem');
    return;
  }

  await register(formCadastro.email.trim(), formCadastro.senha.trim()).then(() => {
    $q.loading.hide();
    supabase.post('usuarios', { full_name: formCadastro.nome, email: formCadastro.email, banco_demonstracao: formCadastro.banco_demonstracao }).then(() => {
      criarAssinatura();
    }).catch(() => {
      $q.loading.hide();
      error('Erro ao cadastrar usuário');
    });
    router.push({ name: 'confirmado' });
  }).catch(() => {
    error('Erro ao cadastrar usuário');
    $q.loading.hide();
  });
};

function criarAssinatura() {
  const assinaturaService = new AssinaturaService();
  assinaturaService.criarAssinatura();
}
</script>
