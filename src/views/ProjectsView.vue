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
          <button
            @click="sortBy = 'chronology'"
            :class="[
              'px-lg py-sm text-caption uppercase tracking-wider transition-all duration-250 ease-architect',
              sortBy === 'chronology' 
                ? 'bg-annotation text-canvas border-annotation' 
                : 'bg-canvas text-blueprint hover:text-annotation hover:bg-annotation/5'
            ]"
          >
            KRONOLOJİK
          </button>
          <button
            @click="sortBy = 'category'"
            :class="[
              'px-lg py-sm text-caption uppercase tracking-wider border-l border-blueprint transition-all duration-250 ease-architect',
              sortBy === 'category' 
                ? 'bg-annotation text-canvas border-annotation' 
                : 'bg-canvas text-blueprint hover:text-annotation hover:bg-annotation/5'
            ]"
          >
            KATEGORİ
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
        <article
          v-for="(project, index) in sortedProjects"
          :key="project.id"
          class="project-card group cursor-pointer slide-up"
          :style="{ 'animation-delay': `${0.6 + index * 0.1}s` }"
          @click="navigateToProject(project.id)"
        >
          <!-- Project Image Container -->
          <div class="image-container relative overflow-hidden border border-blueprint bg-canvas mb-md">
            <!-- Main Project Image -->
            <img 
              :src="project.image" 
              :alt="project.title"
              class="project-image w-full h-64 object-cover transition-opacity duration-400 ease-architect"
            />
            
            <!-- Sketch Overlay (appears on hover) -->
            <div class="sketch-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-architect">
              <img 
                :src="project.sketchImage || project.image" 
                :alt="`${project.title} - Sketch`"
                class="w-full h-full object-cover filter sepia contrast-150"
              />
            </div>

            <!-- Selection Border (inner border on hover) -->
            <div class="selection-border absolute inset-2 border border-annotation opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-architect pointer-events-none"></div>
            
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
    title: 'SANATÇI KONAKLAMA',
    year: 2024,
    category: 'KÜLTÜREL',
    location: 'İSTANBUL',
    image: 'src/assets/images/Architecture Design Photo.jpg',
    sketchImage: 'src/assets/images/Architecture Draw Photo.jpg'
  },
  {
    id: 2,
    title: 'AFET SONRASI YAŞAM ALANI',
    year: 2024,
    category: 'ACİL DURUM',
    location: 'İSTANBUL',
    image: 'src/assets/images/Architecture Photo 31759015.jpg',
    sketchImage: 'src/assets/images/Architecture Draw Photo (1).jpg'
  },
  {
    id: 3,
    title: 'KONAKLAMA KOMPLEKSİ',
    year: 2023,
    category: 'TİCARİ',
    location: 'İSTANBUL',
    image: 'src/assets/images/Architecture Photo Yajun Dong.jpg',
    sketchImage: 'src/assets/images/Architecture Draw Photo (2).jpg'
  },
  {
    id: 4,
    title: 'HALİÇ SURLARININ TANITIMI',
    year: 2023,
    category: 'KÜLTÜREL',
    location: 'İSTANBUL',
    image: 'src/assets/images/Buildings.jpeg',
    sketchImage: 'src/assets/images/Architecture Draw Photo (3).jpg'
  },
  {
    id: 5,
    title: 'ÖZEL EĞİTİM REHABİLİTASYON',
    year: 2022,
    category: 'EĞİTİM',
    location: 'İSTANBUL',
    image: 'src/assets/images/draw.jpeg',
    sketchImage: 'src/assets/images/Architecture Draw Photo (4).jpg'
  },
  {
    id: 6,
    title: 'AGROTOPIA KENTSEL TARIM',
    year: 2025,
    category: 'SÜRDÜRÜLEBİLİR',
    location: 'İSTANBUL',
    image: 'src/assets/images/Interior Design Pin.jpeg',
    sketchImage: 'src/assets/images/Architecture Draw Photo (5).jpg'
  },
]);

const sortBy = ref<'chronology' | 'category'>('chronology');

const sortedProjects = computed(() => {
  let sorted = [...projects.value];
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
  0%, 100% { 
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