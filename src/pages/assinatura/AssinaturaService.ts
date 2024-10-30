import useSupabase from 'src/boot/supabase';
import useSupabaseApi from 'src/composables/UseSupabaseApi';
import { useManagerTokens } from 'src/composables/managerTokens';
import { useUserStore } from 'src/stores/user';
import useUtils from 'src/utils/util';

type statusAssinatura = 'AUTORIZADO' | 'NEGADO' | 'EXPIRADO';

const { getByEmail } = useSupabaseApi();

export class AssinaturaService {
  supabase = useSupabase().supabase;

  store = useUserStore();

  utils = useUtils();

  userToken = useManagerTokens();

  supabaseApi = useSupabaseApi();

  async validarAssinaturaPagante(): Promise<statusAssinatura> {
    const userId = this.store.id; //bucar do pínia

    const { data, error } = await this.supabase
      .from('assinaturas')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    if (data.length === 0) {
      return 'NEGADO';
    }

    this.store.setAssinatura(data[0].tipo_assinatura);
    this.store.setDataInicioAssinatura(data[0].data_inicio_assinatura);

    if (data[0].tipo_assinatura == 'FREE') {
      const diasRestantes = this.utils.calculateDaysBetween(
        new Date().toISOString(),
        data[0].data_inicio_assinatura
      );

      if (diasRestantes > 7) {
        return 'EXPIRADO';
      }
    }

    return data[0].tipo_assinatura != 'CAN' &&
      data[0].motivo_cancelamento == null
      ? 'AUTORIZADO'
      : 'NEGADO';
  }

  salvaDiasRestantesAssinatura() {
    localStorage.setItem(
      'periodoTeste',
      this.store.getFimAssinatura.toString()
    );
  }

  async criarAssinatura() {
    const user = localStorage.getItem('sb-admyhroxjebmgrdakhza-auth-token');

    if (!user) {
      throw new Error('Não foi possível recuperar o token do usuário');
    }

    const userDadosBasicos = this.userToken.getDadosBasicos(user);

    await getByEmail('usuarios', userDadosBasicos.email).then((res) => {
      const assinatura = {
        user_id: res.id,
        tipo_assinatura: 'FREE',
      };

      this.supabaseApi.post('assinaturas', assinatura);
    });
  }
}
