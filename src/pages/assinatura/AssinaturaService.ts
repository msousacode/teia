import useSupabase from 'src/boot/supabase';
import { useUserStore } from 'src/stores/user';
import useUtils from 'src/utils/util';

type statusAssinatura = 'AUTORIZADO' | 'NEGADO' | 'EXPIRADO';

export class AssinaturaService {
  supabase = useSupabase().supabase;

  store = useUserStore();

  utils = useUtils();

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

    const diasRestantes = this.utils.calculateDaysBetween(
      new Date().toISOString(),
      data[0].data_inicio_assinatura
    );

    if (diasRestantes > 7) {
      return 'EXPIRADO';
    }

    /* TODO acredito que essa dupla checagem não seja necessária, avaliar para manter somente o primeiro if diasRestantes.
    if (data[0].tipo_assinatura == 'FREE' && data[0].motivo_cancelamento == 1) {
      return 'EXPIRADO';
    }*/

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
}
