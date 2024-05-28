<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columnsCategory"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Treinamentos </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-category' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveCategory(props.row)"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'treinamento-novo' }"
      />
    </q-page-sticky>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { columnsCategory } from './table';
import { db } from 'src/db';
//import { liveQuery } from 'dexie';

const loading = ref(false);

const categories = ref({
  uuid: '',
  nome_alvo: '',
  pergunta: '',
  descricao_alvo: '',
  repetir: 0,
  treinamento_uuid_fk: '',
  sync: false,
});

function handleEdit(x: any) {
  console.log(x);
}

function handleRemoveCategory(x: any) {
  console.log(x);
}

function getAlvos() {
  /*   const x = toRaw(treinamentoUuidFk).treinamentoUuid; TODO colocar na storage pínia

  if (x === undefined || x === '') {
    throw new Error('Treinamento não informado');
  }
 */
  db.alvos
    .where('treinamento_uuid_fk')
    .equals('a21eae51-8855-4d3f-9354-068ea7ec1611')
    .toArray()
    .then((res) => {
      console.log(res);
    });
}

onMounted(() => {
  getAlvos();
});

/* onMounted(() => {
  liveQuery(() => db.alvos.toArray()).subscribe(
    (data) => {
      const raw = toRaw(data)[0];

      categories.value.uuid = raw.uuid ?? '';
      categories.value.nome_alvo = raw.nome_alvo;
      categories.value.pergunta = raw.pergunta;
      categories.value.descricao_alvo = raw.descricao_alvo;
      categories.value.repetir = raw.repetir;
      categories.value.treinamento_uuid_fk = raw.treinamento_uuid_fk;
      categories.value.sync = raw.sync;
    },
    (error) => {
      throw new Error(error);
    }
  );

  console.log(categories);
}); */
</script>
