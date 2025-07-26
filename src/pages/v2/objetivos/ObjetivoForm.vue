<template>
  <div class="objetivo-form-page">
    <!-- Header melhorado -->
    <div class="page-header">
      <div class="header-content">
        <q-btn
          flat
          round
          icon="arrow_back"
          color="white"
          size="md"
          @click="$router.go(-1)"
        >
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
        <q-icon name="mdi-target-account" size="24px" color="white" />
        <h1 class="header-title">
          {{ isEditing ? 'Editar Objetivo' : 'Novo Objetivo' }}
        </h1>
        <q-space />
      </div>
    </div>

    <!-- Formulário -->
    <div class="form-content">
      <q-card class="form-card">
        <q-card-section class="q-pb-sm">
          <div class="form-header">
            <q-icon name="mdi-bullseye-arrow" color="primary" size="28px" />
            <div class="form-title-section">
              <h2 class="form-title">Dados do Objetivo</h2>
              <p class="form-subtitle">
                Preencha as informações do objetivo de aprendizado
              </p>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="form-fields">
          <div class="field-group">
            <label class="field-label">
              <q-icon name="mdi-target" class="q-mr-xs" />
              Nome do Objetivo *
            </label>
            <q-input
              v-model="nomeAlvo"
              placeholder="Digite o nome do objetivo de aprendizado"
              outlined
              class="form-input"
              :rules="[(val) => !!val || 'Nome do objetivo é obrigatório']"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-target" color="primary" />
              </template>
            </q-input>
          </div>

          <!-- Preview card -->
          <div v-if="nomeAlvo.trim()" class="preview-section">
            <label class="field-label">
              <q-icon name="mdi-eye" class="q-mr-xs" />
              Pré-visualização
            </label>
            <q-card class="preview-card">
              <q-card-section class="preview-content">
                <div class="flex items-center">
                  <q-avatar
                    size="40px"
                    color="primary"
                    text-color="white"
                    class="q-mr-md"
                  >
                    <q-icon name="mdi-bullseye-arrow" size="20px" />
                  </q-avatar>
                  <div>
                    <div class="preview-name">{{ nomeAlvo }}</div>
                    <div class="preview-type">Objetivo de Aprendizado</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>

        <!-- Ações do formulário -->
        <q-card-actions class="form-actions">
          <q-btn
            flat
            label="Cancelar"
            color="grey-7"
            class="action-btn"
            @click="$router.go(-1)"
          />
          <q-space />
          <q-btn
            unelevated
            :label="isEditing ? 'Atualizar Objetivo' : 'Salvar Objetivo'"
            color="primary"
            icon="save"
            class="action-btn save-btn"
            :loading="loading"
            @click="salvar"
            :disable="!nomeAlvo.trim()"
          />
        </q-card-actions>
      </q-card>

      <!-- Card de ajuda -->
      <q-card class="help-card q-mt-md">
        <q-card-section>
          <div class="help-header">
            <q-icon name="mdi-lightbulb" color="orange" size="20px" />
            <span class="help-title">Dicas para um bom objetivo</span>
          </div>
          <ul class="help-list">
            <li>Seja específico e claro</li>
            <li>Use linguagem simples e objetiva</li>
            <li>Defina objetivos mensuráveis</li>
            <li>Considere a idade da criança</li>
          </ul>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import AlvoService from 'src/services/AlvoService';
import { useRoute } from 'vue-router';

const { success, error } = useNotify();

const $q = useQuasar();

const alvoService = new AlvoService();

const nomeAlvo = ref('');

const routeLocation = useRoute();

async function salvar() {
  $q.loading.show();

  try {
    const { data } = await alvoService.postAlvo({ nome_alvo: nomeAlvo.value });

    if (data) {
      success('Salvo com sucesso!');
    } else {
      error('Erro ao tentar atualizar.');
    }
  } catch (e) {
    throw e;
  } finally {
    $q.loading.hide();
    nomeAlvo.value = '';
  }
}

onMounted(async () => {
  if (routeLocation.params.objetivoId) {
    try {
      $q.loading.show();
      const { data } = await alvoService.getAlvoById(
        routeLocation.params.objetivoId.toString().trim()
      );

      if (data) {
        nomeAlvo.value = data.nome_alvo;
      }

      //profissionaisSelecionados.value = await buscarProfissionaisVinculados();
    } catch (e) {
      error('');
      throw e;
    } finally {
      $q.loading.hide();
    }
  }
});
</script>

<style lang="scss" scoped>
.objetivo-form-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

// Header estilizado
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 16px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .header-content {
    display: flex;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    gap: 12px;
  }

  .header-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
}

// Conteúdo do formulário
.form-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
}

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

// Header do formulário
.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;

  .form-title-section {
    flex: 1;

    .form-title {
      margin: 0;
      font-size: 1.375rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .form-subtitle {
      margin: 4px 0 0;
      font-size: 0.875rem;
      color: #6c757d;
    }
  }
}

// Campos do formulário
.form-fields {
  padding: 32px 24px;
}

.field-group {
  margin-bottom: 32px;

  .field-label {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 12px;
  }

  .form-input {
    .q-field__control {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;

      &:hover {
        border-color: #667eea;
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
      }
    }

    &.q-field--focused .q-field__control {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .q-field__native {
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

// Seção de preview
.preview-section {
  margin-top: 24px;

  .preview-card {
    border: 2px dashed #dee2e6;
    border-radius: 12px;
    background: #f8f9fa;

    .preview-content {
      padding: 16px;
    }

    .preview-name {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .preview-type {
      font-size: 0.8rem;
      color: #6c757d;
      margin-top: 2px;
    }
  }
}

// Ações do formulário
.form-actions {
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-top: 1px solid #dee2e6;

  .action-btn {
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 12px;
    text-transform: none;
    font-size: 0.9rem;
  }

  .save-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      transform: none !important;
    }
  }
}

// Card de ajuda
.help-card {
  border-radius: 12px;
  border-left: 4px solid #ffc107;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  .help-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    .help-title {
      font-weight: 600;
      color: #495057;
    }
  }

  .help-list {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 6px;
      color: #6c757d;
      font-size: 0.875rem;
    }
  }
}

// Responsividade
@media (max-width: 600px) {
  .page-header {
    padding: 16px 12px;

    .header-title {
      font-size: 1.25rem;
    }
  }

  .form-content {
    padding: 16px 12px;
  }

  .form-fields {
    padding: 24px 16px;
  }

  .form-actions {
    padding: 16px;

    .action-btn {
      padding: 12px 20px;
      font-size: 0.875rem;
    }
  }

  .form-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;

    .form-title-section {
      .form-title {
        font-size: 1.25rem;
      }
    }
  }
}

// Animações
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-card,
.help-card {
  animation: slideUp 0.6s ease-out;
}

.help-card {
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

// Melhorias de acessibilidade
@media (prefers-reduced-motion: reduce) {
  .save-btn:hover {
    transform: none;
  }

  .form-card,
  .help-card {
    animation: none;
  }
}

// Estados de loading
.save-btn[loading='true'] {
  .q-btn__content {
    opacity: 0.7;
  }
}
</style>
