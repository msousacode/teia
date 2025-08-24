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
    <q-dialog v-model="dialogIsCancel" persistent>
      <q-card class="q-pa-md" style="max-width: 450px">
        <q-card-section class="text-center q-pa-sm">
          <q-icon name="warning" size="40px" color="orange" class="q-mb-sm" />
          <div class="text-h6 q-mb-sm">Cancelar Assinatura</div>
          <div class="text-body2 text-grey-7 q-mb-md">
            Cancelar sua assinatura:
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <div class="q-gutter-sm">
            <!-- Opção cancelamento imediato -->
            <q-card
              class="cursor-pointer"
              :class="{
                'bg-red-1 text-red-9': cancelationType === 'immediate',
              }"
              @click="cancelationType = 'immediate'"
              flat
              bordered
            >
              <!--q-card-section class="q-pa-md">
                <div class="row items-center">
                  <q-radio
                    v-model="cancelationType"
                    val="immediate"
                    color="negative"
                    class="q-mr-sm"
                  />
                  <div class="col">
                    <div class="text-subtitle2 text-weight-medium">
                      Cancelar Imediatamente
                    </div>
                    <div class="text-caption text-grey-6">
                      Sua assinatura será cancelada agora e você perderá o
                      acesso ao sistema
                    </div>
                  </div>
                </div>
              </q-card-section-->
            </q-card>

            <!-- Opção cancelamento no final do período -->
            <q-card
              class="cursor-pointer"
              :class="{
                'bg-orange-1 text-orange-9': cancelationType === 'period_end',
              }"
              @click="cancelationType = 'period_end'"
              flat
              bordered
            >
              <q-card-section class="q-pa-md">
                <div class="row items-center">
                  <q-radio
                    v-model="cancelationType"
                    val="period_end"
                    color="orange"
                    class="q-mr-sm"
                  />
                  <div class="col">
                    <div class="text-subtitle2 text-weight-medium">
                      Cancelar no Final do Período
                    </div>
                    <div class="text-caption text-grey-6">
                      Continue usando até o final do período pago, depois a
                      assinatura será cancelada
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>

        <q-card-actions class="row q-gutter-xs q-pa-md">
          <q-btn
            label="Cancelar"
            color="grey-6"
            outline
            size="sm"
            class="col"
            @click="dialogIsCancel = false"
          />
          <q-btn
            label="Confirmar Cancelamento"
            color="negative"
            size="sm"
            class="col"
            :disable="!cancelationType"
            @click="confirmarCancelamento"
            :loading="loadingCancel"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog de confirmação de cancelamento -->
    <q-dialog v-model="dialogCancelConfirm" persistent>
      <q-card class="q-pa-md" style="max-width: 400px">
        <q-card-section class="text-center q-pa-sm">
          <q-icon
            name="check_circle"
            size="48px"
            color="positive"
            class="q-mb-sm"
          />
          <div class="text-h6 q-mb-sm">{{ cancelConfirmTitle }}</div>
          <div class="text-body2 text-grey-7 q-mb-md">
            {{ cancelConfirmMessage }}
          </div>
        </q-card-section>

        <q-card-actions class="row justify-center q-pa-md">
          <q-btn
            label="Entendi"
            color="primary"
            size="md"
            @click="dialogCancelConfirm = false"
            class="q-px-lg"
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
              :to="{ name: 'aprendizes' }"
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
import {
  createCheckoutSession,
  cancelSubscriptionImmediate,
  cancelSubscriptionAtPeriodEnd,
  getSubscriptionByCustomer,
} from 'src/services/stripe';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $q = useQuasar();

const isAssinante = ref(false);

const { error, success } = useNotify();

const dialogIsCancel = ref(false);
const dialogCancelConfirm = ref(false);
const cancelationType = ref<'immediate' | 'period_end' | null>('period_end');
const loadingCancel = ref(false);
const cancelConfirmTitle = ref('');
const cancelConfirmMessage = ref('');

const routeLocation = useRoute();

const emailUsuario = routeLocation.params.email;

const emailCancelamento = ref<string>();
const subscriptionId = ref<string>();
const customerId = ref<string>();

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

async function confirmarCancelamento() {
  if (!cancelationType.value) return;

  try {
    loadingCancel.value = true;

    let subId = subscriptionId.value;

    // Se não temos o subscription ID, buscar pelo customer ID
    if (!subId && customerId.value) {
      const subscription = await getSubscriptionByCustomer(customerId.value);
      subId = subscription.id;
    }

    if (!subId) {
      throw new Error('Não foi possível encontrar a assinatura');
    }

    let result;

    if (cancelationType.value === 'immediate') {
      result = await cancelSubscriptionImmediate(subId);
      cancelConfirmTitle.value = 'Assinatura Cancelada';
      cancelConfirmMessage.value =
        'Sua assinatura foi cancelada imediatamente. Você não será mais cobrado.';
      // Atualizar status local
      isAssinante.value = false;
    } else {
      result = await cancelSubscriptionAtPeriodEnd(subId);
      cancelConfirmTitle.value = 'Cancelamento Agendado';
      cancelConfirmMessage.value =
        'Sua assinatura será cancelada ao final do período atual. Você pode continuar usando até lá.';
    }

    success(result.message);
    dialogIsCancel.value = false;
    dialogCancelConfirm.value = true;

    // Reset form
    cancelationType.value = null;
  } catch (e: any) {
    console.error('Erro ao cancelar assinatura:', e);
    error(e.message || 'Erro ao cancelar assinatura. Tente novamente.');
  } finally {
    loadingCancel.value = false;
  }
}

onMounted(async () => {
  //let storage = JSON.parse(localStorage.getItem('user'));

  isAssinante.value = true;

  //fazer uma chamada para o /subscription

  if (1 == 1) {
    const usuario: UsuarioAssinaturaInfo = JSON.parse(userInfoString).data;
    emailCancelamento.value = usuario.email;
    isAssinante.value = true;

    // Armazenar IDs para cancelamento
    if (usuario.assinatura.stripeSubscriptionId) {
      subscriptionId.value = usuario.assinatura.stripeSubscriptionId;
    }
    if (usuario.assinatura.stripeCustomerId) {
      customerId.value = usuario.assinatura.stripeCustomerId;
    }
  }
});
</script>
