<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

onMounted(() => {
  appStore.initializeTheme();
});
</script>

<template>
  <div class="min-h-screen blueprint-grid">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
