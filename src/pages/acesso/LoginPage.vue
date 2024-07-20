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
          <div class="text-h6 text-teal">Faça o Login</div>
          <q-input outlined v-model="email" label="E-mail" stack-label
            :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

          <q-input outlined v-model="senha" label="Senha" stack-label type="password"
            :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

          <q-btn class="full-width bg-primary text-white q-pa-sm" size="18px" label="Entrar" @click="entrar"
            :disable="!isSubmitted" />

          <div class="full-width">
            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/cadastrar"
              label="Cadastrar-se" no-caps />
          </div>

          <div class="full-width">
            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/esqueci"
              label="Esqueci a senha" no-caps />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useAuth from 'src/composables/useAuth';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const { error } = useNotify();

const router = useRouter();

const service = useAuth()

const email = ref('');

const senha = ref('');

let isSubmitted = computed(() => {
  return email.value !== '' && senha.value !== '' && senha.value.length > 5 && senha.value !== null;
});

async function entrar() {
  $q.loading.show();
  service.login(email.value.trim(), senha.value.trim()).then(() => {
    router.push('/relatorios')
    $q.loading.hide();
  }).catch(() => {
    $q.loading.hide();
    error('Não foi possível logar. Verifique suas credenciais e tente novamente.');
  });
}

onMounted(() => {
  const usuarioCache = localStorage.getItem('user');

  if (usuarioCache !== null && usuarioCache !== undefined) {
    const usuarioAuth: User = JSON.parse(usuarioCache);

    var diferencaEmMilissegundos = Math.abs(
      new Date().getTime() - new Date(usuarioAuth.last_sign_in_at).getTime()
    );

    var diferencaEmDias = Math.ceil(
      diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
    );

    const duracaoDeLoginEmDias = 11; //O sistema mantém o usuário logado até 11 dias

    if (diferencaEmDias > duracaoDeLoginEmDias) {
      router.push({ name: 'login' });
      localStorage.clear();
    } else {
      router.push({ name: 'relatorios' });
    }
  } else {
    router.push({ name: 'login' });
  }
});
</script>
