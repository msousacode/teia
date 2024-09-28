import useSupabase from 'src/boot/supabase';
import { useUserStore } from 'src/stores/user';

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

    this.store.setAssinatura(data[0].tipo_assinatura);
    this.store.setDataInicioAssinatura(data[0].data_inicio_assinatura);

    if (data[0].tipo_assinatura == 'FREE' && data[0].motivo_cancelamento == 1) {
      return 'EXPIRADO';
    }

    return data[0].tipo_assinatura != 'CAN' &&
      data[0].motivo_cancelamento == null
      ? 'AUTORIZADO'
      : 'NEGADO';
  }

  buscarDiasRestantesAssinatura(): string {
    return this.store.getFimAssinatura;
  }
}
