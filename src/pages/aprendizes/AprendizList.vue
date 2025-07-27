<template>
  <div>
    <q-banner class="bg-grey-3">
      <div class="row justify-center items-center">
        <div class="text-h6 q-pa-sm">Crianças</div>
        <div class="q-pa-sm q-mb-sm">
          Cadastre as crianças e compartilhe com os profissionais.
        </div>

        <q-btn
          class="bg-white q-ma-sm"
          outline
          icon="add"
          style="color: orange"
          label="Adicionar nova Criança"
          :to="{ name: 'aprendiz-novo' }"
        />
      </div>
    </q-banner>

    <q-page padding>
      <q-card
        v-for="(item, index) in aprendizes"
        :key="index"
        class="q-mb-md shadow-2"
        bordered
      >
        <q-item>
          <q-item-section avatar @click="redirect">
            <q-avatar color="primary" text-color="white"> T </q-avatar>
          </q-item-section>
          <q-item-section top @click="redirect">
            <q-item-label class="text-grey-8">
              <span class="text-body1 text-blue"
                ><b>{{ item.nome_aprendiz }}</b></span
              >
            </q-item-label>
            <q-item-label lines="1" @click="redirect">
              <span class="text-body2 text-uppercase">{{
                item.nasc_aprendiz
              }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="text-red"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="remover(item)"
              />
              <q-btn
                size="12px"
                class="text-blue"
                flat
                dense
                round
                icon="edit"
                @click="editar(item)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </q-page>
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
