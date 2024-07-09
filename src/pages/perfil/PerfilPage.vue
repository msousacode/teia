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

                <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit"
                    :disable="!isSubmitted" />

                <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
                    :to="{ name: 'relatorios' }" />
            </q-form>
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
        error('Erro ao atualizar perfil!');
    });
}

function reset() {
    form.value.nome_completo = '';
    form.value.email = '';
    form.value.documento = '';
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