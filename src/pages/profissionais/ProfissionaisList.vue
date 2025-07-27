<template>
  <div>
    <q-banner class="bg-grey-3">
      <div class="row justify-center items-center">
        <div class="text-h6 q-pa-sm">Profissionais</div>
        <div class="q-pa-sm q-mb-sm">
          Cadastre os seus profissionais e compartilhe as crianças.
        </div>

        <q-btn
          class="bg-white q-ma-sm"
          outline
          icon="add"
          style="color: orange"
          label="Adicionar novo Profissional"
          :to="{ name: 'profissionais/cadastro' }"
        />
      </div>
    </q-banner>

    <q-page padding>
      <q-card
        v-for="(item, index) in list"
        :key="index"
        class="q-mb-md shadow-2"
        bordered
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> T </q-avatar>
          </q-item-section>
          <q-item-section top>
            <q-item-label class="text-grey-8">
              <span class="text-h6">{{ item.full_name }}</span>
            </q-item-label>
            <q-item-label lines="1">
              <span class="text-body2 text-uppercase">{{
                item.cargoDescricao
              }}</span>
            </q-item-label>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ item.email }}</span>
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
                @click="excluir(item)"
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
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { ProfissionalService } from 'src/services/ProfissionalService';
import { onMounted, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';

const { success, error } = useNotify();

const $q = useQuasar();

const router = useRouter();

const service = new ProfissionalService();

const list = ref<any[]>([]);

//const check1 = ref(true);

function excluir(row: any) {
  $q.dialog({
    title: 'Confirmar a exclusão?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      const { status } = await service.delete(toRaw(row).email);

      if (status == 200) {
        success('Excluído com sucesso!');
        await getProfissionais();
      }
    })
    .onDismiss(() => {});
}

function editar(row: any) {
  const email = row.email;
  router.push({ name: 'profissionais/cadastro', params: { email } });
}

async function getProfissionais() {
  const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

  if (!usuarioId) {
    error('Erro ao recuperar userId');
    return;
  }

  const { data } = await service.getProfissionais(usuarioId);
  list.value = data;
}

onMounted(async () => {
  try {
    $q.loading.show();
    await getProfissionais();
  } catch (e) {
    error('Erro ao recuperar profissionais');
  } finally {
    $q.loading.hide();
  }
});
</script>
