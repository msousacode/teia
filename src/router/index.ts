import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

import { useManagerTokens } from 'src/composables/managerTokens';
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

  const { getToken } = useManagerTokens();

  Router.beforeEach(async (to) => {
    if (to.name !== 'reset-password') {
      const { u, k } = to.query;
      return { name: 'reset-password', query: { u, k } };
    } else if (to.hash.includes('access_token')) {
      if (to.meta.requiresAuth) {
        if (getToken('token') === null) {
          return { name: 'login' };
        }
      }
    }
  });

  return Router;
});
