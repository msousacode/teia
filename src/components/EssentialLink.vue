<template>
  <q-item
    clickable
    :to="{ name: routeName }"
    exact
    v-if="hide"
    :style="title === 'Seja Premium' ? { backgroundColor: 'yellow' } : {}"
  >
    <q-item-section v-if="icon" avatar class="text-teal-8">
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section class="text-teal-8 text-h6">
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  routeName?: string;
  icon?: string;
  hide: boolean;
  display: () => void;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  routeName: '',
  icon: '',
});
</script>
