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
          <q-input label="Data Final de Treinamento" outlined v-model="formTreinamento.data_final"
            :rules="[(val) => (val && val.length > 0) || 'Data final é obrigatória']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formTreinamento.data_final" :locale="{
    days: dias,
    months: meses,
    daysShort: diasAbreviados,
    monthsShort: meses,
  }" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select class="col-12 q-mb-md" outlined v-model="formTreinamento.repetir"
            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Repetir"
            :readonly="editMode && !storeTreinamento.treinamentoConfig.new" />

          <div class="q-gutter-sm q-mb-md">
            <q-checkbox dense v-model="formTreinamento.seg" label="SEG" color="primary" :readonly="editMode" />
            <q-checkbox dense v-model="formTreinamento.ter" label="TER" color="primary" :readonly="editMode" />
            <q-checkbox dense v-model="formTreinamento.qua" label="QUA" color="primary" :readonly="editMode" />
            <q-checkbox dense v-model="formTreinamento.qui" label="QUI" color="primary" :readonly="editMode" />
            <q-checkbox dense v-model="formTreinamento.sex" label="SEX" color="primary" :readonly="editMode" />
            <q-checkbox dense v-model="formTreinamento.sab" label="SAB" color="primary" :readonly="editMode" />
          </div>
          <q-btn label="Confirmar" color="green" class="full-width q-pa-sm" @click="confirmarConfiguracaoTreinamento" />
        </q-form>

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
          :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Aprendiz é obrigatório' : true]"
          :readonly="editMode" />

        <q-input outlined label="Data Ínicio" type="date" v-model="form.data_inicio"
          :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Data de ínicio obrigatório' : true]"
          :readonly="editMode" />

        <q-btn label="Selecionar Treinamentos" color="info" class="full-width q-pa-sm q-mb-md"
          @click="visible = true" />

        <div class="text-body2 q-mb-sm">Treinamentos</div>
        <div class="q-mb-md">
          <q-list bordered separator v-for="(
              item, index
            ) in storeTreinamento.getTreinamentosSelecionados" :key="index">

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-body1">Treinamento: {{
    item.treinamento
  }}</q-item-label>

                <q-item-label class="q-pa-sm">{{ item.protocolo }}</q-item-label>

                <div v-if="item.configuracoes">
                  <q-item-label class="q-pa-sm">Termina em: {{ item.configuracoes.data_final }}</q-item-label>
                  <q-item-label>Repete: {{ item.configuracoes.repetir }}</q-item-label>
                  <q-item-label>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.seg">
                      {{ item.configuracoes.seg ? 'SEG' : '' }}
                    </q-chip>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.ter">
                      {{ item.configuracoes.ter ? 'TER' : '' }}
                    </q-chip>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.qua">
                      {{ item.configuracoes.qua ? 'QUA' : '' }}
                    </q-chip>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.qui">
                      {{ item.configuracoes.qui ? 'QUI' : '' }}
                    </q-chip>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.sex">
                      {{ item.configuracoes.sex ? 'SEX' : '' }}
                    </q-chip>
                    <q-chip color="primary" text-color="white" v-if="item.configuracoes.sab">
                      {{ item.configuracoes.sab ? 'SAB' : '' }}
                    </q-chip>
                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable v-if="!item.configuracoes">
                        <q-item-section @click="abrirConfiguracoes(item)">Configurar</q-item-section>
                      </q-item>
                      <q-item clickable v-if="item.configuracoes">
                        <q-item-section @click="abrirConfiguracoes(item)">Concluir</q-item-section>
                      </q-item>
                      <q-item clickable v-if="item.configuracoes">
                        <q-item-section @click="abrirConfiguracoes(item)">Deletar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit" @click="salvar"
          :disable="!isSubmitted" />

        <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" rounded flat
          :to="{ name: 'atendimentos' }" />
      </q-form>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useRoute } from 'vue-router';
import TreinamentoList from '../treinamentos/TreinamentoList.vue';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useTreinamentoStore } from 'src/stores/treinamento';
import useNotify from 'src/composables/UseNotify';
import useFormatUtil from 'src/composables/UseFormatUtil';
import {
  dias,
  diasAbreviados,
  meses
} from 'src/composables/utils';

const routeLocation = useRoute();

const editMode = routeLocation.params.action === 'edit';

const uuidAtendimento = routeLocation.params.uuidAtendimento;

