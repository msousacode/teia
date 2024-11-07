import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

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

    //Esse return faz com que a promisse retorne o id do cliente cadastrado para a função register que chamou essa função
    return api
      .post('/api/v3/paymentLinks', data, this.config)
      .then((response) => {
        //Esse return faz com que a promisse retorne o id do cliente cadastrado
        useNotify().success(response.data.url);
      })
      .catch((err) => {
        console.error(err);
        useNotify().error('Erro ao cadastrar cliente no integrador');
        return null;
      });
  };
}
