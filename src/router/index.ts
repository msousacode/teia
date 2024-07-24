import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    if (to.hash.includes('type=recovery') && to.name !== 'reset-password') {
      const accessToken = to.hash.split('&')[0];
      const token = accessToken.replace('#access_token=', '');
      return { name: 'reset-password', query: { token } };
    }

    if (to.hash.includes('access_token')) {
      const accessToken = to.hash.split('=')[1];
      const token = accessToken.replace('#access_token=', '');
      if (token.length > 0) {
        return { name: 'relatorios' };
      } else {
        return { name: 'login' };
      }
    }

    //TODO próximos passos:
    // 1. Criar uma lógica para validar se o token é válido, se expirou, etc.
    // 2. Se o token for inválido ou expirado, redirecionar para a tela de login.
  });

  return Router;
});
