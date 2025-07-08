<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-sm border-b border-blueprint/20 font-architect">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 lg:h-20 xl:h-24 max-w-none">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <router-link 
            to="/" 
            class="text-2xl lg:text-3xl xl:text-4xl font-black text-ink hover:text-annotation transition-colors duration-300"
          >
            ATÖLYE
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block flex-1">
          <div class="flex items-baseline justify-center space-x-4 lg:space-x-8 xl:space-x-12">
            <router-link
              to="/projects"
              class="nav-link text-ink hover:text-annotation px-2 lg:px-3 xl:px-4 py-2 text-base lg:text-lg font-semibold transition-colors duration-300"
            >
              PROJELER
            </router-link>
            <router-link
              to="/about"
              class="nav-link text-ink hover:text-annotation px-2 lg:px-3 xl:px-4 py-2 text-base lg:text-lg font-semibold transition-colors duration-300"
            >
              HAKKIMDA
            </router-link>
            <router-link
              to="/contact"
              class="nav-link text-ink hover:text-annotation px-2 lg:px-3 xl:px-4 py-2 text-base lg:text-lg font-semibold transition-colors duration-300"
            >
              İLETİŞİM
            </router-link>
          </div>
        </div>

        <!-- Desktop Theme Toggle -->
        <div class="hidden md:block">
          <button 
            @click="toggleTheme"
            :class="[
              'flex items-center gap-1 lg:gap-2 xl:gap-3 px-2 lg:px-4 xl:px-5 py-2 border rounded-md text-sm lg:text-base font-semibold uppercase tracking-wider transition-all duration-300',
              appStore.isDarkMode
                ? 'bg-annotation text-canvas border-annotation hover:bg-annotation/80'
                : 'bg-canvas/50 text-ink border-blueprint hover:border-annotation hover:text-annotation hover:bg-annotation/10'
            ]"
          >
            <Sun v-if="!appStore.isDarkMode" class="w-4 h-4 xl:w-5 xl:h-5" />
            <Moon v-else class="w-4 h-4 xl:w-5 xl:h-5" />
            <span class="hidden lg:inline">{{ appStore.isDarkMode ? 'KARANLIK' : 'AYDINLIK' }}</span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-3 rounded-lg text-ink hover:text-annotation hover:bg-blueprint/8 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-annotation transition-colors duration-300 min-w-[44px] min-h-[44px]"
            :aria-expanded="isMenuOpen"
            :aria-label="isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div 
        v-if="isMenuOpen" 
        class="md:hidden absolute top-full left-0 right-0 bg-canvas border-b border-blueprint/20 shadow-lg"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/projects"
            @click="closeMenu"
            class="mobile-nav-link flex items-center px-4 py-3 text-lg font-semibold text-ink hover:text-annotation hover:bg-blueprint/8 rounded-lg transition-colors duration-300 min-h-[44px]"
          >
            PROJELER
          </router-link>
          <router-link
            to="/about"
            @click="closeMenu"
            class="mobile-nav-link flex items-center px-4 py-3 text-lg font-semibold text-ink hover:text-annotation hover:bg-blueprint/8 rounded-lg transition-colors duration-300 min-h-[44px]"
          >
            HAKKIMDA
          </router-link>
          <router-link
            to="/contact"
            @click="closeMenu"
            class="mobile-nav-link flex items-center px-4 py-3 text-lg font-semibold text-ink hover:text-annotation hover:bg-blueprint/8 rounded-lg transition-colors duration-300 min-h-[44px]"
          >
            İLETİŞİM
          </router-link>
        </div>
        
        <!-- Mobile Theme Toggle -->
        <div class="px-2 pb-3 border-t border-blueprint/20">
          <button 
            @click="toggleTheme"
            :class="[
              'w-full flex items-center justify-center gap-2 mt-3 px-4 py-2 border rounded-md text-base font-semibold uppercase tracking-wider transition-all duration-300',
              appStore.isDarkMode
                ? 'bg-annotation text-canvas border-annotation'
                : 'bg-canvas/50 text-ink border-blueprint hover:border-annotation hover:text-annotation hover:bg-annotation/10'
            ]"
          >
            <Sun v-if="!appStore.isDarkMode" class="w-4 h-4" />
            <Moon v-else class="w-4 h-4" />
            <span>{{ appStore.isDarkMode ? 'AYDINLIK MODA GEÇ' : 'KARANLIK MODA GEÇ' }}</span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { Sun, Moon, Menu, X } from 'lucide-vue-next';

const appStore = useAppStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Toggle body scroll lock for mobile
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const toggleTheme = () => {
  appStore.toggleDarkMode();
  appStore.saveTheme();
};

// Removed theme icon computed property as we're using Lucide icons directly
</script>

<style scoped>
/* Navigation link effects */
.nav-link {
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--color-annotation);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.mobile-nav-link {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mobile-nav-link.router-link-active {
  color: var(--color-annotation);
  background-color: rgba(100, 116, 139, 0.1);
}

/* Removed hamburger and icon CSS as we're using Lucide icons directly */

/* Responsive adjustments */
@media (min-width: 1920px) {
  .nav-link {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
  }
}

@media (max-width: 1024px) {
  .nav-link {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .mobile-nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .nav-link {
    font-size: 0.85rem;
  }
  
  .mobile-nav-link {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .mobile-nav-link {
    font-size: 0.85rem;
  }
}
</style>