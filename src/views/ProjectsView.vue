<template>
  <!-- The Gallery: A disciplined, curated projects grid -->
  <div class="gallery min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl" id="main-content">

      <!-- Section Header -->
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg slide-in-left">SEÇİLMİŞ PROJELER</h1>
        <div class="meta-data text-blueprint slide-in-right delay-200">
          MİMARİ DÜŞÜNCENİN KÜRATÖRLÜ SERGİSİ
        </div>
      </header>

      <DottedDivider />


      <!-- Projects Grid -->
      <div class="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-xl">
        <article v-for="(project, index) in sortedProjects" :key="project.id"
          class="project-card group cursor-pointer slide-up focus-within:outline-none focus-within:ring-2 focus-within:ring-annotation focus-within:ring-offset-2 rounded-lg"
          :style="{ 'animation-delay': `${0.6 + index * 0.1}s` }" @click="navigateToProject(project.id)"
          @keydown.enter="navigateToProject(project.id)" @keydown.space.prevent="navigateToProject(project.id)"
          tabindex="0" role="button"
          :aria-label="`${project.title} projesini görüntüle - ${project.year}, ${project.location}`">

          <!-- Project Image Container -->
          <div
            class="image-container aspect-ratio-container relative overflow-hidden border border-blueprint bg-canvas mb-md rounded-sm">
            <!-- Loading placeholder -->
            <div v-if="!imageLoaded[project.id]" class="image-placeholder absolute inset-0"></div>

            <!-- Main Project Image -->
            <img :src="project.image" :alt="`${project.title} ana görsel`"
              class="project-image lazy-image w-full h-full object-cover transition-all duration-400 ease-architect"
              :class="{ 'loaded': imageLoaded[project.id] }" loading="lazy" decoding="async" fetchpriority="high"
              @load="handleImageLoad(project.id, 'main')" @error="handleImageError(project.id, 'main')" />

            <!-- Sketch Overlay (appears on hover) -->
            <div
              class="sketch-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-architect"
              aria-hidden="true">
              <img :src="project.sketchImage || project.image" :alt="`${project.title} eskiz görsel`"
                class="w-full h-full object-cover filter sepia contrast-150" loading="lazy" decoding="async"
                @load="handleImageLoad(project.id, 'sketch')" @error="handleImageError(project.id, 'sketch')" />
            </div>

            <!-- Selection Border (inner border on hover/focus) -->
            <div
              class="selection-border absolute inset-2 border border-annotation opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-250 ease-architect pointer-events-none rounded-sm">
            </div>
          </div>

          <!-- Project Information -->
          <div class="project-info">
            <h2
              class="h3 text-ink mb-xs group-hover:text-annotation group-focus-within:text-annotation transition-colors duration-250 ease-architect">
              {{ project.title }}
            </h2>
            <div class="meta-data text-blueprint">
              {{ project.year }} / {{ project.location }}
            </div>
          </div>
        </article>
      </div>

      <!-- Footer Note -->
      <footer class="text-center mt-3xl pt-3xl border-t border-blueprint/30">
        <div class="meta-data text-blueprint fade-in delay-1000">
          HER PROJE KONSEPT VE BAĞLAM ARASINDA BİR DİYALOGU TEMSIL EDER
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import DottedDivider from '@/components/DottedDivider.vue';

import { useSeo } from '@/composables/useSeo';

useSeo('Projeler - Şeyma Betül Sökel Mimarlık', 'Şeyma Betül Sökel tarafından tasarlanan, konsept ve bağlam arasında diyalog kuran seçilmiş mimari projeler portfolyosu.');

interface Project {
  id: number;
  title: string;
  year: number;
  category: string;
  location: string;
  image: string;
  sketchImage?: string;
}

const router = useRouter();

// Image loading state management
const imageLoaded = ref<Record<number, boolean>>({});
const imageErrors = ref<Record<number, string[]>>({});

// Initialize image loading states
const initializeImageStates = () => {
  projects.value.forEach(project => {
    imageLoaded.value[project.id] = false;
    imageErrors.value[project.id] = [];
  });
};

const handleImageLoad = (projectId: number, imageType: 'main' | 'sketch') => {
  if (imageType === 'main') {
    imageLoaded.value[projectId] = true;
  }
};

