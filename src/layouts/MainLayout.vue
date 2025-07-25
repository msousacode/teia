<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #ff9f45">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="settings">
          <q-list>
            <q-item clickable v-close-popup @click="sair">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="link.display"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
import { UsuarioService } from 'src/services/UsuarioService';

const router = useRouter();

const perfil = ref();

const essentialLinks: EssentialLinkProps[] = reactive([
  {
    title: 'Relatórios',
    icon: 'mdi-chart-line',
    routeName: 'relatorios',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Crianças',
    icon: 'mdi-account-multiple',
    routeName: 'aprendizes',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Objetivos',
    icon: 'mdi-account-multiple',
    routeName: 'objetivos',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Profissionais',
    icon: 'mdi-account-multiple',
    routeName: 'profissionais',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Meu Perfil',
    icon: 'mdi-cog',
    routeName: 'perfil',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Assinatura',
    icon: 'mdi-currency-usd',
    routeName: 'assinatura',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Suporte',
    icon: 'mdi-help-circle',
    routeName: 'suporte',
    hide: true,
    display: () => 'none',
  },
  /*{
    title: 'Protocolos',
    icon: 'mdi-chart-gantt',
    routeName: 'avaliacoes',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Intervenções',
    icon: 'mdi-view-dashboard',
    routeName: 'atendimentos',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Programas',
    icon: 'mdi-chart-line-variant',
    routeName: 'treinamentos',
    hide: true,
    display: () => 'none',
  },*/
]);

const restricoesAt = [
  'Profissionais',
  'Aprendizes',
  'Assinatura',
  'Protocolos',
  'Programas',
  'Suporte',
];

watch(perfil, (newValue) => {
  if (newValue == 'CONVIDADO') {
    restricoesAt.forEach((link) => {
      const foundLink = essentialLinks.find((item) => item.title == link);
      if (foundLink) {
        foundLink.hide = newValue == 'ADMIN';
      }
    });
    return;
  }
});

const leftDrawerOpen = ref(false);

const usuarioService = new UsuarioService();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const sair = async () => {
  localStorage.clear();
  router.replace({ name: 'login' });
};

onMounted(async () => {
  const storage = JSON.parse(localStorage.getItem('user'));

  if (storage == null) {
    await usuarioService.getUsuarioInfo().then((data) => {
      if (data.ativo == false) {
        localStorage.clear();
        router.push({ name: 'login' });
      }

      perfil.value = data.perfil;

      localStorage.setItem('user', JSON.stringify(data));
    });
  }

  perfil.value = storage.perfil;
});
</script>
