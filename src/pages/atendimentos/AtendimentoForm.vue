<template>
  <q-dialog v-model="visible">
    <q-card class="my-card">
      <TreinamentoList :selecionar-treinamento="true" />
    </q-card>
  </q-dialog>

  <q-dialog v-model="visibleConfiguracao">
    <q-card class="my-card">
      <div class="row q-pa-md">
        <q-banner class="bg-blue-1 text-blue-9 q-mb-md">
          <span class="text-body1">Configure a quantidade de vezes que os alvos serão praticados na
            semana e indique os dias da semana que o alvo será praticado.</span></q-banner>

        <q-form class="col-md-7 col-xs-12 col-sm-12">
          <q-input outlined label="Data Final de Treinamento" type="date" v-model="formTreinamento.data_final"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

          <q-select class="col-12 q-mb-md" outlined v-model="formTreinamento.repetir"
            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Repetir"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

          <div class="q-gutter-sm q-mb-md">
            <q-checkbox dense v-model="formTreinamento.seg" label="SEG" color="teal" />
            <q-checkbox dense v-model="formTreinamento.ter" label="TER" color="teal" />
            <q-checkbox dense v-model="formTreinamento.qua" label="QUA" color="teal" />
            <q-checkbox dense v-model="formTreinamento.qui" label="QUI" color="teal" />
            <q-checkbox dense v-model="formTreinamento.sex" label="SEX" color="teal" />
            <q-checkbox dense v-model="formTreinamento.sab" label="SAB" color="teal" />
          </div>
        </q-form>

        <q-btn label="Confirmar" color="green" class="full-width q-mb-md" rounded
          @click="handleSelecionarConfigTreinamento" v-close-popup />
      </div>
    </q-card>
  </q-dialog>

  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Atendimento</p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12">
        <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-input outlined label="Data Ínicio" type="date" v-model="form.data_inicio"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-btn label="Selecionar Treinamentos" color="primary" class="full-width q-mb-md" type="submit"
          @click="visible = true" />

        <div class="text-body2 q-mb-sm">Treinamentos</div>
        <div class="q-mb-md">
          <q-list bordered separator v-for="(
              item, index
            ) in storeTreinamento.getTreinamentosSelecionados" :key="index">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-body1">{{
    item.treinamento
  }}</q-item-label>
                <q-item-label caption>{{ item.protocolo }}</q-item-label>

                <div v-if="item.configuracoes">
                  <q-item-label caption>Repete: {{ item.configuracoes.repetir }}</q-item-label>
                  <q-item-label caption>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.seg">
                      {{ item.configuracoes.seg ? 'SEG' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.ter">
                      {{ item.configuracoes.ter ? 'TER' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.qua">
                      {{ item.configuracoes.qua ? 'QUA' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.qui">
                      {{ item.configuracoes.qui ? 'QUI' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.sex">
                      {{ item.configuracoes.sex ? 'SEX' : '' }}
                    </q-chip>
                    <q-chip color="brown-5" text-color="white" v-if="item.configuracoes.sab">
                      {{ item.configuracoes.sab ? 'SAB' : '' }}
                    </q-chip>
                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn dense label="Configurar" color="teal" @click="handleOpenConfig(item)" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-btn label="Salvar" color="green" class="full-width q-mb-md" type="submit" @click="handleSubmit" />

        <q-btn label="Voltar" color="primary" class="full-width q-mb-md" rounded flat :to="{ name: 'atendimentos' }" />
      </q-form>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useRoute } from 'vue-router';
import { liveQuery } from 'dexie';
import TreinamentoList from '../treinamentos/TreinamentoList.vue';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useTreinamentoStore } from 'src/stores/treinamento';

const visible = ref(false);

const visibleConfiguracao = ref(false);

const storeAprendiz = useAprendizStore();

const storeTreinamento = useTreinamentoStore();

const routeLocation = useRoute();

const aprendizes = ref<any[]>([]);

const form = ref({
  uuid: '',
  aprendiz: '',
  data_inicio: '',
  sync: false,
  treinamentos: [{}],
});

const formTreinamento = ref({
  data_final: '',
  repetir: 1,
  seg: false,
  ter: false,
  qua: false,
  qui: false,
  sex: false,
  sab: false,
});

function handleSubmit() {
  form.value.treinamentos = storeTreinamento.getTreinamentosSelecionados.map(
    (treinamento) => {
      return {
        uuid: treinamento.uuid,
        treinamento: treinamento.treinamento,
        protocolo: treinamento.protocolo,
        configuracoes: toRaw(treinamento.configuracoes),
      };
    }
  );

  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.atendimentos
    .add(data)
    .then(() => {
      handleGerarColetas(data);
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar salvar');
    });
}

function handleUpdate() {
  db.aprendizes
    .update(storeAprendiz.getAprendizUuid, toRaw(form.value))
    .then(() => {
      console.log('Atualizado com sucesso');
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar atualizar');
    });
}

function handleOpenConfig(item: any) {
  storeTreinamento.$state.treinamentoConfig = item;
  visibleConfiguracao.value = true;
}

function handleSelecionarConfigTreinamento() {
  storeTreinamento.treinamentosSelecionados
    .filter(
      (treinamento) =>
        treinamento.uuid === storeTreinamento.treinamentoConfig.uuid
    )
    .map((treinamento) => {
      treinamento.configuracoes = toRaw(formTreinamento.value);
    });

  formTreinamento.value = {
    data_final: '',
    repetir: 1,
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false,
  };
}

const coleta = {
  uuid: uuid(),
  aprendiz_uuid_fk: '',
  treinamento_uuid_fk: '',
  data_coleta: '',
  resposta: '',
  sync: false,
  foi_respondido: false,
  alvo: { identificador: '' },
  data_final_coleta: '',
  seg: false,
  ter: false,
  qua: false,
  qui: false,
  sex: false,
  sab: false,
}

function handleGerarColetas(data: any) {

  const aprendizUuuiFk = data.aprendiz.value;
  const treinamentoUuidFk = data.treinamentos[0].uuid;
  const quantidadeRepticao = data.treinamentos[0].configuracoes.repetir;
  const seg = data.treinamentos[0].configuracoes.seg;
  const ter = data.treinamentos[0].configuracoes.ter;
  const qua = data.treinamentos[0].configuracoes.qua;
  const qui = data.treinamentos[0].configuracoes.qui;
  const sex = data.treinamentos[0].configuracoes.sex;
  const sab = data.treinamentos[0].configuracoes.sab;

  const dataFinalColeta = data.treinamentos[0].configuracoes.data_final;

  liveQuery(() => db.alvos.where({ treinamento_uuid_fk: treinamentoUuidFk }).toArray()).subscribe((data) => {
    const raw = toRaw(data)

    raw.forEach((alvo) => {

      let count = 0;

      while (count < quantidadeRepticao) {
        count++;


        coleta.uuid = uuid();
        coleta.aprendiz_uuid_fk = aprendizUuuiFk;
        coleta.treinamento_uuid_fk = treinamentoUuidFk;
        coleta.data_final_coleta = dataFinalColeta;
        coleta.alvo = alvo;
        coleta.seg = seg;
        coleta.ter = ter;
        coleta.qua = qua;
        coleta.qui = qui;
        coleta.sex = sex;
        coleta.sab = sab;

        coleta.alvo.identificador = coleta.uuid;//usado para identificar o objeto coleta e permitir a correta atualização da resposta no objeto Coleta.

        db.coletas
          .add(coleta)
          .then((res) => {
            console.log('Coleta gerada com sucesso' + res);
          })
          .catch(() => {
            throw Error('Ocorreu um erro ao tentar salvar');
          });
      }
    });
  });
}

onMounted(() => {
  liveQuery(() => db.aprendizes.toArray()).subscribe((res) => {
    res.forEach((aprendiz) => {
      aprendizes.value.push({
        label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${aprendiz.nasc_aprendiz
          }`,
        value: aprendiz.uuid,
      });
    });
  });
});
</script>
