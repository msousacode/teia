import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'painel',
        path: '/painel',
        component: () => import('pages/painel/PainelPage.vue'),
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
        name: 'editar-membro',
        path: 'editar/membro',
        component: () => import('pages/membro/MembroForm.vue'),
      },

      {
        name: 'editar-terreiro',
        path: 'editar/terreiro',
        component: () => import('pages/terreiro/TerreiroForm.vue'),
      },

      {
        name: 'despesas',
        path: '/despesas',
        component: () => import('pages/despesa/DespesaList.vue'),
      },
      {
        name: 'nova-despesa',
        path: 'nova/despesa',
        component: () => import('pages/despesa/DespesaForm.vue'),
      },
      {
        name: 'editar-despesa',
        path: 'editar/despesa',
        component: () => import('pages/despesa/DespesaForm.vue'),
      },

      {
        name: 'receitas',
        path: '/receitas',
        component: () => import('pages/receita/ReceitaList.vue'),
      },
      {
        name: 'nova-receita',
        path: 'nova/receita',
        component: () => import('pages/receita/ReceitaForm.vue'),
      },
      {
        name: 'editar-receita',
        path: 'editar/receita',
        component: () => import('pages/receita/ReceitaForm.vue'),
      },

      {
        name: 'oracoes',
        path: '/oracoes',
        component: () => import('pages/oracao/OracaoList.vue'),
      },
      {
        name: 'nova-oracao',
        path: 'nova/oracao',
        component: () => import('pages/oracao/OracaoForm.vue'),
      },
      {
        name: 'editar-oracao',
        path: 'editar/oracao',
        component: () => import('pages/oracao/OracaoForm.vue'),
      },

      {
        name: 'eventos',
        path: '/eventos',
        component: () => import('pages/evento/EventoList.vue'),
      },
      {
        name: 'eventos-publico',
        path: '/eventos-publico',
        component: () => import('pages/evento/EventoPublicList.vue'),
      },
      {
        name: 'novo-evento',
        path: 'novo/evento',
        component: () => import('pages/evento/EventoForm.vue'),
      },
      {
        name: 'editar-evento',
        path: 'editar/evento',
        component: () => import('pages/evento/EventoForm.vue'),
      },
      {
        name: 'assinatura',
        path: '/assinatura',
        component: () => import('pages/assinatura/AssinaturaPage.vue'),
      },
      {
        name: 'doacao',
        path: '/doacao',
        component: () => import('pages/assinatura/PagamentoPage.vue'),
      },
      {
        name: 'pagamento',
        path: '/pagamento',
        component: () => import('pages/assinatura/PagamentoPage.vue'),
      },
      {
        name: 'pagamento',
        path: '/pagamento',
        component: () => import('pages/assinatura/PagamentoPage.vue'),
      },
      {
        name: 'pagamento-ok',
        path: '/pagamento-ok',
        component: () => import('pages/assinatura/PagamentoOkPage.vue'),
      },
      {
        name: 'contribuicao',
        path: '/contribuicao',
        component: () => import('pages/contribuicao/ContribuicaoList.vue'),
      },
    ],
  },
  {
    name: 'entrar',
    path: '/entrar',
    component: () => import('pages/acesso/LoginPage.vue'),
  },
  {
    name: 'cadastro',
    path: '/cadastro',
    component: () => import('pages/acesso/CadastroPage.vue'),
  },
  {
    path: '/app',
    component: () => import('pages/landingPage/LandingPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
