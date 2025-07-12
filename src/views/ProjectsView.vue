<template>
  <!-- The Gallery: A disciplined, curated projects grid -->
  <div class="gallery min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">

      <!-- Section Header -->
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg slide-in-left">SEÇİLMİŞ PROJELER</h1>
        <div class="meta-data text-blueprint slide-in-right delay-200">
          MİMARİ DÜŞÜNCENİN KÜRATÖRLÜ SERGİSİ
        </div>
      </header>

      <DottedDivider />

      <!-- Sorting Controls -->
      <div class="flex justify-center mb-3xl scale-in delay-400">
        <div class="inline-flex border border-blueprint">
          <button @click="sortBy = 'chronology'" :class="[
            'px-lg py-sm text-caption uppercase tracking-wider transition-all duration-250 ease-architect',
            sortBy === 'chronology'
              ? 'bg-annotation text-canvas border-annotation'
              : 'bg-canvas text-blueprint hover:text-annotation hover:bg-annotation/5'
          ]">
            KRONOLOJİK
          </button>
          <button @click="sortBy = 'category'" :class="[
            'px-lg py-sm text-caption uppercase tracking-wider border-l border-blueprint transition-all duration-250 ease-architect',
            sortBy === 'category'
              ? 'bg-annotation text-canvas border-annotation'
              : 'bg-canvas text-blueprint hover:text-annotation hover:bg-annotation/5'
          ]">
            KATEGORİ
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
        <article v-for="(project, index) in sortedProjects" :key="project.id"
          class="project-card group cursor-pointer slide-up" :style="{ 'animation-delay': `${0.6 + index * 0.1}s` }"
          @click="navigateToProject(project.id)">
          <!-- Project Image Container -->
          <div class="image-container relative overflow-hidden border border-blueprint bg-canvas mb-md">
            <!-- Main Project Image -->
            <img :src="project.image" :alt="project.title"
              class="project-image w-full h-64 object-cover transition-opacity duration-400 ease-architect"
              loading="lazy" decoding="async" />

            <!-- Sketch Overlay (appears on hover) -->
            <div
              class="sketch-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-architect">
              <img :src="project.sketchImage || project.image" :alt="`${project.title} - Eskiz`"
                class="w-full h-full object-cover filter sepia contrast-150" loading="lazy" decoding="async" />
            </div>

            <!-- Selection Border (inner border on hover) -->
            <div
              class="selection-border absolute inset-2 border border-annotation opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-architect pointer-events-none">
            </div>

            <!-- Category Badge -->
            <div class="absolute top-sm right-sm bg-canvas/90 border border-blueprint px-sm py-xs">
              <span class="meta-data text-blueprint">{{ project.category }}</span>
            </div>
          </div>

          <!-- Project Information -->
          <div class="project-info">
            <h2 class="h3 text-ink mb-xs group-hover:text-annotation transition-colors duration-250 ease-architect">
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import DottedDivider from '@/components/DottedDivider.vue';

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

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'BİTİRME PROJESİ',
    year: 2025,
    category: 'MEZUNIYET',
    location: 'İSTANBUL',
    image: '/images/1-bitirme-secilenler/1_render.jpg',
    sketchImage: '/images/1-bitirme-secilenler/5_teknik.jpg'
  },
  {
    id: 2,
    title: 'PROJE 5',
    year: 2024,
    category: 'AKADEMIK',
    location: 'İSTANBUL',
    image: '/images/2-proje-5-secilen/Ekran görüntüsü 2025-07-11 124606.png',
    sketchImage: '/images/2-proje-5-secilen/arazi proje 5 PHOTOSHOP_page-0001 (1).jpg'
  },
  {
    id: 3,
    title: 'PROJE 4',
    year: 2024,
    category: 'AKADEMIK',
    location: 'İSTANBUL',
    image: '/images/3-proje-4-secilenler/Ekran görüntüsü 2025-07-11 124052.png',
    sketchImage: '/images/3-proje-4-secilenler/Ekran görüntüsü 2025-07-11 123917.png'
  },
  {
    id: 4,
    title: 'UP MİMARİ DETAY',
    year: 2024,
    category: 'DETAY',
    location: 'İSTANBUL',
    image: '/images/4-up-secilenler/UP MERDİVEN KESİTİ1-Model_page-0001.jpg',
    sketchImage: '/images/4-up-secilenler/UP KISMİ PLAN-Model_page-0001.jpg'
  },
  {
    id: 5,
    title: 'PROJE 3',
    year: 2023,
    category: 'AKADEMIK',
    location: 'İSTANBUL',
    image: '/images/5-proje-3-secilenler/cc_1 - Photo.png',
    sketchImage: '/images/5-proje-3-secilenler/cc_2 - Photo.png'
  },
  {
    id: 6,
    title: 'PROJE 2 - YEMEKHANE',
    year: 2023,
    category: 'AKADEMIK',
    location: 'İSTANBUL',
    image: '/images/6-proje-2-secilenler/3D RENDER_6 - Photo_Lighting.jpg',
    sketchImage: '/images/6-proje-2-secilenler/SUNUM PAFTASI.png'
  },
  {
    id: 7,
    title: 'PROJE 1 - TARİHİ YAPI',
    year: 2023,
    category: 'AKADEMIK',
    location: 'İSTANBUL',
    image: '/images/7-proje-1-secilenler/WhatsApp Image 2023-01-04 at 11.32.28 PM (2).jpeg',
    sketchImage: '/images/7-proje-1-secilenler/proje 1 ARAZİ-Model_page-0001.jpg'
  },
  {
    id: 8,
    title: 'ŞANTİYE STAJI',
    year: 2023,
    category: 'STAJ',
    location: 'İSTANBUL',
    image: '/images/8-santiye-staji-secilen/IMG_20230701_104837.jpg',
    sketchImage: '/images/8-santiye-staji-secilen/IMG_20230701_104841.jpg'
  },
  {
    id: 9,
    title: 'OFİS STAJI',
    year: 2025,
    category: 'STAJ',
    location: 'İSTANBUL',
    image: '/images/9-ofis-staji-secilenler/WhatsApp Görsel 2025-07-08 saat 15.21.58_4312c4db.jpg',
    sketchImage: '/images/9-ofis-staji-secilenler/WhatsApp Görsel 2025-07-08 saat 15.21.56_e5961c7d.jpg'
  },
]);

