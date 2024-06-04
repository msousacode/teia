<template>
  <!-- Modal que abre o cadastro do alvo-->
  <q-dialog v-model="visible">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Cadastro de Alvo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select outlined v-model="form.tipo_aprendizado" :options="aprendizados" label="Tipo de Aprendizado"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-input outlined label="Nome do Alvo" v-model="form.nome_alvo"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" />

        <q-input outlined label="Pergunta" v-model="form.pergunta"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" type="textarea" autogrow />

        <q-input outlined label="Descrição do alvo" v-model="form.descricao_alvo"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']" type="textarea" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Salvar" class="full-width" color="primary" v-close-popup @click="handleSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div v-for="(item, index) in alvos" :key="index" class="q-pa-sm">
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <span class="text-subtitle2 text-teal">Nome do Alvo: </span>
            <div class="text-subtitle1">{{ item.nome_alvo }}</div>

            <span class="text-subtitle2 text-teal">Tipo de aprendizado: </span>
            <div class="text-subtitle1">{{ item.tipo_aprendizado }}</div>

            <span class="text-subtitle2 text-teal">Pergunta: </span>
            <div class="text-subtitle1">{{ item.pergunta }}</div>

            <span class="text-subtitle2 text-teal">Descrição do Alvo: </span>
            <div class="text-subtitle1">{{ item.descricao_alvo }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Remover</q-item-section>
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
    <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" @click="visible = true" />
  </q-page-sticky>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

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
  uuid: uuid(),
  nome_alvo: '',
  pergunta: '',
  descricao_alvo: '',
  treinamento_uuid_fk: store.getTreinamentoUuid,
  tipo_aprendizado: 'Habilidades de Atenção',
});

function handleSubmit() {
  if (
    form.value.treinamento_uuid_fk === '' ||
    form.value.treinamento_uuid_fk === null
  ) {
    throw new Error('Treinamento não informado');
  }

  const data = toRaw(form.value);

  db.alvos
    .add(data)
    .then(() => {
      getAlvos();
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

onMounted(() => {
  if (routeLocation.params.action === 'edit') {
    getAlvos();
  }
});
</script>
