<template>
  <q-dialog v-model="visible">
    <q-card class="my-card">
      <TreinamentoList :selecionar-treinamento="true" />
    </q-card>
  </q-dialog>
  <q-dialog v-model="visibleConfiguracao">
    <q-card class="my-card">
      <div class="q-pa-md">
        <q-banner class="bg-blue-1 text-blue-9 q-mb-md">
          <span class="text-body1">Informe a data final do treinamento, a quantidade de vezes que o objetivo
            será praticado durante a sessão e informe os dias da semana que o treinamento se realizará.
          </span></q-banner>
      </div>
      <q-form class="col-sm-12 q-pa-md">
        <q-input stack-label label="Data Final de Treinamento" outlined v-model="formTreinamento.data_final"
          mask="##/##/####" :rules="[(val) => (val && val.length > 0) || 'Data final é obrigatória']">
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
        <q-btn label="Confirmar" color="green" no-caps class="full-width q-pa-sm"
          @click="confirmarConfiguracaoTreinamento" />
      </q-form>

    </q-card>
  </q-dialog>

  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-card class="q-pa-md q-mt-sm col-md-7 col-xs-12 col-sm-12">
        <q-form>
          <title-custom title="Atendimentos" />
          <q-select stack-label outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
            :rules="[(val) => isSubmitted && !editMode ? (val && val.length > 0) || 'Aprendiz é obrigatório' : true]"
            :readonly="editMode" />
          <q-input stack-label label="Data início do treinamento" outlined v-model="form.data_inicio" mask="##/##/####"
            v-show="!editMode"
            :rules="[val => isSubmitted ? (val && val.length > 0) || 'Início do treinamento é obrigatório' : true]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.data_inicio" :locale="{
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

          <div class="q-gutter-x-md row justify-end q-mb-md">
            <q-btn color="secondary" @click="visible = true" v-if="!editMode">Escolher Treinamentos</q-btn>
          </div>

          <div class="q-gutter-y-md">
            <q-list bordered separator v-for="(
item, index
            ) in storeTreinamento.getTreinamentosSelecionados" :key="index">

              <q-item clickable v-ripple :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                <q-item-section>
                  <div><b class="text-teal">Treinamento:</b></div>
                  <q-item-label>{{ item.treinamento }}</q-item-label>

                  <div><b class="text-teal">Protocolo:</b></div>
                  <q-item-label>{{ item.protocolo }}</q-item-label>

                  <div v-if="item.configuracoes">
                    <div><b class="text-teal">Período:</b></div>
                    <q-item-label>{{ `${form.data_inicio} até ${item.configuracoes.data_final}`
                      }}</q-item-label>
                    <div><b class="text-teal">Repetir:</b></div>
                    <q-item-label>{{ item.configuracoes.repetir }} por sessão</q-item-label>
                    <q-item-label>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.seg">
                        {{ item.configuracoes.seg ? 'SEG' : '' }}
                      </q-chip>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.ter">
                        {{ item.configuracoes.ter ? 'TER' : '' }}
                      </q-chip>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.qua">
                        {{ item.configuracoes.qua ? 'QUA' : '' }}
                      </q-chip>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.qui">
                        {{ item.configuracoes.qui ? 'QUI' : '' }}
                      </q-chip>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.sex">
                        {{ item.configuracoes.sex ? 'SEX' : '' }}
                      </q-chip>
                      <q-chip color="pink-4" text-color="white" v-if="item.configuracoes.sab">
                        {{ item.configuracoes.sab ? 'SAB' : '' }}
                      </q-chip>
                    </q-item-label>
                  </div>
                </q-item-section>
                <q-item-section side>
                  <div class="col-auto q-gutter-x-sm">
                    <q-btn icon="settings" color="teal" dense size="md" @click="abrirConfiguracoes(item)"
                      v-if="!editMode">
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </q-form>

      </q-card>
    </div>

    <div class="row justify-center">
      <q-card class="q-pa-md q-mt-sm col-md-7 col-xs-12 col-sm-12">
        <div class="q-gutter-x-md row justify-end">
          <q-btn color="info" :to="{ name: 'atendimentos' }">Voltar</q-btn>
          <q-btn color="positive" @click="salvar" :disable="!isSubmitted" v-if="!editMode">Salvar</q-btn>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import TreinamentoList from '../treinamentos/TreinamentoList.vue';
import { useAprendizStore } from 'src/stores/aprendiz';
import { useTreinamentoStore } from 'src/stores/treinamento';
import useNotify from 'src/composables/UseNotify';
import useFormatUtil from 'src/composables/UseFormatUtil';
import TitleCustom from 'src/components/TitleCustom.vue';

