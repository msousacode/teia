<template>
  <div class="q-pa-sm">
    <q-dialog v-model="visible" header="Aprendizes" modal="true">
      <q-card class="my-card full-width">
        <div class="q-pa-md">
          <div class="text-body1 q-mb-sm">Selecione o dia para coleta:</div>
          <q-list bordered separator v-for="(
              item, index
            ) in treinamentos" :key="index">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label class="q-mb-sm"><b>Treinamento:</b> {{ item.treinamento }}</q-item-label>
                <q-item-label class="q-mb-sm"><b>Protocolo:</b> {{ item.protocolo }}</q-item-label>

                <div v-if="item.configuracoes">
                  <q-item-label><b>Repete:</b> {{ item.configuracoes.repetir }}</q-item-label>
                  <q-item-label>

                    <q-radio class="text-body2" v-model="diaColeta" :val="'seg$' + index" label="SEG" color="teal"
                      v-if="item.configuracoes.seg" />

                    <q-radio class="text-body2" v-model="diaColeta" :val="'ter$' + index" label="TER" color="teal"
                      v-if="item.configuracoes.ter" />

                    <q-radio class="text-body2" v-model="diaColeta" :val="'qua$' + index" label="QUA" color="teal"
                      v-if="item.configuracoes.qua" />

                    <q-radio class="text-body2" v-model="diaColeta" :val="'qui$' + index" label="QUI" color="teal"
                      v-if="item.configuracoes.qui" />

                    <q-radio class="text-body2" v-model="diaColeta" :val="'sex$' + index" label="SEX" color="teal"
                      v-if="item.configuracoes.sex" />

                    <q-radio class="text-body2" v-model="diaColeta" :val="'sab$' + index" label="SAB" color="teal"
                      v-if="item.configuracoes.sab" />

                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn sm label="Coletar" color="blue-9"
                  @click="redirecionaColetas(item.treinamentoId, item.protocolo, aprendizUuidSelecionado)" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </q-dialog>

    <div class="row">
      <q-table :rows="atendimentos" :columns="columns" row-key="id" class="col-12"
        :rows-per-page-options="[50, 100, 150, 200]" :rows-per-page="50">
        <template v-slot:top>
          <span class="text-h6 text-teal"> Intervenções </span>
          <q-space />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="editarAtendimento(props.row)">
            </q-btn>
            <q-btn icon="mdi-play-outline" color="teal" dense size="sm" @click="iniciarAtendimento(props.row)">
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="perfil != 'AT'">
      <q-btn fab icon="mdi-plus" color="blue-9" :to="{ name: 'atendimento-novo' }" />
    </q-page-sticky>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { columns } from './table';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AtendimentoService } from 'src/services/AtendimentoService';
import useNotify from 'src/composables/UseNotify';

const $q = useQuasar();

const { error } = useNotify();

const atendimentoService = new AtendimentoService();

const router = useRouter();

const loading = ref(false);

const visible = ref(false);

const atendimentos = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const aprendizUuidSelecionado = ref('');

const diaColeta = ref('');

const atendimentoId = ref('');

const perfil = ref('');

function iniciarAtendimento(atendimento: any) {
  const raw = toRaw(atendimento);
  atendimentoId.value = raw.uuid;
  aprendizUuidSelecionado.value = raw.aprendiz.value;
  treinamentos.value = raw.treinamentos
  visible.value = true;
}

function redirecionaColetas(_uuidTreinamento: string, protocolo: string, _uuidAprendiz: string) {
  const diaPesquisa = diaColeta.value.split('$')[0];
  const _tipoColeta = protocolo === 'ABC' ? 'abc' : 'ocorrencia';
  router.push({ name: "coletas", params: { atendimentoId: atendimentoId.value, uuidTreinamento: _uuidTreinamento, uuidAprendiz: _uuidAprendiz, diaColeta: diaPesquisa, tipoColeta: _tipoColeta } });
}

function editarAtendimento(atendimento: any) {
  const raw = toRaw(atendimento);
  router.push({ name: 'atendimento-novo', params: { action: 'edit', uuidAtendimento: raw.uuid } });
}

onMounted(async () => {
  loading.value = true;

  const storage = JSON.parse(localStorage.getItem('user'));
  perfil.value = storage.perfil;

  try {
    $q.loading.show();
    const { data } = await atendimentoService.getAtendimentos()

    if (data != null) {
      atendimentos.value = data
    } else {
      error('Erro ao carregar atendimentos.')
    }
  } catch (e) {
    error('Erro ao carregar atendimentos.')
  } finally {
    $q.loading.hide();
  }
});
</script>
