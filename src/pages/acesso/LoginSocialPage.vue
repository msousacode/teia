<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #e91e63">
      <q-toolbar>
        <q-toolbar-title>SysABA</q-toolbar-title>
        <q-space />
        <div style="color: white;">v1.0.0.1.2903</div><!--v1.major.melhoria.bug.mes e ano-->
      </q-toolbar>
    </q-header>

    <q-page-container>

      <div class="flex justify-center items-center">
        <q-img src="../../assets/sys.png" width="220px" height="220px" />
      </div>

      <div class="row justify-center q-gutter-x-md">
        <div class="col-md-4 col-sm-6 col-xs-10">
          <q-card>
            <div class="q-pa-md">

              <div class="text-center text-h6 q-mb-md q-mt-md">Faça o seu Login</div>

              <q-input outlined stack-label v-model="email" label="E-mail"
                :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]"
                @blur="verificarEmail" />

              <q-input outlined stack-label v-model="senha" label="Senha" type="password"
                :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

              <div class="q-mt-md q-gutter-x-md row justify-center">
                <q-btn color="info" to="/cadastrar">Criar conta</q-btn>
                <q-btn color="positive" @click="entrar('normal')" :disable="!isSubmitted">Entrar</q-btn>
              </div>
            </div>

            <div class="text-center text-blue">
              <q-btn text-color="blue-9" unelevated to="/esqueci" label="Esqueci a minha senha" class="q-ma-md" />
            </div>
          </q-card>
        </div>
      </div>
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
import { createCheckoutSession } from 'src/services/stripe';
import { AssinaturaService } from 'src/services/AssinaturaService';

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

const assinaturaService = new AssinaturaService();

async function entrar() {

  try {
    $q.loading.show();

    const { data } = await acessoService.subscriptionInfoByEmail(email.value.toLowerCase().trim());

    if (data == null || data == "") {
      error('Não encontrado.');
      return;
    }

    if (data.assinatura.tipo_assinatura == 'NAO_ASSINANTE') {
      const { url } = await createCheckoutSession(data.email);

      if (url) {
        window.location.href = url;
      }
    } else {
      const auth: Auth = {
        username: email.value.toLocaleLowerCase().trim(),
        password: senha.value.trim()
      }

      $q.loading.show();
      await acessoService.login(auth).then((data) => {

        if (data.status == 401) {
          error('Erro ao logar. Verifique suas credenciais');
          return;
        }

        localStorage.setItem('_tsysaba', data.data);
        router.push({ name: 'relatorios' })
      }).catch(() => {
        error('Erro ao logar. Verifique suas credenciais');
      });
    }

  } catch (e) {
    throw Error("Erro ao confirmar assinatura.")
  } finally {
    $q.loading.hide();
  }
}

async function verificarEmail() {

  try {
    $q.loading.show();

    const { status } = await assinaturaService.verifyCheckout(email.value.toLowerCase().trim());

    if (status == 200 || status == 404) {
      return;
    } else if (status == 403) {
      router.push({ name: 'assinatura', params: { email: email.value.toLowerCase().trim() } });
    }

  } catch (e) {
    console.log(e);
  } finally {
    $q.loading.hide();
  }
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
