<template>
  <q-page class="bg-grey-1">
    <!-- Header da página -->
    <div class="row justify-center q-pt-md q-pb-sm">
      <div class="col-12 col-md-8 text-center q-px-md">
        <div
          class="text-h5 text-primary text-weight-medium q-mb-xs"
          v-if="!isAssinante"
        >
          Escolha seu Plano
        </div>
        <div
          class="text-h6 text-positive text-weight-medium q-mb-xs"
          v-if="isAssinante"
        >
          Assinatura Ativa
        </div>
        <div class="text-body2 text-grey-6" v-if="!isAssinante">
          Contrate um plano para acessar o sistema
        </div>
      </div>
    </div>

    <!-- Dialog de cancelamento -->
    <q-dialog v-model="dialogIsCancel">
      <q-card class="q-pa-md" style="max-width: 400px">
        <q-card-section class="text-center q-pa-sm">
          <q-icon name="warning" size="32px" color="orange" class="q-mb-sm" />
          <div class="text-subtitle1 q-mb-sm">Cancelar Assinatura</div>
          <div class="text-body2 q-mb-sm">
            Ao confirmar, sua assinatura será cancelada e novas cobranças serão
            suspensas.
          </div>
          <div class="text-caption text-grey-6 q-mb-md">Deseja prosseguir?</div>
        </q-card-section>

        <q-card-actions class="row q-gutter-xs q-pa-sm">
          <q-btn
            label="Voltar"
            color="grey-6"
            outline
            size="sm"
            class="col"
            @click="dialogIsCancel = false"
          />
          <q-btn
            label="Confirmar"
            color="negative"
            size="sm"
            class="col"
            :href="`https://wa.me/5511977860977?text=Quero Cancelar-${emailCancelamento}`"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Cards dos planos -->
    <div
      class="row justify-center q-gutter-sm q-px-md q-pb-md"
      v-if="!isAssinante"
    >
      <!-- Plano STARTED -->
      <div class="col-12 col-sm-6 col-md-4" style="max-width: 320px">
        <q-card class="shadow-2">
          <q-card-section class="bg-blue-1 text-center q-pa-md">
            <div class="text-subtitle1 text-blue-8 text-weight-bold">
              STARTER
            </div>
            <div class="text-h5 text-blue-9 text-weight-bold">
              R$ 200<span class="text-body2">/mês</span>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <q-list dense>
              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 10 crianças</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 3 profissionais</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions class="q-pa-md q-pt-none">
            <q-btn
              label="Assinar"
              color="blue-9"
              size="md"
              unelevated
              class="full-width"
              @click="assinar('started')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Plano PLUS -->
      <div class="col-12 col-sm-6 col-md-4" style="max-width: 320px">
        <q-card class="shadow-2">
          <q-card-section class="bg-green-1 text-center q-pa-md">
            <div class="text-subtitle1 text-green-8 text-weight-bold">
              PROFESSIONAL
            </div>
            <div class="text-h5 text-green-9 text-weight-bold">
              R$ 400<span class="text-body2">/mês</span>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <q-list dense>
              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 20 crianças</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 5 profissionais</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions class="q-pa-md q-pt-none">
            <q-btn
              label="Assinar"
              color="green-9"
              size="md"
              unelevated
              class="full-width"
              @click="assinar('profissional')"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Plano PRO -->
      <div class="col-12 col-sm-6 col-md-4" style="max-width: 320px">
        <q-card class="shadow-2">
          <q-card-section class="bg-orange-1 text-center q-pa-md">
            <div class="text-subtitle1 text-orange-8 text-weight-bold">
              CLINIC
            </div>
            <div class="text-h5 text-orange-9 text-weight-bold">
              R$ 800<span class="text-body2">/mês</span>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md">
            <q-list dense>
              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 40 crianças</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item class="q-pa-xs">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="positive" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1"
                    >Cadastre 10 profissionais</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions class="q-pa-md q-pt-none">
            <q-btn
              label="Assinar"
              color="orange-9"
              size="md"
              unelevated
              class="full-width"
              @click="assinar('clinic')"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Card de assinatura ativa -->
    <div class="row justify-center q-pa-md" v-if="isAssinante">
      <div class="col-12 col-md-6">
        <q-card class="shadow-2">
          <q-card-section class="bg-positive text-white text-center q-pa-md">
            <q-icon name="verified" size="32px" class="q-mb-sm" />
            <div class="text-subtitle1 text-weight-medium">
              Assinatura Ativa
            </div>
          </q-card-section>

          <q-card-section class="q-pa-md text-center">
            <div class="text-body2 q-mb-md">
              Sua assinatura está ativa e pode ser cancelada a qualquer momento.
            </div>
          </q-card-section>

          <q-card-actions class="q-pa-md q-pt-none row q-gutter-xs">
            <q-btn
              label="Voltar"
              color="primary"
              outline
              size="sm"
              class="col"
              :to="{ name: 'relatorios' }"
            />
            <q-btn
              label="Cancelar"
              color="negative"
              outline
              size="sm"
              class="col"
              @click="dialogIsCancel = true"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { UsuarioAssinaturaInfo } from 'src/models/assinatura.model';
import { createCheckoutSession } from 'src/services/stripe';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $q = useQuasar();

const isAssinante = ref(false);

const { error } = useNotify();

const dialogIsCancel = ref(false);

const routeLocation = useRoute();

const emailUsuario = routeLocation.params.email;

const emailCancelamento = ref<string>();

async function assinar(tipoPlano: 'started' | 'profissional' | 'clinic') {
  try {
    $q.loading.show();

    let email = '';

    const usuario: UsuarioAssinaturaInfo = JSON.parse(
      localStorage.getItem('userInfo') || ''
    );

    if (usuario != null) {
      email = usuario.email;
    } else if (emailUsuario) {
      email = emailUsuario.toString();
    }

    const response = await createCheckoutSession(
      email.toLocaleLowerCase().trim(),
      tipoPlano
    );
    const url = response?.url;

    if (url) {
      window.location.href = url;
    } else {
      error('Erro ao criar sessão de assinatura.');
    }
  } catch (e) {
    error('Erro stripeSubscription');
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  const userInfoString = localStorage.getItem('userInfo');
  if (userInfoString) {
    const usuario: UsuarioAssinaturaInfo = JSON.parse(userInfoString).data;
    emailCancelamento.value = usuario.email;
    isAssinante.value = usuario.assinatura.tipo_assinatura == 'ASSINANTE';
  }
});
</script>
