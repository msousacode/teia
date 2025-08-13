<template>
  <q-banner class="bg-grey-3">
    <div class="row justify-center items-center">
      <div class="text-body2 text-grey-7 q-mt-sm">
        Atribua as estrelinhas para os objetivos e acompanhe a evolução.
      </div>
      <div class="text-body2 text-grey-7 q-mt-sm">
        Ao terminar as coletas, encerre o atendimento e gere o relatório.
      </div>

      <div class="row">
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="add"
          style="color: blue"
          label="Importar"
          :to="{
            name: `objetivos/import`,
            params: { id: aprendiz.aprendizId },
          }"
        />
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="file_download"
          style="color: brown"
          label="PDF"
        />
        <q-btn
          class="bg-white q-ma-sm"
          outline
          dense
          icon="close"
          style="color: orangered"
          label="Encerrar"
        />
      </div>
    </div>
  </q-banner>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ aprendiz.nome_aprendiz.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="text-grey-8">
        <span class="text-body1 text-info text-uppercase"
          ><b>{{ aprendiz.nome_aprendiz }}</b></span
        >
      </q-item-label>

      <q-item-label>
        <q-icon name="star" color="green-8" size="26px" />
        {{ sumEstrelasPositivas }}
        <q-icon name="star" color="red-8" size="26px" class="q-ml-sm" />
        {{ sumEstrelasNetagivas }}
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-tabs v-model="tab" class="text-teal">
    <q-tab name="objetivos" label="Objetivos" />
    <q-tab name="evolucoes" label="Evoluções" />
  </q-tabs>

  <q-tab-panels v-model="tab">
    <q-tab-panel name="objetivos">
      <q-card
        v-for="(item, index) in list"
        :key="index"
        class="q-mb-md shadow-2"
        bordered
      >
        <q-item>
          <q-item-section top>
            <q-item-label class="text-grey-8">
              <span
                class="text-body1"
                :class="{ 'text-strike': item.concluido }"
                >{{ item.nomeAlvo }}</span
              >
            </q-item-label>
            <q-item-label>
              <div class="text-grey-8 q-gutter-xs q-mt-sm">
                <q-btn
                  v-if="!item.concluido"
                  size="12px"
                  label="Concluído"
                  class="bg-green text-white"
                  @click="concluirAlvo(item.alvoId)"
                />

                <q-btn
                  v-else
                  size="12px"
                  label="Reabrir"
                  class="bg-orange-8 text-white"
                  @click="concluirAlvo(item.alvoId)"
                />

                <q-btn
                  size="12px"
                  label="Anotar"
                  class="bg-info text-white"
                  :disable="item.concluido"
                  @click="
                    () => {
                      alvoAtualId = item.alvoId;
                      visibleAnotacao = true;
                    }
                  "
                />
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="column q-gutter-xs items-center">
              <div class="row items-center q-gutter-xs">
                <q-btn
                  size="12px"
                  dense
                  round
                  icon="star"
                  class="text-green-8"
                  :disable="item.concluido"
                  @click="adicionarEstrela(item, 'positiva')"
                />
                <span class="text-weight-bold text-green-8">{{
                  item.totalEstrelaPositiva || 0
                }}</span>
              </div>
              <div class="row items-center q-gutter-xs">
                <q-btn
                  size="12px"
                  dense
                  round
                  icon="star"
                  class="text-red-8"
                  :disable="item.concluido"
                  @click="adicionarEstrela(item, 'negativa')"
                />
                <span class="text-weight-bold text-red-8">{{
                  item.totalEstrelaNegativa || 0
                }}</span>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </q-tab-panel>

    <q-tab-panel name="evolucoes">
      <div class="column q-gutter-md">
        <!-- Lista de anotações -->
        <div v-if="anotacoesList.length > 0" class="column q-gutter-md">
          <q-card
            v-for="(item, index) in anotacoesList"
            :key="index"
            class="shadow-3 rounded-borders-lg"
            style="border-left: 4px solid var(--q-primary)"
          >
            <!-- Header do card -->
            <q-card-section class="bg-grey-1 q-pa-md">
              <div class="row items-center justify-between">
                <div class="row items-center q-gutter-md">
                  <q-avatar color="primary" text-color="white" size="40px">
                    <q-icon name="person" size="20px" />
                  </q-avatar>
                  <div>
                    <div class="text-subtitle1 text-weight-medium text-grey-8">
                      {{ item.criadoNome }}
                    </div>
                    <div class="text-caption text-grey-6">
                      Profissional responsável
                    </div>
                  </div>
                </div>
                <q-chip
                  icon="schedule"
                  color="grey-7"
                  text-color="white"
                  size="sm"
                  class="q-px-md"
                >
                  {{ item.data_anotacao }}
                </q-chip>
              </div>
            </q-card-section>

            <!-- Conteúdo da anotação -->
            <q-card-section class="q-pa-lg">
              <div class="row items-start q-gutter-md">
                <q-icon
                  name="format_quote"
                  color="primary"
                  size="24px"
                  class="q-mt-xs"
                />
                <div class="col">
                  <div
                    class="text-body1 text-grey-8"
                    style="line-height: 1.7; font-style: italic"
                  >
                    "{{ item.anotacao }}"
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- Footer com badge de status -->
            <q-card-section class="q-pa-md q-pt-none">
              <div class="row items-center justify-between">
                <q-badge
                  :color="index === 0 ? 'positive' : 'info'"
                  :label="
                    index === 0
                      ? 'Mais recente'
                      : `Registro #${anotacoesList.length - index}`
                  "
                  class="q-px-sm"
                />
                <div class="row q-gutter-xs">
                  <q-btn
                    icon="edit"
                    color="primary"
                    size="sm"
                    round
                    flat
                    class="q-pa-xs"
                  >
                    <q-tooltip>Editar anotação</q-tooltip>
                  </q-btn>
                  <q-btn
                    icon="delete"
                    color="negative"
                    size="sm"
                    round
                    flat
                    class="q-pa-xs"
                  >
                    <q-tooltip>Excluir anotação</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Estado vazio melhorado -->
        <q-card
          v-else
          flat
          class="text-center q-pa-xl bg-grey-1 rounded-borders-lg"
        >
          <q-card-section class="q-pa-xl">
            <div class="column items-center q-gutter-md">
              <q-icon name="note_add" size="80px" color="grey-4" />
              <div class="text-h6 text-grey-6">
                Nenhuma evolução registrada ainda
              </div>
              <div
                class="text-body2 text-grey-5 text-center"
                style="max-width: 400px"
              >
                Quando você registrar anotações sobre a evolução do aprendiz,
                elas aparecerão aqui organizadas cronologicamente
              </div>
              <q-btn
                color="primary"
                icon="add_circle"
                label="Registrar primeira evolução"
                no-caps
                rounded
                class="q-mt-md"
                @click="
                  () => {
                    alvoAtualId = '';
                    visibleAnotacao = true;
                  }
                "
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-tab-panel>
  </q-tab-panels>

  <!-- Dialog para nova anotação (único para toda a página) -->
  <q-dialog v-model="visibleAnotacao" persistent>
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-card-section class="q-pa-none">
        <div class="row items-center q-gutter-sm q-mb-md">
          <q-icon name="edit_note" color="primary" size="24px" />
          <span class="text-subtitle1 text-primary">Nova Anotação</span>
        </div>
        <div class="text-body2 text-grey-7 q-mt-sm">
          Registre a evolução. Essa anotação será visível para os demais
          profissionais.
        </div>
        <q-input
          outlined
          label="Digite sua anotação"
          v-model="anotacao"
          type="textarea"
          :rules="[
            (val) => (val && val.length > 0) || 'Anotação é obrigatória',
          ]"
          placeholder="Descreva a evolução observada..."
          rows="6"
          counter
          maxlength="500"
        />
      </q-card-section>

      <q-card-actions class="q-pa-none q-mt-md">
        <div class="row q-gutter-sm full-width">
          <q-btn
            label="Cancelar"
            color="grey-6"
            no-caps
            outline
            @click="visibleAnotacao = false"
            class="col q-pa-sm"
            icon="close"
          />
          <q-btn
            label="Salvar Anotação"
            color="green"
            no-caps
            class="col q-pa-sm"
            icon="save"
            @click="salvarAnotacao(alvoAtualId)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { AnotacaoService } from 'src/services/AnotacaoService';
