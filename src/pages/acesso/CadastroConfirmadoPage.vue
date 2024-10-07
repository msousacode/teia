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
          <div class="text-h6 text-teal">Tudo certo!</div>
          <q-banner class="bg-blue-1 text-green-9 q-mb-md q-pa-sm text-center">
            <span class="text-h6">
              Volte para a tela de login e realize o seu acesso.</span></q-banner>
        </div>
      </div>

      <q-btn class="full-width text-teal" color="white" text-color="blue" to="/" label="Voltar" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
