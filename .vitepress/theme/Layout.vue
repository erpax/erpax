<script setup lang="ts">
// Wrap the default theme layout and drop the live backend search into the nav,
// right after VitePress's own (static) doc search — the corpus search and the
// row search side by side. The rest of the theme is inherited unchanged.
import DefaultTheme from 'vitepress/theme'
import PayloadSearch from './PayloadSearch.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <PayloadSearch />
    </template>
  </Layout>
</template>
