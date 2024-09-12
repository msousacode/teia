<template>
  <!-- Modal que abre o cadastro do alvo-->
  <q-dialog v-model="visible">
    <q-card class="full-width">
      <q-card-section>
        <title-custom title="Cadastro de Objetivo" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="salvarAlvo">
          <q-select outlined v-model="form.tipo_aprendizado" :options="aprendizados" label="Tipo de Aprendizado"
            :rules="[(val) => (val && val.length > 0) || 'Tipo de aprendizado é obrigatório']" />

          <q-input outlined label="Nome do Objetivo" v-model="form.nome_alvo"
            :rules="[(val) => (val && val.length > 0) || 'Nome do Objetivo é obrigatório']" />

          <q-input outlined label="Pergunta" v-model="form.pergunta" type="textarea" autogrow />

          <q-input outlined label="Descrição do Objetivo" v-model="form.descricao_alvo" type="textarea"
            class="q-mt-md" />

          <q-btn label="Salvar" class="full-width q-pa-sm q-mt-md" no-caps color="primary" type="submit" />
        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>

  <div v-for="(item, index) in alvos" :key="index" class="q-pa-sm">
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <span class="text-subtitle2 text-teal">Nome do Objetivo: </span>
            <div class="text-subtitle1">{{ item.nome_alvo }}</div>

            <span class="text-subtitle2 text-teal">Tipo de aprendizado: </span>
            <div class="text-subtitle1">{{ item.tipo_aprendizado }}</div>

            <span class="text-subtitle2 text-teal">Pergunta: </span>
            <div class="text-subtitle1">{{ item.pergunta }}</div>

            <span class="text-subtitle2 text-teal">Descrição do Objetivo: </span>
            <div class="text-subtitle1">{{ item.descricao_alvo }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section @click="editarAlvo(item)">Editar</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="deletarAlvo(item)">Remover</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="mdi-plus" color="primary" @click="visible = true" />
  </q-page-sticky>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import TitleCustom from 'src/components/TitleCustom.vue';

const $q = useQuasar();

const { success, error } = useNotify();

const routeLocation = useRoute();

const store = useTreinamentoStore();

const visible = ref(false);

const alvos = ref<any>([]);

const aprendizados = [
  'Habilidades de Atenção',
  'Habilidades de Imitação',
  'Habilidades de Linguagem Receptiva',
  'Habilidades de Linguagem Expressiva',
  'Habilidades Pré-Acadêmicas',
];

const form = ref({
  uuid: '',
  nome_alvo: '',
  pergunta: '',
  descricao_alvo: '',
  treinamento_uuid_fk: store.getTreinamentoUuid,
  tipo_aprendizado: 'Habilidades de Atenção',
});

async function salvarAlvo() {

  if (form.value.uuid) {
    await db.alvos.put(toRaw(form.value)).then(() => {
      visible.value = false;
      success("Alvo atualizado com sucesso");
    }).catch((_error) => {
      error("Ocorreu um erro ao atualizar a anotação: ", _error);
    });

    visible.value = false;

    form.value = {
      uuid: '',
      nome_alvo: '',
      pergunta: '',
      descricao_alvo: '',
      treinamento_uuid_fk: store.getTreinamentoUuid,
      tipo_aprendizado: 'Habilidades de Atenção',
    };

    return;
  }

  if (
    form.value.treinamento_uuid_fk === '' ||
    form.value.treinamento_uuid_fk === null
  ) {
    throw new Error('Treinamento não informado');
  }

  form.value.uuid = uuid();

  const data = toRaw(form.value);

  db.alvos
    .add(data)
    .then(() => {
      getAlvos();
      visible.value = false;
      reset();
      success();
    })
    .catch((_error) => {
      error(_error);
    });
}

function getAlvos() {
  db.alvos
    .where({ treinamento_uuid_fk: store.getTreinamentoUuid })
    .toArray()
    .then((data) => {
      alvos.value = toRaw(data);
    }).catch((_error) => {
      error('Erro ao consultar alvos', _error);
    });
}

function editarAlvo(item: any) {
  form.value = toRaw(item);
  visible.value = true;
}

function deletarAlvo(item: any) {

  $q.dialog({
    title: 'Confirma a exclusão do Alvo?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {
      db.alvos
        .delete(item.uuid)
        .then(() => {
          getAlvos();
          reset();
          success();
        })
        .catch((_error) => {
          error('Erro ao tentar deletar o alvo', _error);
        });
    })
    .onDismiss(() => { });
}

function reset() {
  form.value = {
    uuid: '',
    nome_alvo: '',
    pergunta: '',
    descricao_alvo: '',
    treinamento_uuid_fk: store.getTreinamentoUuid,
    tipo_aprendizado: 'Habilidades de Atenção',
  };
}

onMounted(() => {
  if (routeLocation.params.action === 'edit') {
    getAlvos();
  }
});
</script>
