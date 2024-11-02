import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        name: 'loginDefault',
        path: '',
        component: () => import('pages/acesso/LoginSocialPage.vue'),
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('pages/acesso/LoginSocialPage.vue'),
      },
      {
        name: 'cadastrar',
        path: '/cadastrar',
        component: () => import('pages/acesso/CadastroPage.vue'),
      },
      {
        name: 'confirmado',
        path: '/confirmado',
        component: () => import('pages/acesso/CadastroConfirmadoPage.vue'),
      },
      {
        name: 'esqueci',
        path: '/esqueci',
        component: () => import('pages/acesso/EsqueciSenhaPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/acesso/NovaSenhaPage.vue'),
      },
      {
        path: 'expirada',
        name: 'expirada',
        component: () => import('pages/assinatura/AssinaturaExpiradaPage.vue'),
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
        name: 'avaliacoes',
        path: '/avaliacoes',
        component: () => import('pages/avaliacoes/AvaliacaoOpcao.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-info/vbmapp',
        path: '/avaliacoes-info/vbmapp/:tipoAvaliacao?',
        component: () => import('pages/avaliacoes/AvaliacaoVbmappInfo.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-coleta/vbmapp',
        path: '/avaliacoes-coleta/vbmapp/:aprendizUuid',
        component: () => import('pages/avaliacoes/AvaliacaoColeta.vue'),
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
      {
        name: 'perfil',
        path: '/perfil',
        component: () => import('pages/perfil/PerfilPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'assinatura',
        path: '/assinatura',
        component: () => import('pages/assinatura/AssinaturaPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'suporte',
        path: '/suporte',
        component: () => import('pages/suporte/SuportePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
