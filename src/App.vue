<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <div class="min-h-screen blueprint-grid" :class="{ 'sketch-mode': appStore.isSketchMode, 'notebook-mode': appStore.isNotebookMode }">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
