<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <div class="text-h6">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.push({ name: 'profissionais' })"
        />
      </div>
    </template>
    <div class="text-h6 text-orange">Cadastre um novo Profissional</div>
    <ul>
      <li class="text-subtitle2">
        O Novo Profissional terá acesso às crianças e objetivos cadastrados.
      </li>
      <li class="text-subtitle2">
        A Senha do Profissional deverá ser enviada pela pessoa que fez o
        cadastro.
      </li>
    </ul>
  </q-banner>

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

  <div class="fixed-bottom q-pa-md">
    <q-btn
      class="full-width q-pa-sm"
      outline
      icon="save"
      style="color: green"
      label="Salvar Profissional"
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

async function salvarProfissional() {
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

  const { status } = await acessoService.criarUsuarioProfissional(
    {
      full_name: formCadastro.nome,
      email: formCadastro.email,
      cargoDescricao: selected.value,
      preco: formCadastro.preco,
    },
    usuarioId
  );

  if (status != 200) {
    error('Erro ao criar profissional');
    return;
  }

  success('Profissional criado com sucesso!');
  formCadastro.nome = '';
  formCadastro.email = '';
  formCadastro.preco = '';
  selected.value = '';
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
