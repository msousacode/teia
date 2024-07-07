<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6 text-teal">Meu Perfil</p>
            </div>
            <q-form class="col-md-7 col-xs-12 col-sm-12" @submit.prevent="submit">
                <q-input outlined label="Nome Completo" v-model="form.nome_completo"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Nome é obrigatório' : true]" />

                <q-input outlined label="E-mail" v-model="form.email"
                    :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'E-mail é obrigatório' : true]" />

                <q-input outlined label="Documento:" v-model="form.documento" class="q-mb-md text-uppercase" />

                <q-select outlined v-model="form.area" :options="areas" label="Área de atuação" class="q-mb-md" />

                <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" type="submit"
                    :disable="!isSubmitted" />

                <q-btn label="Voltar" color="primary" class="full-width q-pa-sm q-mt-md" flat
                    :to="{ name: 'relatorios' }" />
            </q-form>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const isSubmitted = computed(() => {
    return form.value.nome_completo !== '' && form.value.email !== '';
});

const areas = [
    {
        value: 1,
        label: 'Analista do Comportamento Certificados (BCBA)'
    },
    {
        value: 1,
        label: 'Técnico de Comportamento Registrados (RBT)'
    },
    {
        value: 1,
        label: 'Psicologia'
    },
    {
        value: 1,
        label: 'Fonoaudiologia'
    },
    {
        value: 1,
        label: 'Terapeuta Ocupacionai'
    },
    {
        value: 1,
        label: 'Psicopedagogia'
    },
    {
        value: 1,
        label: 'Supervisores Clínicos em ABA'
    },
    {
        value: 1,
        label: 'Terapeutas ABA Independentes'
    },
    {
        value: 1,
        label: 'Coordenadores de Programas ABA'
    },
];

const form = ref({
    nome_completo: '',
    email: '',
    documento: '',
    area: [{}]
})

function submit() {
    isSubmitted.value = true;
    if (form.value.nome_completo && form.value.email && form.value.documento) {
        console.log('Formulário válido', form.value);
    } else {
        console.log('Formulário inválido', form.value);
    }
}
</script>