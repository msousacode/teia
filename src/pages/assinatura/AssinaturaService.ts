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
    console.log('userId', userId);
    /*
    const { data, error } = await this.supabase
      .from('assinaturas')
      .select('*')
      .eq('userId', userId);
    if (error) throw error;

    if (data[0].tipoAssinatura == 'FREE' && data[0].motivoCancelamento == 3) {
      return 'EXPIRADO';
    }

    return data[0].tipoAssinatura != 'CAN' && data[0].motivoCancelamento == null
      ? 'AUTORIZADO'
      : 'NEGADO';
      */
    return 'AUTORIZADO';
  }
}
