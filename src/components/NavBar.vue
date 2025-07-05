<template>
  <!-- Minimalist Navigation Bar -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-sm border-b border-blueprint/20 font-architect">
    <div class="container mx-auto">
      <div class="flex justify-between items-center h-16 px-md">
        <!-- Logo/Brand -->
        <router-link to="/" class="text-ink h3 hover:text-annotation transition-colors duration-250 ease-architect">
          ATELIER
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <div class="flex items-center gap-8">
            <router-link to="/projects"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              WORK
            </router-link>
            <router-link to="/about"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              DOSSIER
            </router-link>
            <router-link to="/contact"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              CONTACT
            </router-link>
          </div>

          <!-- Mode Toggles -->
          <div class="flex items-center gap-2 ml-6 border-l border-blueprint/30 pl-6">
            <button @click="appStore.toggleSketchMode" :class="[
              'mode-toggle text-caption uppercase tracking-wider px-2 py-1 border transition-all duration-250 ease-architect',
              appStore.isSketchMode
                ? 'bg-annotation text-canvas border-annotation'
                : 'bg-transparent text-blueprint border-blueprint hover:border-annotation hover:text-annotation'
            ]">
              SKETCH
            </button>
            <button @click="appStore.toggleNotebookMode" :class="[
              'mode-toggle text-caption uppercase tracking-wider px-2 py-1 border transition-all duration-250 ease-architect',
              appStore.isNotebookMode
                ? 'bg-annotation text-canvas border-annotation'
                : 'bg-transparent text-blueprint border-blueprint hover:border-annotation hover:text-annotation'
            ]">
              NOTES
            </button>
          </div>
        </div>

        <!-- Tablet Navigation (simplified) -->
        <div class="hidden md:flex lg:hidden items-center gap-6">
          <router-link to="/projects"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            WORK
          </router-link>
          <router-link to="/about"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            ABOUT
          </router-link>
          <router-link to="/contact"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            CONTACT
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu"
            class="text-ink hover:text-annotation focus:outline-none transition-colors duration-250"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="mobile-menu">
      <div v-if="isMenuOpen"
        class="fixed inset-0 bg-canvas/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden">
        <div class="space-y-xl text-center">
          <router-link @click="closeMenu" to="/projects"
            class="block h2 text-ink hover:text-annotation transition-colors duration-250">
            WORK
          </router-link>
          <router-link @click="closeMenu" to="/about"
            class="block h2 text-ink hover:text-annotation transition-colors duration-250">
            DOSSIER
          </router-link>
          <router-link @click="closeMenu" to="/contact"
            class="block h2 text-ink hover:text-annotation transition-colors duration-250">
            CONTACT
          </router-link>

          <!-- Mobile Mode Toggles -->
          <div class="flex flex-col space-y-md pt-xl border-t border-blueprint/30">
            <button @click="appStore.toggleSketchMode; closeMenu();" :class="[
              'mode-toggle text-body uppercase tracking-wider px-lg py-md border transition-all duration-250',
              appStore.isSketchMode
                ? 'bg-annotation text-canvas border-annotation'
                : 'bg-transparent text-blueprint border-blueprint'
            ]">
              {{ appStore.isSketchMode ? 'EXIT SKETCH MODE' : 'SKETCH MODE' }}
            </button>
            <button @click="appStore.toggleNotebookMode; closeMenu();" :class="[
              'mode-toggle text-body uppercase tracking-wider px-lg py-md border transition-all duration-250',
              appStore.isNotebookMode
                ? 'bg-annotation text-canvas border-annotation'
                : 'bg-transparent text-blueprint border-blueprint'
            ]">
              {{ appStore.isNotebookMode ? 'EXIT NOTEBOOK MODE' : 'NOTEBOOK MODE' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Navigation link underline effect */
.nav-link {
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-annotation);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* Mode toggle buttons */
.mode-toggle {
  min-width: 60px;
  font-size: 0.75rem;
}

/* Mobile menu transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  /* Tablet styles */
  .nav-link {
    font-size: 0.875rem;
    letter-spacing: 0.05em;
  }
}

@media (max-width: 768px) {
  /* Mobile styles */
  .nav-link {
    font-size: 1.25rem;
  }
  
  /* Adjust container padding on mobile */
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  /* Small mobile adjustments */
  .h3 {
    font-size: 1rem;
  }
  
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