import {
  dias,
  diasAbreviados,
  meses
} from 'src/composables/utils';
import { useQuasar } from 'quasar';
import { AtendimentoService } from 'src/services/AtendimentoService';
import { AprendizService } from 'src/services/AprendizService';
import { ColetaService } from 'src/services/ColetaService';
import { AlvoService } from 'src/services/AlvoService';
import { v4 as uuid } from 'uuid';

const atendimentoService = new AtendimentoService();

const alvoService = new AlvoService();

const coletaService = new ColetaService();

const aprendizService = new AprendizService();

const routeLocation = useRoute();

const editMode = routeLocation.params.action === 'edit';

//const uuidAtendimento = routeLocation.params.uuidAtendimento;

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

const isSubmitted = computed(() => {
  return form.value.data_inicio !== '' && toRaw(form.value.aprendiz) !== '' && storeTreinamento.getTreinamentosSelecionados.length > 0 && isTodosTreinamentosConfigurados.value;
});

const $q = useQuasar();

const isTodosTreinamentosConfigurados = computed(() => {
  const treinamentos = storeTreinamento.getTreinamentosSelecionados;
  return treinamentos.every(treinamento => treinamento.configuracoes !== undefined);
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
          uuid: _treinamento.treinamentoId,
          treinamento: _treinamento.treinamento,
          protocolo: _treinamento.protocolo,
          ativo: true,
          configuracoes: toRaw(_treinamento.configuracoes),
        };
      }
    );
  }

  const object = toRaw(form.value);
  object.aprendiz_uuid_fk = form.value.aprendiz.value;

  if (object.aprendiz_uuid_fk === '') {
    error('Selecione um aprendiz');
    throw new Error('Selecione um aprendiz');
  }

  if (storeTreinamento.treinamentoConfig.new && editMode) {


    /*
    TODO fazer o autualizar atendimentos
    await db.atendimentos.get({ uuid: uuidAtendimento }).then((res) => {
      let raw = toRaw(res);

      const treinamentoUuids = raw?.treinamentos.map((treinamento) => treinamento.uuid);

      //Retira a duplicidade de treinamentos que acontece com os dados que vem do formulário.
      const treinamentosSemDuplicacidade = object.treinamentos.filter(n => !treinamentoUuids?.includes(n.uuid));

      raw?.treinamentos.push(...treinamentosSemDuplicacidade);

      if (raw === undefined) {
        error('Não foi possível atualizar os treinamentos do atendimento');
      }

      db.atendimentos.put(raw).catch(() => {
        error('Ocorreu um erro ao tentar atualizar');
      });
    });
    */

  } else if (storeTreinamento.treinamentoConfig.new === undefined && editMode) {
    atualizar();
  } else {

    try {
      $q.loading.show();
      const { data, status } = await atendimentoService.postAtendimento(object);
      if (data != null || status == 200) {
        await gerarColetas(object).then(() => {
          reset();
        }).catch(() => {
          throw Error('Ocorreu um erro ao tentar gerar as coletas');
        });

      } else {
        error('Erro ao tentar salvar.');
      }
    } catch (e) {
      error('Erro ao tentar salvar.');
    } finally {
      $q.loading.hide();
    }
  }
}

function atualizar() {

  /*
  TODO Fazer o atualizar
  db.aprendizes
    .update(storeAprendiz.getAprendizUuid, toRaw(form.value))
    .then(() => {
      reset();
      console.log('Atualizado com sucesso');
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar atualizar');
    });
    */
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
        treinamento.treinamentoId === storeTreinamento.treinamentoConfig.treinamentoId
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
    error('O período de treinamento não pode ser superior a 3 meses.');
    return;
  }

  const aprendizUuuiFk = data.aprendiz.value;
  const coletas: any[] = []; // Array para armazenar todas as coletas

  for (const treino of data.treinamentos) {
    const quantidadeRepeticao = treino.configuracoes.repetir;
    const diasDaSemana = [
      { value: 'seg', selected: treino.configuracoes.seg },
      { value: 'ter', selected: treino.configuracoes.ter },
      { value: 'qua', selected: treino.configuracoes.qua },
      { value: 'qui', selected: treino.configuracoes.qui },
      { value: 'sex', selected: treino.configuracoes.sex },
      { value: 'sab', selected: treino.configuracoes.sab },
    ];

    const diasDaSemanaComTreinamento = diasDaSemana.filter(dia => dia.selected);

    const { data: alvos } = await alvoService.getAlvosByTreinamento(treino.uuid);
    const raw = toRaw(alvos);

    for (const alvo of raw) {
      let count = 0;
      let countSemana = 0;

      while (count < quantidadeRepeticao * numeroSemanas) {
        count++;
        countSemana++;

        diasDaSemanaComTreinamento.forEach(_dia => {
          const coleta = {
            aprendiz_uuid_fk: aprendizUuuiFk,
            treinamento_uuid_fk: treino.uuid,
            data_final_coleta: treino.configuracoes.data_final,
            alvo: { ...alvo, identificador: uuid() },
            seg: _dia.value === 'seg',
            ter: _dia.value === 'ter',
            qua: _dia.value === 'qua',
            qui: _dia.value === 'qui',
            sex: _dia.value === 'sex',
            sab: _dia.value === 'sab',
            semana: countSemana,
          };

          coletas.push(coleta); // Adiciona a coleta ao array
        });

        if (countSemana >= numeroSemanas) {
          countSemana = 0;
        }
      }
    }
  }

  // Envia todas as coletas de uma vez
  try {
    const { status } = await coletaService.postColeta(coletas); // Envio em lote
    if (status === 200) {
      success('Coletas geradas com sucesso!');
    } else {
      error('Ocorreu um erro ao tentar salvar as coletas.');
    }
  } catch (e) {
    error('Erro ao enviar coletas,');
  }
}

