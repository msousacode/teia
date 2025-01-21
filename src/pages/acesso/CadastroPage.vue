<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="text-h6">SysABA</div>
      </q-toolbar>
    </q-header>

    <q-page>
      <div class="row justify-center q-mt-md">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">
          <title-custom title="Cadastrar novo Usuário" />
          <section>
            <q-input outlined v-model="formCadastro.nome" label="Nome Completo" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

            <q-input type="email" outlined v-model="formCadastro.email" label="E-mail" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]" />

            <q-select stack-label outlined v-model="selected" :options="perfil" label="Tipo de Habilidade" />

            <section v-if="!(tipoPerfil == 'Administrador')">
              <q-input type="password" outlined v-model="formCadastro.senha" label="Senha" stack-label
                :rules="[(val) => isSubmitted ? (val && val.length > 0 || val.length < 6) || 'Senha é obrigatória e deve ter mínimo 6 caracteres' : true]" />

              <q-input type="password" outlined v-model="formCadastro.senhaConfirmada" label="Confirme a senha"
                stack-label
                :rules="[(val) => isSubmitted ? (val && val.length > 0 || val.length < 6) || 'Senha é obrigatória e deve ter mínimo 6 caracteres' : true]" />
            </section>

          </section>

          <br />

          <q-btn class="full-width bg-primary text-white q-pa-sm" no-caps label="Cadastrar" @click="cadastrar()"
            :disable="!isSubmitted" />

          <q-btn class="full-width text-teal text-blue-9 q-pa-sm" unelevated to="/" label="Voltar" no-caps />
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { AcessoService, Usuario } from 'src/services/AcessoService';
import { useRouter } from 'vue-router';
import { createStripeCustomer } from 'src/services/stripe';
import TitleCustom from 'src/components/TitleCustom.vue';

const tipoPerfil = "Administrador";

const router = useRouter();

const $q = useQuasar();

const { success, error } = useNotify();

const acessoService = new AcessoService();

const selected = ref<string>('');

const perfil = ["Especialista", "AT"];

const formCadastro = reactive({
  nome: '',
  email: '',
  senha: '',
  senhaConfirmada: '',
  banco_demonstracao: '3e19d9a2-2587-4d65-b673-181989780416'//Nome do banco que deve ser usado para demonstração.
});

let isSubmitted = computed(() => {
  if (tipoPerfil == 'Administrador') {
    return formCadastro.email !== '' && formCadastro.nome !== '' && selected.value !== '';
  }
  return formCadastro.email !== '' && formCadastro.senha !== '' && formCadastro.senha.length > 5 && formCadastro.senhaConfirmada.length > 5 && formCadastro.senhaConfirmada !== '';
});

async function criarContaStripe(name: string, email: string) {
  try {
    $q.loading.show();

    const { id } = await createStripeCustomer({ name: name, email: email.toLowerCase().trim() });

    if (!id) {
      error('Erro ao criar customer Stripe!');
    }
  } catch (e) {
    //error('Erro ao criar customer!');
  } finally {
    $q.loading.hide();
  }
}

async function cadastrar() {

  if (tipoPerfil != 'Administrador') {
    if (formCadastro.senha.trim() !== formCadastro.senhaConfirmada.trim()) {
      error('Senhas não conferem');
      return;
    }
  }

  const novoUsurio = { full_name: formCadastro.nome, email: formCadastro.email.toLowerCase().trim(), senha: formCadastro.senhaConfirmada, perfil: selected.value } as Usuario;

  try {
    $q.loading.show();

    const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

    if (!usuarioId) {
      error('Não foi possível salvar barreiras');
      return;
    }

    const { data } = await acessoService.criarNovoUsuario(novoUsurio, usuarioId);

    if (data == null) {
      throw Error("Erro ao cadastrar novo usuário.");
    }

    success('Usuário cadastrado com sucesso!');

    if (tipoPerfil != 'Administrador') {
      await criarContaStripe(formCadastro.nome, formCadastro.email.toLowerCase().trim());

      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push({ name: 'assinatura' });
    }

  } catch (e) {
    console.log(e);
    error('Erro ao criar novo usuário. Contate o Suporte.');
  } finally {
    $q.loading.hide();
  }
};
</script>
