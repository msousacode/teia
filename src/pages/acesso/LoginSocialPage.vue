<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #e91e63">
      <q-toolbar>
        <q-toolbar-title>SysABA</q-toolbar-title>
        <q-space />
        <div style="color: white;">v1.0.0.1.20241204</div>
      </q-toolbar>
    </q-header>

    <q-page-container>

      <div class="row justify-center q-gutter-x-md q-mt-xl">
        <div class="col-md-4 col-sm-6 col-xs-10">
          <div class="q-pa-md">

            <div class="flex justify-center items-center">
              <q-img src="../../assets/sys.png" width="120px" height="120px" />
            </div>

            <div class="text-center text-h6 q-mb-md q-mt-md">Faça o seu Login</div>

            <q-input outlined stack-label v-model="email" label="E-mail"
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

            <q-input outlined stack-label v-model="senha" label="Senha" type="password"
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

            <q-btn class="full-width bg-primary text-white" no-caps label="Entrar" @click="entrar('normal')"
              :disable="!isSubmitted" />
            <div class="text-right text-blue text-body1 q-mt-md">
              <q-btn text-color="blue" no-caps unelevated to="/esqueci" label="Esqueci a senha" />
            </div>

            <!--div class="col-md-4">
              <div class="text-center text-body2 q-mb-md">Ou acesse com as redes sociais</div>

              <div class="row">
                <q-btn class="full-width google-btn" label="Google" icon="mdi-google" @click="entrar('google')" />
              </div>
            </div-->
          </div>
        </div>
      </div>

      <!--q-btn class="full-width text-left text-blue text-body1 q-mt-sm" color="white" unelevated to="/cadastrar"
        label="Novo por aqui? Cadastrar-se" no-caps /-->

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useManagerTokens } from 'src/composables/managerTokens';
import { AcessoService, Auth } from 'src/services/AcessoService';
import { useQuasar } from 'quasar';

const { error } = useNotify();

const email = ref('');

const senha = ref('');

const router = useRouter();

const { getToken } = useManagerTokens();

const acessoService = new AcessoService();

const $q = useQuasar();

let isSubmitted = computed(() => {
  return email.value !== '' && senha.value !== '' && senha.value.length > 5 && senha.value !== null;
});

async function entrar() {
  const auth: Auth = {
    username: email.value.toLocaleLowerCase().trim(),
    password: senha.value.trim()
  }

  $q.loading.show();
  await acessoService.login(auth).then((data) => {
    debugger
    if (data.status == 401) {
      error('Erro ao logar. Verifique suas credenciais');
      return;
    }

    localStorage.setItem('_tsysaba', data.data);
    router.push({ name: 'relatorios' })
  }).catch(() => {
    error('Erro ao logar. Verifique suas credenciais');
  });
  $q.loading.hide();
}

onBeforeMount(() => {
  if (getToken() != null) {
    router.push({ name: 'relatorios' });
  }
});

localStorage.removeItem('periodoTeste');

</script>

<style scoped>
.facebook-btn {
  background-color: #3b5998;
  color: white;
}

.google-btn {
  background-color: #db4437;
  color: white;
}
</style>
