<template>
  <div class="row justify-center items-center">
    <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
      <q-item-label header class="text-h6">Objetivos</q-item-label>

      <q-item tag="label" v-ripple class="my-menu-link">
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-grey-8 text-h6">
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="text-grey-8 my-menu-link">
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-grey-8 text-h6">
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple class="my-menu-link">
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-grey-8 text-h6">
            Notify me about updates to apps or games that I downloaded
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const check1 = ref(true);
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #FFF
</style>
