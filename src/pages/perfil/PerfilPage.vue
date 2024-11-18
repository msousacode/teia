<template>
    <q-page class="q-pa-sm">
        <title-custom title="Meu Perfil" />
        <div class="row justify-center">
            <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="submit">
                <q-input outlined label="Nome Completo" v-model="form.full_name"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

                <q-input outlined label="E-mail" v-model="form.email"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]"
                    readonly />

                <q-input outlined label="Registro Profissional:" v-model="form.documento" class="q-mb-md" />

            </q-form>
        </div>


            <div class="fixed-bottom q-pa-md">
                <q-banner class="bg-blue-1 text-blue-9">
                    <span class="text-body2">O seu último backup foi realizado em: <b>{{ ultimoBackup }}</b>
                    </span>
                </q-banner>

                <q-btn icon="cloud_upload" no-caps label="Backup" color="secondary" class="full-width q-pa-sm q-mt-xl"
                    @click="backup" />

                <!--q-btn icon="cloud_download" no-caps label="Restaurar" color="brown-5"
                    class="full-width q-pa-sm q-mt-md" @click="restaurar" -->

                <q-btn no-caps label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
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

const supabase = useSupabaseApi();

const { success, error } = useNotify();

const $q = useQuasar();

const isSubmitted = computed(() => {
    return form.value.full_name !== '' && form.value.email !== '';
});

const form = ref({
    full_name: '',
    email: '',
    documento: '',
})

function submit() {

    if (navigator.onLine) {
        $q.loading.show();

        const user = JSON.parse(localStorage.getItem('user') || '{}');

        supabase.put('usuarios', { id: user.id, full_name: form.value.full_name, documento: form.value.documento }).then(() => {
            $q.loading.hide();
            user.full_name = form.value.full_name;
            user.documento = form.value.documento;
            localStorage.setItem('user', user);
            success('Perfil atualizado com sucesso!');
        }).catch(() => {
            $q.loading.hide();
            error('Erro ao atualizar configurações!');
        });
    } else {
        error('Sem conexão com a internet!');
    }
}


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

/*
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
    }*/


async function atualizaInfoUltimoBackup() {
    const dataUlimoBackup = localStorage.getItem('ultimo_backup') || '';

    if (dataUlimoBackup) {
        ultimoBackup.value = dataUlimoBackup;
    }
}

onMounted(() => {
    const storage = localStorage.getItem('user');

    if (storage) {
        const user = JSON.parse(storage);
        form.value.full_name = user.full_name;
        form.value.email = user.email;
        form.value.documento = user.documento;
    }
});
</script>