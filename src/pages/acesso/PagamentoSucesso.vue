<template>
    <q-page class="flex flex-center">
        <div class="text-center">
            <q-icon name="mdi-check-circle" size="100px" class="text-green-5" />
            <h4 class="q-mt-md">Pagamento Confirmado!</h4>
            <p class="q-mt-md q-pa-md text-body1">
                Obrigado pela sua assinatura! Você agora tem acesso a todos os recursos disponíveis no seu plano.
            </p>
            <p class="q-mt-md text-body1">
                Volte e realize o login.
            </p>
            <q-btn class="q-mt-lg" color="primary" label="Voltar ao Início" @click="goToHome" />
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHome() {
    router.push({ name: 'login' });
}

</script>