function calcularNumeroSemanas(dataInicio: string, dataFinal: string) {

  if (dataInicio === undefined || dataFinal === undefined) throw new Error('Não foi possível calcular o número de semanas');

  const dataInicioDate = new Date(formatDataDB(dataInicio));
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
    aprendiz_uuid_fk: '',
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
/*
function excluir(treinamento: any) {
  console.log(treinamento)
  $q.dialog({
    title: 'Confirma a exclusão do Treinamento?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {

      /* TODO fazer a exclusão
      db.atendimentos.get({ uuid: uuidAtendimento })
        .then(async (res) => {
          let atendimentoRaw = toRaw(res);
          let treinamentoRaw = toRaw(treinamento);
          const treinamentoInativo = await atualizaStatusTreinamentoParaInativo(atendimentoRaw, treinamentoRaw);
          salvarAtendimentoTreinamento(atendimentoRaw, treinamentoInativo);
          arquivarColetas(treinamento);
        }).then(() => {
          success('Arquivado com sucesso');
        }).catch(() => {
          error('Ocorreu um erro ao tentar arquivar');
        });
        */
//})
//.onDismiss(() => { });
//}

/**
async function atualizaStatusTreinamentoParaInativo(atendimentoRaw: any, treinamentoRaw: any) {
  await atendimentoRaw?.treinamentos.forEach((data: any) => {
    if (data.uuid == treinamentoRaw.uuid) {
      treinamentoRaw.ativo = false;
    }
  });
  return treinamentoRaw;
}*/
/**
 * TODO fazer esse tmb
function salvarAtendimentoTreinamento(atendimentoRaw: any, treinamentoInativo: any) {

  atendimentoRaw.treinamentos = atendimentoRaw.treinamentos.map((treinamento: any) => {
    if (treinamento.treinamentoId === treinamentoInativo.treinamentoId) {
      return treinamentoInativo;
    }
    return treinamento;
  });

  db.atendimentos.put(atendimentoRaw).catch(() => {
    error('Ocorreu um erro ao tentar arquivar');
  });
}

function arquivarColetas(item: any) {
  db.coletas.where({ aprendiz_uuid_fk: form.value.aprendiz.value, treinamento_uuid_fk: item.uuid }).toArray().then((res) => {
    const raw = toRaw(res);
    raw.forEach((coleta) => {
      db.coletas.update(coleta.uuid, { ativo: false }).then(() => {
        success('Arquivado com sucesso');
      }).catch(() => {
        error('Ocorreu um erro ao tentar arquivar');
      });
    });
  });
}
 */

async function carregarAtendimentosTreinamentos() {
  if (editMode) {
    const uuidAtendimento = routeLocation.params.uuidAtendimento;
    try {
      $q.loading.show();
      const { data } = await atendimentoService.getAtendimentoById(uuidAtendimento);

      if (data) {
        const raw = toRaw(data);
        form.value = raw;
        storeTreinamento.$state.treinamentosSelecionados = raw.treinamentos.filter((treinamento: any) => treinamento.ativo == true);

      } else {
        error('Erro ao carregar atendimentos.');
      }
    } catch (e) {
      error('Erro ao carregar atendimentos.');
      throw e;
    } finally {
      $q.loading.hide();
    }
  }
}

async function carregarSelectAprendizes() {
  if (!editMode) {

    try {
      $q.loading.show();
      const { data } = await aprendizService.getAprendizes();
      if (data) {
        data.filter(i => i.ativo === true).forEach((item: any) => {
          aprendizes.value.push({
            label: item.nome_aprendiz,
            value: item.uuid,
          });
        });
      } else {
        error('Erro ao carregar aprendizes.')
      }

    } catch (e) {
      error('Erro ao carregar aprendizes.')
    } finally {
      $q.loading.hide();
    }
  }
}

onMounted(() => {
  reset();
  carregarAtendimentosTreinamentos()
  carregarSelectAprendizes()
});
</script>
