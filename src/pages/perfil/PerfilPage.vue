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
            <q-btn no-caps label="Salvar" color="primary" class="full-width q-pa-sm" type="submit"
                :disable="!isSubmitted" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';

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
        console.log(user)
        /*
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
                */
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