import { AprendizService } from 'src/services/AprendizService';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const aprendizService = new AprendizService();

const tab = ref('objetivos');

const list = ref<any[]>([]);

const alvoService = new AlvoService();

const anotacaoService = new AnotacaoService();

const visibleAnotacao = ref(false);

const anotacao = ref('');

const anotacoesList = ref<any[]>([]);

const alvoAtualId = ref<string>(''); // Para armazenar o ID do alvo sendo anotado

const { success, error } = useNotify();

const aprendizId = ref();

const aprendiz = ref({
  aprendizId: '',
  nome_aprendiz: '',
});

const sumEstrelasNetagivas = ref(0);
const sumEstrelasPositivas = ref(0);

// Sistema de delay para otimizar requisições
const estrelasPendentes = ref<Map<string, any>>(new Map());
const delayTimer = ref<NodeJS.Timeout | null>(null);
const DELAY_TIME = 2000; // 2 segundos de delay

function adicionarEstrela(item: any, tipo: 'positiva' | 'negativa') {
  // Atualiza o contador localmente (feedback imediato)
  if (tipo === 'positiva') {
    item.totalEstrelaPositiva = (item.totalEstrelaPositiva || 0) + 1;
  } else {
    item.totalEstrelaNegativa = (item.totalEstrelaNegativa || 0) + 1;
  }

  // Armazena a mudança pendente
  const chave = `${item.alvoId}_${tipo}`;
  const pendente = estrelasPendentes.value.get(chave) || {
    alvoId: item.alvoId,
    tipo,
    quantidade: 0,
  };

  pendente.quantidade += 1;
  estrelasPendentes.value.set(chave, pendente);

  // Cancela timer anterior e cria novo
  if (delayTimer.value) {
    clearTimeout(delayTimer.value);
  }

  delayTimer.value = setTimeout(() => {
    enviarEstrelasPendentes();
  }, DELAY_TIME);
}

