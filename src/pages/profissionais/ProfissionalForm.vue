<template>
  <q-item-label header class="text-h6">Cadastro de Profissionais</q-item-label>
  <q-item>
    <q-item-section>
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
    <q-item-section>
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
    <q-item-section>
      <q-select
        class="text-h6"
        v-model="selected"
        :options="cargos"
        label="Selecione a Ocupação"
      />
    </q-item-section>
  </q-item>

  <!--q-item>
    <q-item-section>
      <q-input
        label="* Opcional"
        class="text-h6"
        v-model="formCadastro.preco"
        placeholder="Valor da Consulta"
        stack-label
      />
    </q-item-section>
  </q-item-->

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
import { useQuasar } from 'quasar';
import useFormatUtil from 'src/composables/UseFormatUtil';
import useNotify from 'src/composables/UseNotify';
import { AcessoService } from 'src/services/AcessoService';
import { ProfissionalService } from 'src/services/ProfissionalService';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const selected = ref<string>('');

const formCadastro = reactive({
  nome: '',
  email: '',
  preco: '',
});

const cargos = ['Piscologia', 'Fonoaudiologia'];

const acessoService = new AcessoService();

const profissionalService = new ProfissionalService();

const { success, error } = useNotify();

const utils = useFormatUtil();

const routeLocation = useRoute();

const $q = useQuasar();

function salvarProfissional() {
  const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

  if (!usuarioId) {
    error('Não foi possível localizar o usuário logado.');
    return;
  }

  if (routeLocation.params.email) {
    // Editar profissional existente
    editarProfissional();
    return;
  }

  acessoService.criarUsuarioProfissional(
    {
      full_name: formCadastro.nome,
      email: formCadastro.email,
      cargoDescricao: selected.value,
      preco: formCadastro.preco,
    },
    usuarioId
  );
}

async function editarProfissional() {
  if (routeLocation.params.email.toString().trim() == '') {
    error('Não foi possível localizar o usuário logado.');
    return;
  }

  profissionalService
    .atualizar(
      {
        full_name: formCadastro.nome,
        email: formCadastro.email,
        cargoDescricao: selected.value,
        preco: formCadastro.preco,
      },
      routeLocation.params.email.toString().trim()
    )
    .then(() => {
      success('Profissional atualizado com sucesso!');
      formCadastro.nome = '';
      formCadastro.email = '';
      formCadastro.preco = '';
      selected.value = '';
    })
    .catch((e) => {
      error('Erro ao atualizar profissional');
      throw e;
    });
}

watch(formCadastro, (newValue) => {
  formCadastro.preco = utils.formatMoeda(newValue.preco);
});

onMounted(async () => {
  if (routeLocation.params.email) {
    try {
      $q.loading.show();
      const { data } = await profissionalService.getByEmail(
        routeLocation.params.email.toString().trim()
      );

      if (data) {
        formCadastro.nome = data.full_name || '';
        formCadastro.email = data.email || '';
        formCadastro.preco = data.preco ? utils.formatMoeda(data.preco) : '';
        selected.value = data.cargoDescricao || '';
      }

      //profissionaisSelecionados.value = await buscarProfissionaisVinculados();
    } catch (e) {
      error('');
      throw e;
    } finally {
      $q.loading.hide();
    }
  }

  //await carregarProfissionais();
});
</script>
