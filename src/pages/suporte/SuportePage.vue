<template>
    <q-page class="q-pa-sm">
        <title-custom title="Suporte" />
        <q-list bordered separator>
            <q-item clickable v-ripple>
                <q-icon name="mdi-whatsapp" size="30px" class="q-pr-sm" />
                <q-item-section><span class="text-body1"><a href="">WhatsApp</a></span></q-item-section>
            </q-item>
            <q-item clickable v-ripple>
                <q-icon name="mdi-youtube" size="30px" class="q-pr-sm" />
                <q-item-section><span class="text-body1"><a
                            href="https://www.youtube.com/watch?v=wPe4a5ajAFA&list=PLn69cTeeukD3p_1cXV1o15wlrUKLnFXrN">Treinamento
                            SysABA</a></span></q-item-section>
            </q-item>
        </q-list>

        <div class="fixed-bottom q-pa-md">
            <q-banner class="bg-blue-1 text-blue-9">
                <span class="text-body2">Backup foi realizado em: <b>{{ ultimoBackup }}</b>
                </span>
            </q-banner>

            <q-btn icon="cloud_upload" no-caps label="Backup" color="secondary" class="full-width q-pa-sm q-mt-md"
                @click="backup" />

            <q-btn icon="cloud_download" no-caps label="Restaurar" color="brown-5" class="full-width q-pa-sm q-mt-md"
                @click="restaurar" />

            <q-btn no-caps label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
                :to="{ name: 'relatorios' }" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { BackupService } from 'src/services/BackupService';
import useFormatUtil from 'src/composables/UseFormatUtil';
import { useQuasar } from 'quasar';

const service = new BackupService()

const { timestampToDate } = useFormatUtil();

const $q = useQuasar();

const ultimoBackup = ref('');

function backup() {
    $q.dialog({
        title: 'Confirma a realização do backup?',
        message: 'Essa ação irá salvar uma cópia do banco de dados na nuvem. \nVerifique se a conexão com a internet está ativa.',
        ok: true,
        cancel: true,
        persistent: true,
    })
        .onOk(async () => {
            await service.iniciarBackup();
            await atualizaInfoUltimoBackup();
        })
        .onDismiss(() => { });
}

function restaurar() {

    $q.dialog({
        title: 'Deseja continuar com a restauração do banco de dados?',
        message: 'Essa ação irá sobrescrever todos os dados atuais. \nCom essa ação você recupera a última versão do banco de dados salva disponível na nuvem.',
        ok: true,
        cancel: true,
        persistent: true,
    })
        .onOk(async () => {
            service.restaurarBackup().then(() => {
                $q.loading.hide();
            }).catch(() => {
                $q.loading.hide();
            });
        })
        .onDismiss(() => { });
}

async function atualizaInfoUltimoBackup() {
    const dataUlimoBackup = localStorage.getItem('ultimo_backup') || '';

    if (dataUlimoBackup) {
        ultimoBackup.value = timestampToDate(Number(dataUlimoBackup));
    }
}

onMounted(() => {

    atualizaInfoUltimoBackup();

})
</script>