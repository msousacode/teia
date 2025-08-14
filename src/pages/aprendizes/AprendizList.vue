<template>
  <q-dialog persistent v-model="precisaAssinar">
    <q-card class="q-pa-lg" style="max-width: 500px; width: 90vw">
      <!-- Header -->
      <q-card-section class="text-center q-pb-md">
        <q-icon name="schedule" size="48px" color="orange" class="q-mb-sm" />
        <div class="text-h6 text-weight-medium q-mb-xs">
          Período de teste finalizado
        </div>
        <div class="text-body2 text-grey-6">
          Continue aproveitando todos os recursos do aplicativo
        </div>
      </q-card-section>

      <!-- Conteúdo -->
      <q-card-section class="q-py-none">
        <div class="text-center">
          <div class="text-body1 q-mb-md">
            Se você gostou do aplicativo e deseja continuar aproveitando os
            recursos, assine um plano:
          </div>

          <q-btn
            color="primary"
            size="lg"
            rounded
            unelevated
            class="q-px-xl q-py-sm text-weight-medium"
            :to="{ name: 'assinatura' }"
            icon="credit_card"
          >
            Assinar Plano
          </q-btn>
        </div>
      </q-card-section>

      <!-- Footer -->
      <q-card-section class="text-center q-pt-md">
        <div class="text-body1 text-grey-5">Cancele quando quiser</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <div>
    <q-banner class="bg-grey-3">
      <div class="column q-gutter-sm">
        <div class="row">
          <div class="col-12">
            <div class="text-h6 text-grey-7 q-pa-sm">
              Olá,
              <span class="text-blue">{{ nomeUsuario }}</span>
            </div>
          </div>
        </div>

        <div class="row justify-center">
          <div class="text-body2 text-grey-7 q-mt-sm">
            Cadastre as crianças e compartilhe com os profissionais.
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-sm-auto">
            <q-btn
              class="bg-white full-width"
              outline
              icon="add"
              style="color: orange"
              label="Adicionar Nova Criança"
              :to="{ name: 'aprendiz-novo' }"
            />
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-md-10">
            <div class="text-body2 text-grey-7 text-center">
              Você tem {{ aprendizes ? aprendizes.length : 0 }} crianças
              cadastradas.
            </div>
          </div>
        </div>
      </div>
    </q-banner>

    <q-page padding class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8" v-if="aprendizes.length != 0">
        <q-card
          v-for="(item, index) in aprendizes"
          :key="index"
          class="q-mb-md shadow-2"
          bordered
        >
          <q-item>
            <q-item-section avatar @click="redirect(item.uuid)">
              <q-avatar color="primary" text-color="white">{{
                item.nome_aprendiz.charAt(0)
              }}</q-avatar>
            </q-item-section>
            <q-item-section top @click="redirect(item.uuid)">
              <q-item-label class="text-grey-8">
                <span class="text-body1 text-blue"
                  ><b>{{ item.nome_aprendiz }}</b></span
                >
              </q-item-label>
              <q-item-label lines="1" @click="redirect(item.uuid)">
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
      </div>

      <q-card
        v-else
        flat
        class="text-center q-pa-xl bg-grey-1 rounded-borders-lg"
      >
        <q-card-section class="q-pa-xl">
          <div class="column items-center q-gutter-md">
            <q-icon name="note_add" size="80px" color="grey-4" />
            <div class="text-h6 text-grey-6">Nenhuma criança cadastrada</div>
            <div
              class="text-body2 text-grey-6 text-center"
              style="max-width: 400px"
            >
              Cadastre as crianças para começar os atendimentos.
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </div>

  <div class="fixed-bottom q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card class="bg-gradient-blue shadow-3" flat bordered>
          <!-- Layout mobile: vertical stack -->
          <div class="column q-gutter-sm q-pa-sm gt-xs">
            <div class="row items-center q-gutter-sm">
              <q-icon name="schedule" color="white" size="24px" />
              <div class="text-white text-weight-medium text-body2">
                Você tem mais 3 dias de teste
              </div>
            </div>
            <q-btn
              dense
              rounded
              unelevated
              color="white"
              text-color="primary"
              label="Assinar Agora"
              class="text-weight-bold q-px-md full-width"
              size="md"
              icon-right="arrow_forward"
            />
          </div>

          <!-- Layout desktop: horizontal -->
          <q-card-section
            horizontal
            class="q-pa-sm lt-sm"
            v-if="!precisaAssinar"
          >
            <q-card-section class="col-auto q-pa-sm">
              <q-icon name="schedule" color="white" size="20px" />
            </q-card-section>

            <q-card-section class="col q-pa-sm">
              <div class="text-white text-weight-medium">
                Você tem mais
                {{ quantidadeDiasTeste - diasRestantesFimTeste }} dia(s) de
                teste.
              </div>
            </q-card-section>

            <q-card-section class="col-auto q-pa-sm">
              <q-btn
                rounded
                unelevated
                color="white"
                text-color="primary"
                label="Assinar"
                class="text-weight-bold text-h6"
                size="md"
                icon-right="arrow_forward"
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AprendizService } from 'src/services/AprendizService';
import useNotify from 'src/composables/UseNotify';
import { AssinaturaService } from 'src/services/AssinaturaService';

const precisaAssinar = ref(false);

const aprendizService = new AprendizService();

const router = useRouter();

const aprendizes = ref<any[]>([]);

const { success, error } = useNotify();

const $q = useQuasar();

const nomeUsuario = ref('');

const assinaturaService = new AssinaturaService();

const diasRestantesFimTeste = ref(0);

const quantidadeDiasTeste = ref(7);
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

function redirect(aprendizId: string) {
  router.push({ name: 'v2/atendimentos', params: { id: aprendizId } });
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

async function verificarEmail(email: string) {
  try {
    $q.loading.show();

    const { status, data } = await assinaturaService.verifyCheckout(
      email.toLowerCase().trim()
    );

    if (status == 200 && data) {
      diasRestantesFimTeste.value = data;
      if (quantidadeDiasTeste.value <= diasRestantesFimTeste.value) {
        precisaAssinar.value = true;
      }
    }

    if (status == 200 || status == 404) {
      return;
    } else if (status == 403) {
      router.push({
        name: 'assinatura',
        params: { email: email.toLowerCase().trim() },
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  const storage = JSON.parse(localStorage.getItem('user') || '{}');

  if (storage && storage.fullName) {
    nomeUsuario.value = storage.fullName;
    verificarEmail(storage.email);
  }

  listar();
});
</script>

<style lang="scss" scoped>
.bg-gradient-blue {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

.bg-gradient-orange {
  background: linear-gradient(135deg, #ff6f00 0%, #ff8f00 50%, #ffa000 100%);
}

.opacity-90 {
  opacity: 0.9;
}

.opacity-75 {
  opacity: 0.75;
}
</style>
