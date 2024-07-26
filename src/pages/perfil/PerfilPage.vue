<template>
    <q-page class="q-pa-sm">
        <title-custom title="Cadastro Perfil" />
        <div class="row justify-center">
            <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="submit">
                <q-input outlined label="Nome Completo" v-model="form.nome_completo"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

                <q-input outlined label="E-mail" v-model="form.email"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]"
                    readonly />

                <q-input outlined label="Documento:" v-model="form.documento" class="q-mb-md text-uppercase" />

            </q-form>

            <div class="fixed-bottom q-pa-md">
                <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" size="18px" type="submit"
                    :disable="!isSubmitted" />

                <q-btn icon="cloud_upload" label="Backup" color="secondary" class="full-width q-pa-sm q-mt-xl"
                    size="18px" @click="backup" />

                <q-btn icon="cloud_download" label="Restaurar" color="brown-5" class="full-width q-pa-sm q-mt-md"
                    size="18px" @click="restaurar" />

                <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
                    :to="{ name: 'relatorios' }" />
            </div>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import useSupabaseApi from 'src/composables/UseSupabaseApi';
import useNotify from 'src/composables/UseNotify';
import TitleCustom from 'src/components/TitleCustom.vue';
import { BackupService } from 'src/services/BackupService';

const service = new BackupService()

const supabase = useSupabaseApi();

const { success, error } = useNotify();

const $q = useQuasar();

const isSubmitted = computed(() => {
    return form.value.nome_completo !== '' && form.value.email !== '';
});

const form = ref({
    nome_completo: '',
    email: '',
    documento: '',
})

function submit() {
    $q.loading.show();

    supabase.post('usuarios', form.value).then(() => {
        $q.loading.hide();
        reset();
        success('Perfil atualizado com sucesso!');
    }).catch(() => {
        $q.loading.hide();
        error('Erro ao atualizar configurações!');
    });
}

function reset() {
    form.value.nome_completo = '';
    form.value.email = '';
    form.value.documento = '';
}

function backup() {
    $q.dialog({
        title: 'Confirma a realização do backup?',
        ok: true,
        cancel: true,
        persistent: true,
    })
        .onOk(async () => {
            service.iniciarBackup();
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

onMounted(() => {
    const storage = localStorage.getItem('user');

    if (storage) {
        const user = JSON.parse(storage);
        form.value.email = user.email;
        supabase.getByEmail('usuarios', form.value.email).then((response) => {
            if (response !== undefined)
                form.value = response
        })
    }
});
</script>