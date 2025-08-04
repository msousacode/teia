<template>
  <q-btn
    :icon="icon"
    :label="label"
    :color="color"
    no-caps
    class="full-width q-pa-sm text-h6"
    :to="path"
  />
</template>
<script setup lang="ts">
defineProps<{
  icon: string;
  color: string;
  label: string;
  path: { name: string };
}>();
</script>
