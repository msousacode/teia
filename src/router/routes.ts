import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        name: 'loginDefault',
        path: '',
        component: () => import('pages/acesso/LoginPage.vue'),
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('pages/acesso/LoginPage.vue'),
      },
      {
        name: 'cadastrar',
        path: '/cadastrar',
        component: () => import('pages/acesso/CadastroPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'relatorios',
        path: '/relatorios',
        component: () => import('pages/relatorios/RelatorioPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'aprendizes',
        path: '/aprendizes',
        component: () => import('pages/aprendizes/AprendizList.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'aprendiz-novo',
        path: '/aprendiz-novo/:action?',
        component: () => import('pages/aprendizes/AprendizForm.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'treinamentos',
        path: '/treinamentos',
        component: () => import('pages/treinamentos/TreinamentoList.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'treinamento-novo',
        path: '/treinamento-novo/:action?',
        component: () => import('pages/treinamentos/TreinamentoForm.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'atendimentos',
        path: '/atendimentos',
        component: () => import('pages/atendimentos/AtendimentoList.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'atendimento-novo',
        path: '/atendimento-novo/:action?/atendimento/:uuidAtendimento?',
        component: () => import('pages/atendimentos/AtendimentoForm.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'coletas',
        path: '/coletas/treinamento/:uuidTreinamento?/aprendiz/:uuidAprendiz?/diaColeta/:diaColeta?/tipoColeta/:tipoColeta?',
        component: () => import('pages/coletas/ColetaList.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
