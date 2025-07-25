<template>
  <div>
    <q-item-label header class="text-h6">Crianças</q-item-label>

    <q-item v-for="(item, index) in aprendizes" :key="index" class="q-pa-md">
      <q-item-section avatar>
        <q-avatar
          color="primary"
          text-color="white"
          class="cursor-pointer"
          @click="redirect"
        >
          T
        </q-avatar>
      </q-item-section>

      <q-item-section top class="cursor-pointer" @click="redirect">
        <q-item-label lines="1" class="text-grey-8">
          <span class="text-h6 text-blue text-uppercase">{{
            item.nome_aprendiz
          }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-body2 text-uppercase">{{
            item.cargoDescricao
          }}</span>
        </q-item-label>
        <q-item-label lines="1">
          <span class="text-weight-medium">{{ item.nasc_aprendiz }}</span>
        </q-item-label>

        <q-item-label> </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="remover(item)"
          />
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="edit"
            @click="editar(item)"
          />
        </div>
      </q-item-section>
    </q-item>

    <div class="fixed-bottom q-pa-md">
      <q-btn
        icon="add"
        label="Adicionar Nova Criança"
        color="info"
        no-caps
        class="full-width q-pa-sm text-h6"
        :to="{ name: 'aprendiz-novo' }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AprendizService } from 'src/services/AprendizService';
import useNotify from 'src/composables/UseNotify';

const aprendizService = new AprendizService();

const router = useRouter();

const aprendizes = ref<any[]>([]);

const { success, error } = useNotify();

const $q = useQuasar();

//const router = useRouter();

async function listar() {
  $q.loading.show();
  try {
    const { data } = await aprendizService.getAprendizes();
    aprendizes.value = data;
  } catch (e) {
    error('Erro ao listar aprendizes');
    throw e;
  } finally {
    $q.loading.hide();
  }
}

function redirect() {
  router.push({ name: 'v2/atendimentos' });
}

function editar(aprendiz: any) {
  router.push({
    name: 'aprendiz-novo',
    params: { action: 'edit', aprendizId: aprendiz.uuid },
  });
}

function remover(aprendiz: any) {
  $q.dialog({
    title: 'Confirma a exclusão?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      const { status } = await aprendizService.deleteAprendizById(
        aprendiz.uuid
      );

      if (status == 200) {
        success('Excluído com sucesso!');
        listar();
      }
    })
    .onDismiss(() => {});
}

onMounted(() => {
  listar();
});
</script>
