<template>
  <!-- Modal que abre o cadastro do alvo-->
  <q-dialog v-model="visible">
    <q-card class="full-width">
      <q-card-section>
        <title-custom title="Cadastro de Objetivo" />
      </q-card-section>
      <q-card-section class="q-mt-none">
        <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="salvarAlvo">
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

  <!--div v-if="alvos.length == 0">
    <div class="text-teal text-body1 q-mt-md text-center">Nenhum objetivo cadastrado. Adicione objetivos</div>
  </div-->

  <div v-for="(item, index) in alvos" :key="index" class="q-pa-sm">
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <span class="text-subtitle2 text-teal">Nome do Objetivo: </span>
            <div class="text-subtitle1">{{ item.nome_alvo }}</div>

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
    <q-btn fab icon="mdi-plus" color="blue" @click="visible = true" />
  </q-page-sticky>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { useTreinamentoStore } from 'src/stores/treinamento';
import { useRoute } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import TitleCustom from 'src/components/TitleCustom.vue';
import { AlvoService } from 'src/services/AlvoService';

const $q = useQuasar();

const { success, error } = useNotify();

const routeLocation = useRoute();

const store = useTreinamentoStore();

const visible = ref(false);

const alvos = ref<any>([]);

const alvoService = new AlvoService();

const form = ref({
  alvoId: '',
  nome_alvo: '',
  pergunta: '',
  descricao_alvo: '',
  treinamento_uuid_fk: store.getTreinamentoUuid,
});

async function salvarAlvo() {
  $q.loading.show();
  if (form.value.alvoId) {

    try {
      const { data } = await alvoService.putAlvo(toRaw(form.value));

      if (data) {
        success('Salvo com sucesso!');
      } else {
        error('Erro ao tentar atualizar.')
      }

    } catch (e) {
      throw e;
    } finally {
      $q.loading.hide();
      visible.value = false;

      form.value = {
        alvoId: '',
        nome_alvo: '',
        pergunta: '',
        descricao_alvo: '',
        treinamento_uuid_fk: store.getTreinamentoUuid
      };

      return;
    }

  }

  if (
    form.value.treinamento_uuid_fk === '' ||
    form.value.treinamento_uuid_fk === null
  ) {
    error('Treinamento não informado');
  }

  const object = toRaw(form.value);

  try {
    const { data } = await alvoService.postAlvo(object);

    if (data) {
      success();
      reset();
      getAlvos();
    }

  } catch (e) {
    error("Ocorreu um erro ao salvar");
    throw e;
  } finally {
    visible.value = false;
    $q.loading.hide();
  }
}

async function getAlvos() {
  $q.loading.show();
  try {
    const { data } = await alvoService.getAlvos(store.getTreinamentoUuid);
    if (data) {
      alvos.value = data;
    }
  } catch (e) {
    error('Erro ao consultar');
    throw e;
  } finally {
    $q.loading.hide();
  }
}

function editarAlvo(item: any) {
  form.value = toRaw(item);
  visible.value = true;
}

function deletarAlvo(item: any) {
  console.log(item)

  $q.dialog({
    title: 'Confirma a exclusão do Alvo?',
    ok: true,
    cancel: true,
  })
    .onOk(async () => {

      /** TODO Fazer
      db.alvos
        .delete(item.uuid)
        .then(() => {
          getAlvos();
          reset();
          success();
        })
        .catch((_error) => {
          error('Erro ao tentar deletar o alvo', _error);
        }); */
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
