<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <title-custom title="Meu Perfil" />
                <q-input outlined label="Nome Completo" v-model="form.full_name"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

                <q-input outlined label="E-mail" v-model="form.email"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]"
                    readonly />

                <q-input outlined label="Registro Profissional:" v-model="form.documento" class="q-mb-md" />

            </q-form>
        </div>

        <div class="fixed-bottom q-pa-md">
            <q-btn no-caps label="Salvar" color="primary" class="full-width q-pa-sm" @click="submit"
                :disable="!isSubmitted" />
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import { UsuarioService } from 'src/services/UsuarioService';
import useNotify from 'src/composables/UseNotify';

const $q = useQuasar();

const notify = useNotify();

const usuarioService = new UsuarioService();

const isSubmitted = computed(() => {
    return form.value.full_name !== '' && form.value.email !== '';
});

const form = ref({
    full_name: '',
    email: '',
    documento: '',
})

async function submit() {
    try {
        $q.loading.show();
        await usuarioService.putPerfil(form.value);
        await loadUsuarioInfo();
        notify.success('salvo com sucesso!');
    } catch (e) {
        notify.error('erro ao salvar!');
        throw e;
    } finally {
        $q.loading.hide();
    }
}

async function loadUsuarioInfo() {
    const user = await usuarioService.getUsuarioInfo();

    form.value.full_name = user.fullName;
    form.value.email = user.email;
    form.value.documento = user.documento;

}

onMounted(async () => {
    await loadUsuarioInfo();
});
</script>