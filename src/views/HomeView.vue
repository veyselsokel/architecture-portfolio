<template>
  <!-- The Vestibule: A full-screen, atmospheric entry -->
  <div class="vestibule h-screen w-screen relative overflow-hidden bg-canvas font-architect">
    <!-- Atmospheric Background Video/Animation Placeholder -->
    <div class="absolute inset-0 z-0">
      <!-- Background overlay with subtle texture -->
      <div class="absolute inset-0 opacity-30">
        <div class="w-full h-full bg-gradient-to-br from-transparent via-blueprint/5 to-blueprint/10"></div>
      </div>

      <!-- Animated sketch strokes effect -->
      <div class="absolute inset-0 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="blueprintGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(107, 122, 143, 0.15)" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" />

          <!-- Animated drawing lines -->
          <g class="drawing-lines">
            <path d="M100,200 Q300,100 500,200 T900,200" fill="none" stroke="rgba(26, 26, 26, 0.2)" stroke-width="1"
              stroke-dasharray="5,5" class="animate-draw-line" style="animation-delay: 1s;" />
            <path d="M200,400 L800,400 L800,600 L200,600 Z" fill="none" stroke="rgba(26, 26, 26, 0.15)"
              stroke-width="0.8" stroke-dasharray="8,4" class="animate-draw-line" style="animation-delay: 2s;" />
          </g>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-md">
      <div class="max-w-4xl mx-auto">
        <!-- Architectural Quote -->
        <div class="mb-3xl">
          <h1 class="h1 text-ink mb-lg slide-in-left">
            "MEKANIN, ZAMANIN BİR İŞLEVİ OLARAK ORGANİZE EDİLMESİ DEMEK OLAN "RİTİM" SANAT ESERİNİN EN ÜST KANUNUDUR."
          </h1>
          <div class="meta-data text-blueprint slide-in-right delay-300">
            — TURGUT CANSEVER
          </div>
        </div>

        <!-- Entry Button -->
        <div class="bounce-in delay-600 pt-10">
          <router-link to="/projects"
            class="entry-button inline-flex items-center gap-md px-xl py-lg border border-ink text-ink hover:border-annotation hover:text-annotation transition-all duration-250 ease-architect group float">
            <span class="uppercase tracking-wider">Projeleri Keşfet</span>
            <ArrowRight class="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" />
          </router-link>
        </div>
      </div>

    </div>

    <!-- Corner Annotations -->
    <div class="absolute top-xl left-xl text-blueprint meta-data slide-down delay-800">
      Dijital Atölye
    </div>
    <div class="absolute top-xl right-xl text-blueprint meta-data slide-down delay-900">
      Kur. 2024
    </div>
    <div class="absolute bottom-xl left-xl text-blueprint meta-data scale-in delay-1000">
      Portfolyo
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { onMounted, onUnmounted } from 'vue';
import { useSeo } from '@/composables/useSeo';

useSeo('Şeyma Betül Sökel - Mimar ve Tasarımcı', 'Mekan ve zamanın kesişiminde yenilikçi ve estetik mimari çözümler. Şeyma Betül Sökel\'in dijital atölyesine hoş geldiniz.');

// Add homepage class to body when component mounts
onMounted(() => {
  document.body.classList.add('homepage');
});

// Remove homepage class when component unmounts
onUnmounted(() => {
  document.body.classList.remove('homepage');
});
</script>

<style scoped>
.vestibule {
  position: relative;
}

.entry-button {
  position: relative;
}

.entry-button::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-annotation);
  transition: width 0.3s ease;
}

.entry-button:hover::after {
  width: 100%;
}

/* Drawing animation for SVG paths */
.drawing-lines path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Fade in animation with staggered delays */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .vestibule h1 {
    font-size: 1.8rem;
    line-height: 1.3;
  }

  .vestibule .meta-data {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .vestibule h1 {
    font-size: 1.4rem;
    line-height: 1.4;
  }
}
</style>
