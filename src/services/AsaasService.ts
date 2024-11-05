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
      .post('/api/v3/paymentLinks/', data, this.config)
      .then((res) => {
        window.location.href = res.data.url;
        this.$q.loading.hide();
      })
      .catch(() => {
        this.$q.loading.hide();
      });
  };
}
