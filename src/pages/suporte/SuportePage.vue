<template>
    <q-page class="q-pa-sm">
        <title-custom title="Suporte" />
        <q-list bordered separator>
            <q-item clickable v-ripple>
                <q-icon name="mdi-whatsapp" size="30px" class="q-pr-sm" />
                <q-item-section><span class="text-body1">WhatsApp</span></q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
</script>