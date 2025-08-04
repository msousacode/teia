<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #ff9f45">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          :to="{ name: 'aprendizes' }"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
