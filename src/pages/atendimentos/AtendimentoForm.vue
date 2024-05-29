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
          <span class="text-body1"
            >Configure a quantidade de vezes que os alvos serão praticados na
            semana e indique os dias da semana que o alvo será praticado.</span
          ></q-banner
        >
        <q-select
          class="col-12 q-mb-md"
          outlined
          v-model="form.repetir"
          :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
          label="Repetir"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <div class="q-gutter-sm q-mb-md">
          <q-checkbox dense v-model="form.seg" label="SEG" color="teal" />
          <q-checkbox dense v-model="form.ter" label="TER" color="teal" />
          <q-checkbox dense v-model="form.qua" label="QUA" color="teal" />
          <q-checkbox dense v-model="form.qui" label="QUI" color="teal" />
          <q-checkbox dense v-model="form.sex" label="SEX" color="teal" />
          <q-checkbox dense v-model="form.sab" label="SAB" color="teal" />
        </div>

        <q-btn
          label="Confirmar"
          color="green"
          class="full-width q-mb-md"
          rounded
          @click="visibleConfiguracao = false"
        />
      </div>
    </q-card>
  </q-dialog>

  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro Atendimento</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12"
        @submit.prevent="handleSubmit"
      >
        <q-select
          outlined
          v-model="form.aprendiz"
          :options="aprendizes"
          label="Selecione o Aprendiz"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-input
          outlined
          label="Data Ínicio"
          type="date"
          v-model="form.data_inicio"
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

        <q-btn
          label="Selecionar Treinamentos"
          color="teal"
          class="full-width q-mb-md"
          rounded
          type="submit"
          @click="visible = true"
        />

        <div class="text-body2 q-mb-sm">Treinamentos</div>
        <div class="q-mb-md">
          <q-list
            bordered
            separator
            v-for="(
              item, index
            ) in storeTreinamento.getTreinamentosSelecionados"
            :key="index"
          >
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="text-body1">{{
                  item.treinamento
                }}</q-item-label>
                <q-item-label caption>{{ item.protocolo }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  dense
                  label="Configurar"
                  color="primary"
                  rounded
                  @click="visibleConfiguracao = true"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-btn
          label="Salvar"
          color="primary"
          class="full-width q-mb-md"
          rounded
          type="submit"
        />

        <q-btn
          label="Voltar"
          color="primary"
          class="full-width q-mb-md"
          rounded
          flat
          :to="{ name: 'aprendizes' }"
        />
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
  aprendiz_uuid_fk: '',
  sync: false,
  repetir: 1,
  seg: false,
  ter: false,
  qua: false,
  qui: false,
  sex: false,
  sab: false,
});

function handleSubmit() {
  if (routeLocation.params.action === 'edit') {
    handleUpdate();
    return;
  }

  form.value.uuid = uuid();
  const data = toRaw(form.value);

  db.atendimentos
    .add(data)
    .then((res) => {
      console.log(res);
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

onMounted(() => {
  liveQuery(() => db.aprendizes.toArray()).subscribe((res) => {
    res.forEach((aprendiz) => {
      aprendizes.value.push({
        label: `${aprendiz.nome_aprendiz} - ${'Nasc: '} ${
          aprendiz.nasc_aprendiz
        }`,
        value: aprendiz.uuid,
      });
    });
  });

  /*     if (routeLocation.params.action === 'edit') {
      db.aprendizes
        .get(store.getAprendizUuid)
        .then((res) => {
          if (res) {
            form.value.uuid = res.uuid || '';
            form.value.nome_aprendiz = res.nome_aprendiz;
            form.value.nasc_aprendiz = res.nasc_aprendiz;
            form.value.nome_mae = res.nome_mae;
            form.value.nome_pai = res.nome_pai;
            form.value.nome_responsavel = res.nome_responsavel;
            form.value.observacao = res.observacao;
            form.value.sync = res.sync;
          }
        })
        .catch(() => {
          throw Error('Ocorreu um erro ao tentar buscar o treinamento');
        });
    } */
});
</script>
