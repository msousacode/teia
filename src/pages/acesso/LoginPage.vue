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
          <q-input outlined v-model="email" label="E-mail" stack-label />

          <q-input outlined v-model="senha" label="Senha" stack-label type="password" />

          <div class="full-width q-gutter-y-xs">
            <q-btn class="q-px-xl q-py-xs full-width bg-primary text-white" size="22px" label="Entrar"
              @click="entrar" />
          </div>

          <div class="full-width">
            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/cadastrar"
              label="Cadastrar-se" no-caps />
          </div>

          <div class="full-width">
            <q-btn class="full-width text-h6 text-teal" color="white" text-color="blue" unelevated to="/cadastrar"
              label="Esqueci a senha" no-caps />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const email = ref('');

const senha = ref('');

async function entrar() {
  $q.loading.show();

}

onMounted(() => {
  console.log('mounted');
});
</script>
