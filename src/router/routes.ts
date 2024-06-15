import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'relatorios',
        path: '/relatorios',
        component: () => import('pages/relatorios/RelatorioPage.vue'),
      },
      {
        name: 'aprendizes',
        path: '/aprendizes',
        component: () => import('pages/aprendizes/AprendizList.vue'),
      },
      {
        name: 'aprendiz-novo',
        path: '/aprendiz-novo/:action?',
        component: () => import('pages/aprendizes/AprendizForm.vue'),
      },
      {
        name: 'treinamentos',
        path: '/treinamentos',
        component: () => import('pages/treinamentos/TreinamentoList.vue'),
      },
      {
        name: 'treinamento-novo',
        path: '/treinamento-novo/:action?',
        component: () => import('pages/treinamentos/TreinamentoForm.vue'),
      },
      {
        name: 'atendimentos',
        path: '/atendimentos',
        component: () => import('pages/atendimentos/AtendimentoList.vue'),
      },
      {
        name: 'atendimento-novo',
        path: '/atendimento-novo/:action?/atendimento/:uuidAtendimento?',
        component: () => import('pages/atendimentos/AtendimentoForm.vue'),
      },
      {
        name: 'coletas',
        path: '/coletas/treinamento/:uuidTreinamento?/aprendiz/:uuidAprendiz?/diaColeta/:diaColeta?/tipoColeta/:tipoColeta?',
        component: () => import('pages/coletas/ColetaList.vue'),
      },
    ],
  },
];

export default routes;
