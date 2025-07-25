<template>
  <q-item-label header class="text-h6">Cadastro de Profissionais</q-item-label>
  <q-item>
    <q-item-section top>
      <q-input
        class="text-h6"
        v-model="formCadastro.nome"
        placeholder="Nome Completo"
        stack-label
        :rules="[(val) => (val && val.length > 0) || 'Nome é obrigatório']"
      />
    </q-item-section>
  </q-item>

  <q-item>
    <q-item-section top>
      <q-input
        class="text-h6"
        type="email"
        v-model="formCadastro.email"
        placeholder="E-mail"
        stack-label
        :rules="[(val) => (val && val.length > 0) || 'E-mail é obrigatório']"
      />
    </q-item-section>
  </q-item>

  <q-item>
    <q-item-section top>
      <q-select
        class="text-h6"
        v-model="selected"
        :options="cargos"
        label="Selecione a Ocupação"
      />
    </q-item-section>
  </q-item>

  <div class="fixed-bottom q-pa-md">
    <q-btn
      icon="save"
      label="Salvar Profissional"
      color="positive"
      no-caps
      class="full-width q-pa-sm text-h6"
      @click="salvarProfissional"
    />
  </div>
</template>
<script setup lang="ts">
import useNotify from 'src/composables/UseNotify';
import { AcessoService } from 'src/services/AcessoService';
import { reactive, ref } from 'vue';

const selected = ref<string>('');

const formCadastro = reactive({
  nome: '',
  email: '',
});

const cargos = ['Piscologia', 'Fonoaudiologia'];

const acessoService = new AcessoService();

const { error } = useNotify();

function salvarProfissional() {
  const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

  if (!usuarioId) {
    error('Não foi possível localizar o usuário logado.');
    return;
  }

  acessoService.criarUsuarioProfissional(
    {
      full_name: formCadastro.nome,
      email: formCadastro.email,
      cargoDescricao: selected.value,
      preco: 200.0,
    },
    usuarioId
  );
}
</script>
