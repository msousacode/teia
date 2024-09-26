import useSupabase from 'src/boot/supabase';
import { useUserStore } from 'src/stores/user';

/* representação da tabela assinaturas do banco de dados
interface Assinatura {
  id: string;
  created_at: string;
  dataInicioAssinatura: string;
  dataInicioFinal: string;
  dataContratacao: string;
  tipoAssinatura: string;
  dataCancelamento: string;
  motivoCancelamento: string;
  userId: string;
}
*/

type statusAssinatura = 'AUTORIZADO' | 'NEGADO' | 'EXPIRADO';

export class AssinaturaService {
  supabase = useSupabase().supabase;

  store = useUserStore();

  async validarAssinaturaPagante(): Promise<statusAssinatura> {
    const userId = this.store.id; //bucar do pínia

    const { data, error } = await this.supabase
      .from('assinaturas')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    console.log('data', data[0]);
    if (data[0].tipo_assinatura == 'FREE' && data[0].motivo_cancelamento == 3) {
      return 'EXPIRADO';
    }

    return data[0].tipo_assinatura != 'CAN' &&
      data[0].motivo_cancelamento == null
      ? 'AUTORIZADO'
      : 'NEGADO';
  }
}