async function enviarEstrelasPendentes() {
  if (estrelasPendentes.value.size === 0) return;

  // Agrupa todas as mudanças pendentes
  const mudancas = Array.from(estrelasPendentes.value.values());

  const { status } = await alvoService.atualizarEstrelas(mudancas);

  if (status == 200) {
    success('Estrelas salvas!');
    // Atualiza apenas os totais gerais sem recarregar toda a lista
    atualizarTotaisGerais();
  } else {
    error('Erro ao enviar estrelas');
    // Em caso de erro, reverte as mudanças locais
    await carregarObjetivos();
  }

  // Limpa pendências após processar
  estrelasPendentes.value.clear();
}

function atualizarTotaisGerais() {
  // Recalcula os totais baseado nos dados atuais da lista
  sumEstrelasNetagivas.value = 0;
  sumEstrelasPositivas.value = 0;

  list.value.forEach((item) => {
    sumEstrelasNetagivas.value += item.totalEstrelaNegativa || 0;
    sumEstrelasPositivas.value += item.totalEstrelaPositiva || 0;
  });
}

async function concluirAlvo(uuid: string) {
  const { status } = await alvoService.concluirAlvo(uuid);
  if (status === 200) {
    await carregarObjetivos();
  }
  console.log(status);
}

async function carregarObjetivos() {
  const aprendizId = route.params.id as string;

  const { data } = await alvoService.getAlvosImportadosV2(aprendizId);

  list.value = data;

  // Reseta os totais antes de recalcular
  sumEstrelasNetagivas.value = 0;
  sumEstrelasPositivas.value = 0;

  // Calcula os totais das estrelas
  list.value.forEach((item) => {
    sumEstrelasNetagivas.value += item.totalEstrelaNegativa || 0;
    sumEstrelasPositivas.value += item.totalEstrelaPositiva || 0;
  });
}

async function carregarAnotacoes() {
  const { data } = await anotacaoService.getAnotacoesPorAprendiz(
    aprendizId.value
  );

  if (data) {
    anotacoesList.value = data;
    return;
  }
}

async function salvarAnotacao(alvoId: string) {
  if (!anotacao.value.trim()) {
    error('Anotação não pode ser vazia');
    return;
  }

  const { status } = await anotacaoService.postAnotacao({
    coletaId: alvoId,
    aprendizId: aprendizId.value,
    anotacao: anotacao.value,
  });

  if (status == 200) {
    success('Anotação salva com sucesso!');
    visibleAnotacao.value = false;
    anotacao.value = '';
    // Recarrega as anotações para mostrar a nova
    await carregarAnotacoes();
    return;
  }

  error('Erro ao tentar salvar a anotação');
}

onMounted(async () => {
  aprendizId.value = route.params.id as string;

  const { data: aprendizData } = await aprendizService.getAprendizById(
    aprendizId.value
  );

  aprendiz.value.aprendizId = aprendizData.aprendizId;
  aprendiz.value.nome_aprendiz = aprendizData.nome_aprendiz;

  await carregarObjetivos();
  await carregarAnotacoes();
});

onUnmounted(() => {
  // Limpa o timer e envia pendências antes de sair
  if (delayTimer.value) {
    clearTimeout(delayTimer.value);
    enviarEstrelasPendentes();
  }
});
</script>