const { success, error } = useNotify();

const visible = ref(false);

const visibleConfiguracao = ref(false);

const storeAprendiz = useAprendizStore();

const storeTreinamento = useTreinamentoStore();

const aprendizes = ref<any[]>([]);

const { formatDataDB } = useFormatUtil();

const form = ref({
  uuid: '',
  aprendiz: '',
  data_inicio: '',
  sync: false,
  treinamentos: [{}],
  aprendiz_uuid_fk: '',
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
  semana: 0,
}

const isSubmitted = computed(() => {
  return form.value.data_inicio !== '' && toRaw(form.value.aprendiz) !== '' && storeTreinamento.getTreinamentosSelecionados.length > 0;
});

async function salvar() {

  if (form.value.data_inicio === '') {
    error('Data de início é obrigatória');
  }

  if (storeTreinamento.getTreinamentosSelecionados.length === 0) {
    error('Selecione ao menos um treinamento');
  } else {

    storeTreinamento.getTreinamentosSelecionados.forEach((treinamento) => {
      if (treinamento.configuracoes === undefined) {
        error('Configure todos os treinamentos');
      }
    });
  }

  if (storeTreinamento.treinamentoConfig.new) {
    form.value.treinamentos = storeTreinamento.getTreinamentosSelecionados.map(
      (_treinamento) => {
        return {
          uuid: _treinamento.uuid,
          treinamento: _treinamento.treinamento,
          protocolo: _treinamento.protocolo,
          configuracoes: toRaw(_treinamento.configuracoes),
        };
      }
    );
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);
  data.aprendiz_uuid_fk = form.value.aprendiz.value;

  if (data.aprendiz_uuid_fk === '') {
    error('Selecione um aprendiz');
    throw new Error('Selecione um aprendiz');
  }

  if (storeTreinamento.treinamentoConfig.new && editMode) {

    await db.atendimentos.get({ uuid: uuidAtendimento }).then((res) => {
      let raw = toRaw(res);
      raw?.treinamentos.push(...data.treinamentos);

      if (raw === undefined) {
        error('Não foi possível atualizar os treinamentos do atendimento');
      }

      db.atendimentos.put(raw).catch(() => {
        error('Ocorreu um erro ao tentar atualizar');
      });
    });

  } else if (storeTreinamento.treinamentoConfig.new === undefined && editMode) {
    atualizar();
  } else {
    await db.atendimentos
      .add(data)
      .catch((_error) => {
        error('Ocorreu um erro ao tentar salvar o Atendimento', _error);
      });
  }

  await gerarColetas(data).then(() => {
    reset();
    success("Salvo com sucesso!")
  }).catch(() => {
    throw Error('Ocorreu um erro ao tentar gerar as coletas');
  });
}

function atualizar() {
  console.log('Verificar quando é chamado e porque é usado');
  db.aprendizes
    .update(storeAprendiz.getAprendizUuid, toRaw(form.value))
    .then(() => {
      reset();
      console.log('Atualizado com sucesso');
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar atualizar');
    });
}

function abrirConfiguracoes(item: any) {
  storeTreinamento.$state.treinamentoConfig = item;
  visibleConfiguracao.value = true;
}

function confirmarConfiguracaoTreinamento() {

  validarSeFoiSelecionadoDiaDaSemana();

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

  visibleConfiguracao.value = false
}

async function gerarColetas(data: any) {

  const numeroSemanas = calcularNumeroSemanas(data.data_inicio, data.treinamentos[0].configuracoes.data_final);

  if (numeroSemanas > 12) {
    error('O período de treinamento não pode ser superior há 3 meses.');
    throw new Error('O período de treinamento não pode ser maior que 3 meses.');
  }

  const aprendizUuuiFk = data.aprendiz.value;
  const treinamentoUuidFk = data.treinamentos[0].uuid;
  const quantidadeRepticao = data.treinamentos[0].configuracoes.repetir;
  const seg = data.treinamentos[0].configuracoes.seg;
  const ter = data.treinamentos[0].configuracoes.ter;
  const qua = data.treinamentos[0].configuracoes.qua;
  const qui = data.treinamentos[0].configuracoes.qui;
  const sex = data.treinamentos[0].configuracoes.sex;
  const sab = data.treinamentos[0].configuracoes.sab;

  const diasDaSemana: any[] = [];
  diasDaSemana[0] = { value: 'seg', selected: seg };
  diasDaSemana[1] = { value: 'ter', selected: ter };
  diasDaSemana[2] = { value: 'qua', selected: qua };
  diasDaSemana[3] = { value: 'qui', selected: qui };
  diasDaSemana[4] = { value: 'sex', selected: sex };
  diasDaSemana[5] = { value: 'sab', selected: sab };

  const diasDaSemanaComTreinamento = diasDaSemana.filter((dia) => dia.selected === true);

  const dataFinalColeta = data.treinamentos[0].configuracoes.data_final;

  data.treinamentos.forEach((t: any) => {

    db.alvos.where({ treinamento_uuid_fk: t.uuid }).toArray().then((data) => {
      const raw = toRaw(data)

      raw.forEach((alvo) => {

        let count = 0;
        let countSemana = 0;

        while (count < (quantidadeRepticao * numeroSemanas)) {
          count++;
          countSemana++;

          diasDaSemanaComTreinamento.map((_dia) => {

            coleta.uuid = uuid();
            coleta.aprendiz_uuid_fk = aprendizUuuiFk;
            coleta.treinamento_uuid_fk = treinamentoUuidFk;
            coleta.data_final_coleta = dataFinalColeta;
            coleta.alvo = alvo;

            if (_dia.value === 'seg')
              coleta.seg = diasDaSemana[0].selected;
            else
              coleta.seg = false;

            if (_dia.value === 'ter')
              coleta.ter = diasDaSemana[1].selected;
            else
              coleta.ter = false;

            if (_dia.value === 'qua')
              coleta.qua = diasDaSemana[2].selected;
            else
              coleta.qua = false;

            if (_dia.value === 'qui')
              coleta.qui = diasDaSemana[3].selected;
            else
              coleta.qui = false;

            if (_dia.value === 'sex')
              coleta.sex = diasDaSemana[4].selected;
            else
              coleta.sex = false;

            if (_dia.value === 'sab')
              coleta.sab = diasDaSemana[5].selected;
            else
              coleta.sab = false;

            coleta.semana = countSemana;//contador para identificar a semana da coleta.
            coleta.alvo.identificador = coleta.uuid;//usado para identificar o objeto coleta e permitir a correta atualização da resposta no objeto Coleta.

            db.coletas
              .add(coleta)
              .catch((_error) => {
                error('Ocorreu um erro ao tentar salvar', _error);
              });

          });

          if (countSemana >= numeroSemanas) {//limita o countSemana para não execer o número de semanas.
            countSemana = 0;
          }
        }
      });
    });
  });
}

function calcularNumeroSemanas(dataInicio: string, dataFinal: string) {

  if (dataInicio === undefined || dataFinal === undefined) throw new Error('Não foi possível calcular o número de semanas');

  const dataInicioDate = new Date(dataInicio);
  const dataFinalDate = new Date(formatDataDB(dataFinal));

  const diffTime = Math.abs(dataFinalDate.getTime() - dataInicioDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.ceil(diffDays / 7);
}

function validarSeFoiSelecionadoDiaDaSemana() {
  if (
    !formTreinamento.value.seg &&
    !formTreinamento.value.ter &&
    !formTreinamento.value.qua &&
    !formTreinamento.value.qui &&
    !formTreinamento.value.sex &&
    !formTreinamento.value.sab) {
    error('Informe pelo menos um dia da semana');
    throw new Error('Informe pelo menos um dia da semana');
  }
}

function reset() {
  form.value = {
    uuid: '',
    aprendiz: '',
    data_inicio: '',
    sync: false,
    treinamentos: [{}],
  };

  formTreinamento.value = {
    data_final: '',
    repetir: 1,
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false
  }

  storeAprendiz.$reset();
  storeTreinamento.$reset();
}

onMounted(() => {
  reset();
  if (editMode) {

    const uuidAtendimento = routeLocation.params.uuidAtendimento;

    db.atendimentos.get({ uuid: uuidAtendimento }).then((res) => {
      const raw = toRaw(res);
      form.value = raw;
      storeTreinamento.$state.treinamentosSelecionados = raw.treinamentos;

    });

  } else {
    db.aprendizes.toArray().then((res) => {
      res.forEach((aprendiz) => {
        aprendizes.value.push({
          label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${aprendiz.nasc_aprendiz
            }`,
          value: aprendiz.uuid,
        });
      });
    });
  }
});
</script>
