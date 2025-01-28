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
        path: '/cadastrar/:email?',
        component: () => import('pages/acesso/CadastroPage.vue'),
      },
      {
        name: 'esqueci',
        path: '/esqueci',
        component: () => import('pages/acesso/EsqueciSenhaPage.vue'),
      },
      {
        name: 'reset',
        path: '/reset/u/:u?/k/:k?',
        component: () => import('pages/acesso/NovaSenhaPage.vue'),
      },
      {
        name: 'sucesso',
        path: '/sucesso',
        component: () => import('pages/acesso/PagamentoSucesso.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'expirada',
        name: 'expirada',
        component: () => import('pages/assinatura/AssinaturaExpiradaPage.vue'),
      },
      {
        name: 'assinatura',
        path: '/assinatura/:email?',
        component: () => import('pages/assinatura/AssinaturaPage.vue'),
        meta: { requiresAuth: true },
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
        name: 'profissionais',
        path: '/profissionais',
        component: () => import('pages/profissionais/ProfissionaisList.vue'),
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
        name: 'treinamento-import',
        path: '/treinamento-import',
        component: () => import('pages/treinamentos/TreinamentoImport.vue'),
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
        name: 'avaliacoes-novo',
        path: '/avaliacoes-novo',
        component: () => import('pages/avaliacoes/AvaliacaoForm.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-coleta/vbmapp',
        path: '/avaliacoes-coleta/vbmapp/aprendiz/:aprendizUuid/tipoAvaliacao/:tipoAvaliacao?/avaliacao/:vbmappUuid?',
        component: () => import('pages/avaliacoes/AvaliacaoColeta.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-coleta/portage',
        path: '/avaliacoes-coleta/portage/aprendiz/:aprendizUuid/avaliacao/:portageId',
        component: () =>
          import('pages/avaliacoes/portage/PortageAvaliacaoColeta.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-coleta/ablls',
        path: '/avaliacoes-coleta/ablls/aprendiz/:aprendizUuid/avaliacao/:abllsId/habilidade/:habilidade',
        component: () => import('pages/avaliacoes/ablls/AbllsColeta.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'avaliacoes-coleta/vbmapp/barreiras',
        //path: '/avaliacoes-coleta/vbmapp/aprendiz/:aprendizUuid/tipoAvaliacao/:tipoAvaliacao?/avaliacao/:vbmappUuid?',
        path: '/avaliacoes-coleta/vbmapp/barreiras',
        component: () => import('pages/avaliacoes/AvaliacaoBarreira.vue'),
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
        path: '/coletas/atendimento/:atendimentoId/treinamento/:uuidTreinamento?/aprendiz/:uuidAprendiz?/diaColeta/:diaColeta?/tipoColeta/:tipoColeta?',
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
        name: 'suporte',
        path: '/suporte',
        component: () => import('pages/suporte/SuportePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
