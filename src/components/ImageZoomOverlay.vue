<template>
  <div v-if="isVisible" class="image-zoom-overlay" :class="{ 'visible': isVisible }" @click="close">
    <img :src="imageUrl" alt="Zoomed Image" @click.stop />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const isVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
  } else {
    document.body.style.overflow = '';
  }
});

const close = () => {
  isVisible.value = false;
  emit('close');
};
</script>

<style scoped>
.image-zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-zoom-overlay[data-v-7a7a3c7b] {
  opacity: 1;
}

.image-zoom-overlay img {
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform: scale(0.8);
  transition: transform 0.3s ease-out;
}

.image-zoom-overlay[data-v-7a7a3c7b] img {
  transform: scale(1);
}
</style>
