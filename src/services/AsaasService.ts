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

    return api
      .post('/api/v3/paymentLinks', data, this.config)
      .then((response) => {
        //Esse return faz com que a promisse retorne o id do cliente cadastrado
        return response.data.url;
      })
      .catch((err) => {
        this.$q.notify('erro' + err);
      });
  };
}
