<template>
  <div>
    <q-item-label header class="text-h6">Objetivos</q-item-label>

    <q-item v-for="(item, index) in list" :key="index">
      <q-item-section top>
        <q-item-label lines="1" class="text-grey-8">
          <span class="text-h6">{{ item.nome_alvo }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-body2 text-uppercase">{{
            item.cargoDescricao
          }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ item.email }}</span>
        </q-item-label>

        <q-item-label> </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn size="12px" flat dense round icon="delete" />
          <q-btn size="12px" flat dense round icon="edit" />
        </div>
      </q-item-section>
    </q-item>

    <div class="fixed-bottom q-pa-md">
      <btn
        icon="add"
        color="info"
        label="Adicionar Novo Objetivo"
        :path="{ name: 'objetivos/cadastro' }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AlvoService from 'src/services/AlvoService';
import { onMounted, ref } from 'vue';
import btn from 'src/components/ButtonComponent.vue';

const list = ref<any[]>([]);
const alvoService = new AlvoService();

onMounted(async () => {
  const { data } = await alvoService.getAlvosV2();
  list.value = data;
});
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #FFF
</style>
