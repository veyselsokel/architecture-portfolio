<template>
  <!-- Minimalist Navigation Bar -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-sm border-b border-blueprint/20 font-architect">
    <div class="container mx-auto">
      <div class="flex justify-between items-center h-16 px-md">
        <!-- Logo/Brand -->
        <router-link to="/" class="text-ink h3 hover:text-annotation transition-colors duration-250 ease-architect">
          ATÖLYE
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <div class="flex items-center gap-8">
            <router-link to="/projects"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              PROJELER
            </router-link>
            <router-link to="/about"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              HAKKIMDA
            </router-link>
            <router-link to="/contact"
              class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
              İLETİŞİM
            </router-link>
          </div>

          <!-- Theme Toggle -->
          <div class="flex items-center ml-6 border-l border-blueprint/30 pl-6">
            <button 
              @click="toggleTheme" 
              :class="[
                'theme-toggle flex items-center gap-2 text-caption uppercase tracking-wider px-3 py-2 border transition-all duration-250 ease-architect',
                appStore.isDarkMode
                  ? 'bg-annotation text-canvas border-annotation'
                  : 'bg-transparent text-blueprint border-blueprint hover:border-annotation hover:text-annotation'
              ]"
              :title="appStore.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <!-- Sun Icon (Light Mode) -->
              <svg 
                v-if="!appStore.isDarkMode"
                class="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              
              <!-- Moon Icon (Dark Mode) -->
              <svg 
                v-else
                class="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
              
              <span>{{ appStore.isDarkMode ? 'KARANLIK' : 'AYDINLIK' }}</span>
            </button>
          </div>
        </div>

        <!-- Tablet Navigation (simplified) -->
        <div class="hidden md:flex lg:hidden items-center gap-6">
          <router-link to="/projects"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            PROJELER
          </router-link>
          <router-link to="/about"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            HAKKIMDA
          </router-link>
          <router-link to="/contact"
            class="nav-link text-ink hover:text-annotation transition-colors duration-250 ease-architect relative">
            İLETİŞİM
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
            PROJELER
          </router-link>
          <router-link @click="closeMenu" to="/about"
            class="block h2 text-ink hover:text-annotation transition-colors duration-250">
            HAKKIMDA
          </router-link>
          <router-link @click="closeMenu" to="/contact"
            class="block h2 text-ink hover:text-annotation transition-colors duration-250">
            İLETİŞİM
          </router-link>

          <!-- Mobile Theme Toggle -->
          <div class="flex justify-center pt-xl border-t border-blueprint/30">
            <button 
              @click="toggleTheme; closeMenu();" 
              :class="[
                'theme-toggle flex items-center gap-3 text-body uppercase tracking-wider px-lg py-md border transition-all duration-250',
                appStore.isDarkMode
                  ? 'bg-annotation text-canvas border-annotation'
                  : 'bg-transparent text-blueprint border-blueprint'
              ]"
            >
              <!-- Sun Icon (Light Mode) -->
              <svg 
                v-if="!appStore.isDarkMode"
                class="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              
              <!-- Moon Icon (Dark Mode) -->
              <svg 
                v-else
                class="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
              
              <span>{{ appStore.isDarkMode ? 'AYDINLIK MODA GEÇ' : 'KARANLIK MODA GEÇ' }}</span>
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

const toggleTheme = () => {
  appStore.toggleDarkMode();
  appStore.saveTheme();
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
