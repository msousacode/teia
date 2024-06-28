<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal">Meu Perfil</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="submit">
                <q-input outlined label="Nome Completo" v-model="form.nome_completo"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

                <q-input outlined label="E-mail" v-model="form.email" class="q-mb-md" />

                <q-input outlined label="Documento:" v-model="form.documento" class="q-mb-md" />

                <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit"
                    :disable="!isSubmitted" />

                <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
                    :to="{ name: 'relatorios' }" />
            </q-form>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const isSubmitted = ref(false);

const form = reactive({
    nome_completo: '',
    email: '',
    documento: '',
})

function submit() {
    isSubmitted.value = true;
    if (form.nome_completo && form.email && form.documento) {
        console.log('Formulário válido', form);
    } else {
        console.log('Formulário inválido', form);
    }
}
</script>