const sortBy = ref<'chronology' | 'category'>('chronology');

const sortedProjects = computed(() => {
  const sorted = [...projects.value];
  if (sortBy.value === 'category') {
    sorted.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy.value === 'chronology') {
    sorted.sort((a, b) => b.year - a.year); // Newest first
  }
  return sorted;
});

const navigateToProject = (projectId: number) => {
  router.push(`/projects/${projectId}`);
};
</script>

<style scoped>
.gallery {
  position: relative;
}

/* Project Card Animations */
.project-card {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Image Container Effects */
.image-container {
  position: relative;
  aspect-ratio: 4/3;
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
}

.sketch-overlay {
  background-color: var(--color-canvas);
  mix-blend-mode: multiply;
}

.sketch-overlay img {
  filter: sepia(1) contrast(1.2) brightness(0.9);
}

/* Selection Border Animation */
.selection-border {
  animation: borderPulse 2s ease-in-out infinite;
}

@keyframes borderPulse {

  0%,
  100% {
    opacity: 0;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(0.98);
  }
}

.group:hover .selection-border {
  animation: none;
  opacity: 1;
  transform: scale(0.98);
}

/* Project Info */
.project-info h2 {
  margin-bottom: 0.25rem;
}

/* Responsive Grid Adjustments */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .image-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    gap: var(--spacing-md);
  }

  .image-container {
    height: 200px;
  }
}

/* Focus States for Accessibility */
.project-card:focus {
  outline: 2px solid var(--color-annotation);
  outline-offset: 4px;
}

.project-card:focus .selection-border {
  opacity: 1;
  transform: scale(0.98);
}
</style>
