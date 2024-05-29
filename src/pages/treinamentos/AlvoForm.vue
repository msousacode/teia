<template>
  <!-- Modal que abre o cadastro do alvo-->
  <q-dialog v-model="visible">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Cadastro de Alvo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          label="Nome do Alvo"
          v-model="form.nome_alvo"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Pergunta"
          v-model="form.pergunta"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          type="textarea"
          autogrow
        />

        <q-input
          outlined
          label="Descrição do alvo"
          v-model="form.descricao_alvo"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          type="textarea"
        />

        <q-input
          outlined
          label="Repetir"
          type="number"
          v-model="form.repetir"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Salvar"
          class="full-width"
          color="primary"
          v-close-popup
          @click="handleSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-card
    flat
    bordered
    class="my-card"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">Teste</div>
          <div class="text-subtitle2">by John Doe</div>
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

    <q-card-section> TEste </q-card-section>
  </q-card>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      v-if="$q.platform.is.mobile"
      fab
      icon="mdi-plus"
      color="primary"
      @click="visible = true"
    />
  </q-page-sticky>
</template>
<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { db } from 'src/db';
import { v4 as uuid } from 'uuid';
import { useTreinamentoStore } from 'src/stores/treinamento';

const store = useTreinamentoStore();

const visible = ref(false);

const form = ref({
  uuid: uuid(),
  nome_alvo: '',
  pergunta: '',
  descricao_alvo: '',
  repetir: 0,
  treinamento_uuid_fk: store.getTreinamentoUuid,
  sync: false,
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
    .then((res) => {
      form.value = res;
    })
    .catch(() => {
      throw Error('Ocorreu um erro ao tentar salvar');
    });
}
</script>
