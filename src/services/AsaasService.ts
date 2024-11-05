import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export class AsaasService {
  config = {
    headers: {
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      access_token: process.env.ASSAS_KEY,
      'content-type': 'application/json',
    },
  };

  router = useRouter();

  $q = useQuasar();

  criarLinkPagamento = (billingType: string, value: number) => {
    const data = {
      billingType: 'CREDIT_CARD',
      chargeType: 'RECURRENT',
      subscriptionCycle: billingType,
      value: value,
    };

    this.$q.loading.show();
    api
      .post('/api/v3/paymentLinks', data, this.config)
      .then(() => {
        window.location.href = 'www.google.com';

        this.$q.loading.hide();
        this.$q.notify('sucesso');
      })
      .catch(() => {
        this.$q.loading.hide();
        this.$q.notify('erro');
      });
  };
}
