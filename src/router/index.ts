import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

import { useManagerTokens } from 'src/composables/managerTokens';
import useSupabaseApi, { UserSapabase } from 'src/composables/UseSupabaseApi';
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

  const { getTokenDecoded, getToken } = useManagerTokens();

  const supabase = useSupabaseApi();

  Router.beforeEach(async (to) => {
    if (to.hash.includes('type=recovery') && to.name !== 'reset-password') {
      const accessToken = to.hash.split('&')[0];
      const token = accessToken.replace('#access_token=', '');
      return { name: 'reset-password', query: { token } };
    } else if (to.hash.includes('access_token')) {
      const accessToken = to.hash.split('=')[1];

      const encode = getTokenDecoded(accessToken);

      if (encode.aud === 'authenticated') {
        const user: UserSapabase = {
          email: encode.user_metadata.email,
          full_name: encode.user_metadata.full_name,
          avatar_url: encode.user_metadata.picture,
          banco_demonstracao: '3e19d9a2-2587-4d65-b673-181989780416', //Nome do banco que deve ser usado para demonstração.
        };

        const userSupabase = await supabase.getByEmail('usuarios', user.email);

        if (userSupabase === undefined) {
          supabase
            .post('usuarios', user)
            .then(() => {
              Router.replace({ name: 'relatorios' });
            })
            .catch(() => {
              Router.replace({ name: 'login' });
              localStorage.clear();
            });
        } else {
          Router.replace({ name: 'relatorios' });
        }
      } else {
        Router.replace({ name: 'login' });
      }
    }
    if (to.meta.requiresAuth) {
      if (getToken() === null) {
        return { name: 'login' };
      }
    }
  });

  return Router;
});
