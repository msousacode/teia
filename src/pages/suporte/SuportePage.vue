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
    </q-page>
</template>
<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
</script>