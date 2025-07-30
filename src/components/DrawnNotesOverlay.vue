<template>
  <div v-if="isVisible" class="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
    <div class="relative w-full h-full flex items-center justify-center">
      <img :src="noteImage" alt="Drawn Note" class="max-w-full max-h-full opacity-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  noteImage: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const isVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});
</script>

<style scoped>
/* No specific styles needed here, Tailwind classes handle it */
</style>
