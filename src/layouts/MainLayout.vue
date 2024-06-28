<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #e91e63">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="settings">
          <q-list>
            <q-item clickable v-close-popup @click="sair">
              <q-item-section>
                <q-item-label>Lougout</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'perfil' }">
              <q-item-section>
                <q-item-label>Meu perfil</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" @click="link.display" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
import useAuth from 'src/composables/useAuth';

const router = useRouter();

const service = useAuth();

const essentialLinks: EssentialLinkProps[] = reactive([
  {
    title: 'Relatórios',
    icon: 'mdi-chart-line',
    routeName: 'relatorios',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Atendimentos',
    icon: 'mdi-view-dashboard',
    routeName: 'atendimentos',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Aprendizes',
    icon: 'mdi-account-multiple',
    routeName: 'aprendizes',
    hide: true,
    display: () => 'none',
  },
  {
    title: 'Treinamentos',
    icon: 'mdi-chart-line-variant',
    routeName: 'treinamentos',
    hide: true,
    display: () => 'none',
  },
]);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const sair = async () => {
  localStorage.clear();
  await service.logout();
  router.replace({ name: 'login' });
};
</script>