const handleImageError = (projectId: number, imageType: 'main' | 'sketch') => {
  if (!imageErrors.value[projectId]) {
    imageErrors.value[projectId] = [];
  }
  imageErrors.value[projectId].push(imageType);

  if (imageType === 'main') {
    imageLoaded.value[projectId] = true; // Show placeholder or fallback
  }
};

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'AGROTOPIA KENTSEL TARIM PROJESİ',
    year: 2025,
    category: 'BİTİRME PROJESİ',
    location: 'İSTANBUL',
    image: '/images/1-bitirme-secilenler/render/1_render.jpg',
    sketchImage: '/images/1-bitirme-secilenler/teknik_cizim/5_teknik.jpg'
  },
  {
    id: 2,
    title: 'ÖZEL EĞİTİM REHABİLİTASYON MERKEZİ',
    year: 2024,
    category: 'PROJE 5',
    location: 'İSTANBUL',
    image: '/images/2-proje-5-secilen/render/ekran-goruntusu-2025-07-11-124606.png',
    sketchImage: '/images/2-proje-5-secilen/teknik_cizim/arazi-proje-5-photoshop_page-0001-(1).jpg'
  },
  {
    id: 3,
    title: 'OFİS STAJI - ŞAT MİMARLIK',
    year: 2023,
    category: 'STAJ',
    location: 'İSTANBUL',
    image: '/images/9-ofis-staji-secilenler/staj_fotografları/whatsapp-gorsel-2025-07-08-saat-15.21.58_4312c4db.jpg',
    sketchImage: '/images/9-ofis-staji-secilenler/staj_fotografları/whatsapp-gorsel-2025-07-08-saat-15.21.56_e5961c7d.jpg'
  },
  {
    id: 4,
    title: 'KONAKLAMA KOMPLEKSİ',
    year: 2024,
    category: 'PROJE 4',
    location: 'İSTANBUL',
    image: '/images/3-proje-4-secilenler/render/ekran-goruntusu-2025-07-11-124052.png',
    sketchImage: '/images/3-proje-4-secilenler/teknik_cizim/proje-4-a3-teslimleri_page-0001.jpg'
  },
  {
    id: 5,
    title: 'UP MİMARİ DETAY',
    year: 2024,
    category: 'DETAY',
    location: 'İSTANBUL',
    image: '/images/4-up-secilenler/teknik_cizim/up-merdiven-kesiti1-model_page-0001.jpg',
    sketchImage: '/images/4-up-secilenler/teknik_cizim/up-kismi-plan-model_page-0001.jpg'
  },
  {
    id: 6,
    title: 'HALİÇ SURLARININ TANITILMASI',
    year: 2023,
    category: 'PROJE 3',
    location: 'İSTANBUL',
    image: '/images/5-proje-3-secilenler/render/cc_1-photo.png',
    sketchImage: '/images/5-proje-3-secilenler/render/cc_2-photo.png'
  },
  {
    id: 7,
    title: 'ŞANTİYE STAJI - ÇELİK MİMARLIK',
    year: 2023,
    category: 'STAJ',
    location: 'İSTANBUL',
    image: '/images/8-santiye-staji-secilen/staj_fotografları/IMG_20230701_104837.jpg',
    sketchImage: '/images/8-santiye-staji-secilen/staj_fotografları/IMG_20230701_104841.jpg'
  },
  {
    id: 8,
    title: 'AFET SONRASI YAŞAM ALANI',
    year: 2023,
    category: 'PROJE 2',
    location: 'İSTANBUL',
    image: '/images/6-proje-2-secilenler/render/3d-render_6-photo_lighting.jpg',
    sketchImage: '/images/6-proje-2-secilenler/render/sunum-paftasi.png'
  },
  {
    id: 9,
    title: 'SANATÇI KONAKLAMASI',
    year: 2023,
    category: 'PROJE 1',
    location: 'İSTANBUL',
    image: '/images/7-proje-1-secilenler/render/whatsapp-image-2023-01-04-at-11.32.28-pm-(2).jpeg',
    sketchImage: '/images/7-proje-1-secilenler/teknik_cizim/proje-1-arazi-model_page-0001.jpg'
  },
]);

const sortedProjects = computed(() => {
  // Always return projects in the order they are defined (chronological)
  return projects.value;
});

const navigateToProject = (projectId: number) => {
  router.push(`/projects/${projectId}`);
};

// Performance optimizations
let intersectionObserver: IntersectionObserver | null = null;

const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              intersectionObserver?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => intersectionObserver?.observe(img));
  }
};

onMounted(() => {
  initializeImageStates();
  setupLazyLoading();

  // Add focus event listeners for better keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
});

onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
  document.removeEventListener('keydown', handleKeyboardNavigation);
});

const handleKeyboardNavigation = (event: KeyboardEvent) => {
  // Allow arrow key navigation between project cards
  if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement?.classList.contains('project-card')) {
      event.preventDefault();
      const cards = Array.from(document.querySelectorAll('.project-card')) as HTMLElement[];
      const currentIndex = cards.indexOf(focusedElement);

      let nextIndex = currentIndex;
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % cards.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + cards.length) % cards.length;
          break;
      }

      cards[nextIndex]?.focus();
    }
  }
};
</script>

<style scoped>
.gallery {
  position: relative;
}

/* Enhanced Project Card Styles */
.project-card {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.project-card:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-annotation), 0 8px 32px rgba(0, 0, 0, 0.1);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Image Container */
.image-container {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-canvas);
}

.image-container::before {
  content: '';
  display: block;
  width: 100%;
  padding-bottom: 75%;
  /* 4:3 aspect ratio */
}

.project-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  /* Ensure crisp image rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.project-card:hover .project-image {
  transform: scale(1.01) translateZ(0);
  /* Reduced scale to prevent blur */
}

/* Enhanced Sketch Overlay */
.sketch-overlay {
  background-color: var(--color-canvas);
  mix-blend-mode: multiply;
  border-radius: 4px;
}

.sketch-overlay img {
  filter: sepia(1) contrast(1.2) brightness(0.9);
  transition: filter 0.3s ease;
  /* Ensure crisp image rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Improved Selection Border */
.selection-border {
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .selection-border,
.group:focus-within .selection-border {
  opacity: 1;
  transform: scale(0.98);
}

/* Enhanced Category Badge */
.image-container .absolute.top-sm.right-sm {
  transition: all 0.3s ease;
  border-radius: 4px;
  background-color: var(--color-canvas);
}

.project-card:hover .absolute.top-sm.right-sm {
  background-color: var(--color-canvas);
  transform: translateY(-1px);
}

/* Project Info Enhancements */
.project-info {
  padding: var(--spacing-sm) 0;
}

.project-info h2 {
  margin-bottom: 0.25rem;
  font-weight: 500;
  line-height: 1.3;
}

/* Enhanced Responsive Grid */
.projects-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .project-card {
    border-radius: 6px;
  }

  .image-container {
    aspect-ratio: 5/4;
    /* Slightly taller on mobile */
  }

  .project-info h2 {
    font-size: 1rem;
    line-height: 1.2;
  }

  .meta-data {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    gap: 1.5rem;
  }

  .project-card {
    border-radius: 4px;
  }

  .image-container {
    aspect-ratio: 6/5;
    /* Even taller on small mobile */
  }

  .project-info {
    padding: var(--spacing-xs) 0;
  }

  .project-info h2 {
    font-size: 0.9rem;
    margin-bottom: 0.125rem;
  }

  .meta-data {
    font-size: 0.7rem;
  }
}

/* Ultra-small screens */
@media (max-width: 360px) {
  .projects-grid {
    gap: 1rem;
  }

  .image-container {
    aspect-ratio: 3/2;
  }

  .project-info h2 {
    font-size: 0.85rem;
  }

  .meta-data {
    font-size: 0.65rem;
  }
}

/* Loading State Enhancements */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      var(--color-canvas) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      var(--color-canvas) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .project-card {
    border: 2px solid var(--color-ink);
  }

  .selection-border {
    border-width: 3px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .project-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .project-card:hover {
    transform: none;
    box-shadow: none;
  }

  .project-image,
  .sketch-overlay img {
    transition: none;
  }

  .image-placeholder {
    animation: none;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .project-card:hover {
    transform: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .project-card:active {
    transform: scale(0.99) translateZ(0);
    transition: transform 0.1s ease;
  }

  .project-image {
    /* Prevent any blur on touch devices */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  .project-card:hover .project-image {
    transform: translateZ(0);
  }

  .sketch-overlay {
    display: none;
    /* Hide hover overlays on touch devices */
  }

  .selection-border {
    display: none;
    /* Hide hover borders on touch devices */
  }
}

/* Print Styles */
@media print {
  .project-card {
    break-inside: avoid;
    margin-bottom: 2rem;
    box-shadow: none;
    border: 1px solid #000;
  }

  .sketch-overlay,
  .selection-border {
    display: none;
  }

  .project-image {
    filter: grayscale(100%);
  }
}
</style>
