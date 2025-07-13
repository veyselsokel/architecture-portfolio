<template>
  <!-- The Study: A multi-part layout that tells a story -->
  <div class="study min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">

      <!-- Navigation Back -->
      <nav class="mb-3xl">
        <router-link to="/projects"
          class="inline-flex items-center gap-sm text-blueprint hover:text-annotation transition-colors duration-250 ease-architect">
          <ChevronLeft class="w-4 h-4" />
          <span class="meta-data uppercase tracking-wider">Galeriye Dön</span>
        </router-link>
      </nav>

      <div v-if="project">
        <!-- Project Header -->
        <header class="mb-3xl">
          <div class="border-b border-blueprint/30 pb-2xl">
            <h1 class="h1 text-ink mb-md">{{ project.title }}</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
              <div class="meta-data text-blueprint">
                <div class="mb-xs">YIL</div>
                <div>{{ project.year }}</div>
              </div>
              <div class="meta-data text-blueprint">
                <div class="mb-xs">KATEGORİ</div>
                <div>{{ project.category }}</div>
              </div>
              <div class="meta-data text-blueprint">
                <div class="mb-xs">KONUM</div>
                <div>{{ project.location }}</div>
              </div>
            </div>
            <div class="body-text text-ink leading-relaxed max-w-4xl">
              {{ project.description }}
            </div>
            <div class="meta-data text-blueprint mt-lg">
              ROL: {{ project.role }}
            </div>
          </div>
        </header>

        <!-- Interactive Toggle: Process vs Execution -->
        <div v-if="hasProcessContent && hasExecutionContent" class="study-toggle mb-3xl">
          <div class="flex justify-center">
            <div class="inline-flex border border-ink">
              <button @click="viewMode = 'process'" :class="[
                'px-xl py-md h3 transition-all duration-250 ease-architect',
                viewMode === 'process'
                  ? 'bg-ink text-canvas'
                  : 'bg-canvas text-ink hover:bg-annotation hover:text-canvas'
              ]">
                SÜREÇ
              </button>
              <button @click="viewMode = 'execution'" :class="[
                'px-xl py-md h3 border-l border-ink transition-all duration-250 ease-architect',
                viewMode === 'execution'
                  ? 'bg-ink text-canvas'
                  : 'bg-canvas text-ink hover:bg-annotation hover:text-canvas'
              ]">
                UYGULAMA
              </button>
            </div>
          </div>

          <!-- Active State Underline -->
          <div class="flex justify-center mt-sm">
            <div class="relative w-64 h-px bg-blueprint/30">
              <div class="absolute top-0 h-px bg-annotation transition-all duration-400 ease-architect" :class="[
                viewMode === 'process' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
              ]"></div>
            </div>
          </div>
        </div>

        <!-- Single Tab Header (when only one section has content) -->
        <div v-else-if="hasProcessContent || hasExecutionContent" class="single-tab-header text-center mb-3xl">
          <h2 v-if="hasProcessContent" class="h2 text-ink">TASARIM SÜRECİ</h2>
          <h2 v-else-if="hasExecutionContent" class="h2 text-ink">FINAL UYGULAMA</h2>
        </div>

        <!-- Process Gallery (Sketches, Diagrams, Concept Notes) -->
        <section v-if="(viewMode === 'process' && hasProcessContent) || (hasProcessContent && !hasExecutionContent)"
          class="process-section">
          <div v-if="hasProcessContent && hasExecutionContent" class="text-center mb-2xl">
            <h2 class="h2 text-ink mb-sm">TASARIM SÜRECİ</h2>
            <div class="meta-data text-blueprint">
              ESKİZLER, DİYAGRAMLAR VE KONSEPT NOTLARI
            </div>
          </div>
          <div v-else class="text-center mb-2xl">
            <div class="meta-data text-blueprint">
              ESKİZLER, DİYAGRAMLAR VE KONSEPT NOTLARI
            </div>
          </div>

          <!-- Konsept Diyagramı -->
          <div v-if="project.conceptDiagram" class="concept-diagram mb-3xl">
            <h3 class="h3 text-ink mb-lg text-center">KONSEPT ÇALIŞMASI</h3>
            <div class="max-w-4xl mx-auto">
              <div class="image-frame border border-blueprint bg-canvas p-md mb-lg">
                <img :src="project.conceptDiagram.image" :alt="`${project.title} - Konsept Diyagramı`"
                  class="thumbnail-image w-full h-auto cursor-pointer hover:opacity-80 transition-opacity duration-250"
                  loading="lazy" decoding="async"
                  @click="openFocusMode(project.conceptDiagram.image, 'Konsept Diyagramı')"
                  @load="handleImageLoad(project.conceptDiagram.image, $event)"
                  @error="handleImageError(project.conceptDiagram.image, $event)" />
              </div>
              <div class="body-text text-ink leading-relaxed">
                {{ project.conceptDiagram.explanation }}
              </div>
            </div>
          </div>

          <!-- Süreç Eskizleri -->
          <div class="sketches-grid">
            <h3 class="h3 text-ink mb-lg text-center">SÜREÇ ESKİZLERİ</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              <div v-for="(sketch, index) in project.sketches" :key="`sketch-${index}`" class="sketch-item group">
                <div
                  class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img :src="sketch" :alt="`${project.title} - Eskiz ${index + 1}`"
                    class="thumbnail-image w-full h-auto cursor-pointer filter sepia-0 group-hover:sepia transition-all duration-250"
                    loading="lazy" decoding="async" @click="openFocusMode(sketch, `Süreç Eskizi ${index + 1}`)"
                    @load="handleImageLoad(sketch, $event)" @error="handleImageError(sketch, $event)" />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  ESKİZ {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Execution Gallery (Final Renders and Real-world Photography) -->
        <section v-if="(viewMode === 'execution' && hasExecutionContent) || (hasExecutionContent && !hasProcessContent)"
          class="execution-section">
          <div v-if="hasProcessContent && hasExecutionContent" class="text-center mb-2xl">
            <h2 class="h2 text-ink mb-sm">FINAL UYGULAMA</h2>
            <div class="meta-data text-blueprint">
              RENDERLAR VE GERÇEK DÜNYA FOTOĞRAFLARI
            </div>
          </div>
          <div v-else class="text-center mb-2xl">
            <div class="meta-data text-blueprint">
              RENDERLAR VE GERÇEK DÜNYA FOTOĞRAFLARI
            </div>
          </div>

          <!-- Final Renders -->
          <div class="renders-section mb-3xl">
            <h3 class="h3 text-ink mb-lg text-center">MİMARİ RENDERLAR</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div v-for="(render, index) in project.renders" :key="`render-${index}`" class="render-item group">
                <div
                  class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img :src="render" :alt="`${project.title} - Render ${index + 1}`"
                    class="thumbnail-image w-full h-auto cursor-pointer group-hover:brightness-105 transition-all duration-250"
                    loading="lazy" decoding="async" @click="openFocusMode(render, `Mimari Render ${index + 1}`)"
                    @load="handleImageLoad(render, $event)" @error="handleImageError(render, $event)" />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  RENDER {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>

          <!-- Real-world Photos -->
          <div v-if="project.photos && project.photos.length > 0" class="photos-section">
            <h3 class="h3 text-ink mb-lg text-center">TAMAMLANMIŞ PROJE</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div v-for="(photo, index) in project.photos" :key="`photo-${index}`" class="photo-item group">
                <div
                  class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img :src="photo" :alt="`${project.title} - Fotoğraf ${index + 1}`"
                    class="thumbnail-image w-full h-auto cursor-pointer group-hover:brightness-105 transition-all duration-250"
                    loading="lazy" decoding="async" @click="openFocusMode(photo, `Proje Fotoğrafı ${index + 1}`)"
                    @load="handleImageLoad(photo, $event)" @error="handleImageError(photo, $event)" />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  FOTOĞRAF {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>

          <!-- PDF Documents -->
          <div v-if="project.pdfs && project.pdfs.length > 0" class="pdfs-section mt-3xl">
            <h3 class="h3 text-ink mb-lg text-center">TEKNİK BELGELER</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              <a v-for="(pdf, index) in project.pdfs" :key="`pdf-${index}`" :href="pdf" :download="pdf.split('/').pop()"
                target="_blank"
                class="pdf-item group block border border-blueprint hover:border-annotation transition-colors duration-250 p-lg bg-canvas">
                <div class="flex items-center gap-md mb-sm">
                  <svg class="w-8 h-8 text-blueprint group-hover:text-annotation transition-colors" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <div class="flex-1">
                    <div class="h4 text-ink group-hover:text-annotation transition-colors truncate">
                      {{ pdf.split('/').pop()?.replace('.pdf', '') }}
                    </div>
                    <div class="meta-data text-blueprint">PDF DOCUMENT</div>
                  </div>
                </div>
                <div class="meta-data text-blueprint group-hover:text-annotation transition-colors">
                  CLICK TO DOWNLOAD
                </div>
              </a>
            </div>
          </div>
        </section>

        <!-- Project Navigation -->
        <nav v-if="project" class="project-nav mt-3xl pt-2xl border-t border-blueprint/30">
          <div class="flex justify-between items-center">
            <button @click="navigateToProject(project.id - 1)" :disabled="project.id === 1"
              class="nav-button flex items-center gap-sm text-blueprint hover:text-annotation disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-250">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="meta-data">ÖNCEKİ PROJE</span>
            </button>

            <router-link to="/projects" class="text-center">
              <div class="meta-data text-blueprint hover:text-annotation transition-colors duration-250">
                TÜM PROJELER
              </div>
            </router-link>

            <button @click="navigateToProject(project.id + 1)" :disabled="project.id === 9"
              class="nav-button flex items-center gap-sm text-blueprint hover:text-annotation disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-250">
              <span class="meta-data">SONRAKİ PROJE</span>
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>

      <!-- Project Not Found -->
      <div v-else class="text-center py-3xl">
        <h2 class="h2 text-ink mb-lg">PROJECT NOT FOUND</h2>
        <div class="meta-data text-blueprint mb-xl">
          THE REQUESTED PROJECT DOES NOT EXIST
        </div>
        <router-link to="/projects"
          class="inline-flex items-center gap-sm px-lg py-md border border-ink text-ink hover:border-annotation hover:text-annotation transition-all duration-250">
          <span class="uppercase tracking-wider">Galeriye Dön</span>
        </router-link>
      </div>
    </div>

    <!-- Focus Mode Overlay -->
    <transition name="focus-mode">
      <div v-if="focusMode.isActive"
        class="fixed inset-0 bg-ink/95 backdrop-blur-sm z-50 flex items-center justify-center p-lg"
        @click="closeFocusMode">
        <div class="max-w-7xl max-h-full w-full h-full flex flex-col" @click.stop>
          <!-- Focus Mode Header -->
          <header class="flex justify-between items-center mb-lg">
            <div class="meta-data text-canvas">
              {{ focusMode.caption }}
              <span v-if="focusMode.images.length > 1" class="ml-md opacity-70">
                ({{ focusMode.currentIndex + 1 }} / {{ focusMode.images.length }})
              </span>
            </div>

            <!-- Header Action Buttons -->
            <div class="flex items-center gap-md pt-12">
              <!-- Download Button -->
              <button @click="downloadImage"
                class="bg-canvas/10 hover:bg-canvas/40 text-white p-2 rounded-full transition-all duration-250 hover:scale-110 backdrop-blur-sm"
                title="Fotoğrafı İndir">
                <Download class="w-6 h-6" />
              </button>

              <!-- Close Button -->
              <button @click="closeFocusMode"
                class="bg-canvas/10 hover:bg-canvas/40 text-white p-2 rounded-full transition-all duration-250 hover:scale-110 backdrop-blur-sm"
                title="Kapat">
                <X class="w-6 h-6" />
              </button>
            </div>
          </header>

          <!-- Focus Mode Image Container with Spaced Navigation -->
          <div class="focus-mode-container flex-1 flex items-center justify-center px-4">
            <!-- Previous Button with spacing -->
            <button v-if="focusMode.images.length > 1" @click="navigateImage('prev')"
              class="focus-mode-nav-button bg-canvas/20 hover:bg-canvas/40 text-white p-4 rounded-full transition-all duration-250 hover:scale-110 flex-shrink-0 mr-12">
              <ChevronLeft class="w-8 h-8" />
            </button>

            <!-- Image Container (Centered) -->
            <div class="focus-mode-image-container flex items-center justify-center">
              <img :src="focusMode.imageUrl" :alt="focusMode.caption"
                class="max-w-full max-h-full object-contain transition-opacity duration-300" loading="eager"
                decoding="async" />
            </div>

            <!-- Next Button with spacing -->
            <button v-if="focusMode.images.length > 1" @click="navigateImage('next')"
              class="focus-mode-nav-button bg-canvas/20 hover:bg-canvas/40 text-white p-4 rounded-full transition-all duration-250 hover:scale-110 flex-shrink-0 ml-12">
              <ChevronRight class="w-8 h-8" />
            </button>
          </div>

          <!-- Navigasyon Noktaları -->
          <div v-if="focusMode.images.length > 1" class="flex justify-center mt-lg space-x-3">
            <button v-for="(image, index) in focusMode.images" :key="index"
              @click="focusMode.currentIndex = index; focusMode.imageUrl = image; focusMode.caption = focusMode.captions[index]"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-250 border-2',
                index === focusMode.currentIndex
                  ? 'bg-white border-white shadow-lg'
                  : 'bg-white/30 border-white/50 hover:bg-white/50 hover:border-white/70'
              ]">
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-vue-next';

interface ProjectDetail {
  id: number;
  title: string;
  year: number;
  category: string;
  location: string;
  description: string;
  role: string;
  sketches: string[];
  renders: string[];
  photos: string[];
  pdfs?: string[];
  conceptDiagram?: {
    image: string;
    explanation: string;
  };
}

const route = useRoute();
const router = useRouter();

const project = ref<ProjectDetail | null>(null);
const viewMode = ref<'process' | 'execution'>('process');

const focusMode = ref({
  isActive: false,
  imageUrl: '',
  caption: '',
  currentIndex: 0,
  images: [] as string[],
  captions: [] as string[]
});

// Check if project has any process content
const hasProcessContent = computed(() => {
  if (!project.value) return false;

  // Check if there are sketches or concept diagram
  const hasSketches = project.value.sketches && project.value.sketches.length > 0;
  const hasConceptDiagram = project.value.conceptDiagram && project.value.conceptDiagram.image;

  return hasSketches || hasConceptDiagram;
});

// Check if project has execution content
const hasExecutionContent = computed(() => {
  if (!project.value) return false;

  const hasRenders = project.value.renders && project.value.renders.length > 0;
  const hasPhotos = project.value.photos && project.value.photos.length > 0;

  return hasRenders || hasPhotos;
});

// Image loading state management
const imageLoadingStates = ref<Map<string, 'loading' | 'loaded' | 'error'>>(new Map());

const handleImageLoad = (url: string, event?: Event) => {
  imageLoadingStates.value.set(url, 'loaded');

  // Add loaded class to the image element for CSS styling
  if (event && event.target) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
    img.setAttribute('data-loaded', 'true');
  }
};

const handleImageError = (url: string, event?: Event) => {
  imageLoadingStates.value.set(url, 'error');

  // Add error handling if needed
  if (event && event.target) {
    const img = event.target as HTMLImageElement;
    img.classList.add('error');
  }
};

// Mock data for project details
const mockProjects: ProjectDetail[] = [
  {
    id: 1,
    title: 'AGROTOPIA KENTSEL TARIM PROJESİ',
    year: 2025,
    category: 'BİTİRME PROJESİ',
    location: 'İSTANBUL',
    description: 'Yerel kaynakları destekleyerek kentsel ve kırsal yaşamı bütünleştiren, sağlıklı gıdaya erişimi artıran ve sürdürülebilir bir kentsel tarım modeli oluşturmayı amaçlayan bir proje tasarladım.',
    role: 'TASARIMCI MİMAR',
    sketches: [
      '/images/1-bitirme-secilenler/5_teknik.jpg',
      '/images/1-bitirme-secilenler/6_teknik.jpg',
      '/images/1-bitirme-secilenler/7_teknik.jpg',
      '/images/1-bitirme-secilenler/8_teknik.jpg',
      '/images/1-bitirme-secilenler/9_teknik.jpg',
      '/images/1-bitirme-secilenler/10_teknik.jpg',
      '/images/1-bitirme-secilenler/11_teknik.jpg',
      '/images/1-bitirme-secilenler/12_teknik.jpg',
      '/images/1-bitirme-secilenler/13_teknik.jpg',
    ],
    renders: [
      '/images/1-bitirme-secilenler/1_render.jpg',
      '/images/1-bitirme-secilenler/2_render.jpg',
      '/images/1-bitirme-secilenler/3_render.jpg',
      '/images/1-bitirme-secilenler/4_render.jpg',
    ],
    photos: [
      '/images/1-bitirme-secilenler/1_render.jpg',
      '/images/1-bitirme-secilenler/2_render.jpg',
      '/images/1-bitirme-secilenler/3_render.jpg',
      '/images/1-bitirme-secilenler/4_render.jpg',
    ],
  },
  {
    id: 2,
    title: 'ÖZEL EĞİTİM REHABİLİTASYON MERKEZİ',
    year: 2024,
    category: 'PROJE 5',
    location: 'İSTANBUL',
    description: 'Özel ilgiye ihtiyaç duyan ilkokul ve ortaokul düzeyindeki çocuklar için kapsamlı eğitim alabilecekleri bir rehabilitasyon merkezi tasarladım.',
    role: 'ÖĞRENCİ TASARIMCI',
    sketches: [
      '/images/2-proje-5-secilen/arazi-proje-5-photoshop_page-0001-(1).jpg',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124541.png',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124557.png',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124606.png',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124647.png',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124655.png',
      '/images/2-proje-5-secilen/ekran-goruntusu-2025-07-11-124703.png',
    ],
    renders: [
      '/images/2-proje-5-secilen/a3-teslim_page-0002.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0003.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0004.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0005.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0006.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0007.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0008.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0009.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0010.jpg',
      '/images/2-proje-5-secilen/a3-teslim_page-0011.jpg',
    ],
    photos: [
      '/images/2-proje-5-secilen/whatsapp-gorsel-2025-07-04-saat-13.00.50_4046f872.jpg',
    ],
  },
  {
    id: 3,
    title: 'OFİS STAJI - ŞAT MİMARLIK',
    year: 2023,
    category: 'STAJ',
    location: 'İSTANBUL',
    description: 'Proje aşamaları hakkında deneyim kazandım. Belediyedeki iş süreçlerini uygulamalı olarak öğrendim.',
    role: 'STAJYER MİMAR',
    sketches: [],
    renders: [],
    photos: [
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.56_10fc57d8.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.56_e5961c7d.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.57_11df8fa6.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.58_4312c4db.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.59_9f4217d0.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.21.59_3685ca66.jpg',
      '/images/9-ofis-staji-secilenler/whatsapp-gorsel-2025-07-08-saat-15.22.00_246e841f.jpg',
    ],
  },
  {
    id: 4,
    title: 'KONAKLAMA KOMPLEKSİ',
    year: 2024,
    category: 'PROJE 4',
    location: 'İSTANBUL',
    description: 'Otel odaklı, konferans salonu, atölyeler ve açık ofisler gibi toplu etkinlik alanları içeren bir proje tasarladım.',
    role: 'ÖĞRENCİ TASARIMCI',
    sketches: [
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0002.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0003.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0004.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0005.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0006.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0007.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0008.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0009.jpg',
    ],
    renders: [
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0001.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0010.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0011.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0012.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0013.jpg',
      '/images/3-proje-4-secilenler/proje-4-a3-teslimleri_page-0014.jpg',
      '/images/3-proje-4-secilenler/ekran-goruntusu-2025-07-11-123917.png',
      '/images/3-proje-4-secilenler/ekran-goruntusu-2025-07-11-124052.png',
      '/images/3-proje-4-secilenler/ekran-goruntusu-2025-07-11-124141.png',
      '/images/3-proje-4-secilenler/ekran-goruntusu-2025-07-11-124154.png',
      '/images/3-proje-4-secilenler/ekran-goruntusu-2025-07-11-124209.png',
    ],
    photos: [],
  },
  {
    id: 5,
    title: 'UP MİMARİ DETAY',
    year: 2024,
    category: 'DETAY',
    location: 'İSTANBUL',
    description: 'Mimari detaylanırma ve yapı sistemleri üzerine odaklanan teknik çalışma. Strüktürel çözümler ve malzeme detayları incelenmiştir.',
    role: 'TEKNİK TASARIMCI',
    sketches: [
      '/images/4-up-secilenler/up-kismi-plan-model_page-0001.jpg',
      '/images/4-up-secilenler/up-merdiven-plani-model_page-0001.jpg',
      '/images/4-up-secilenler/up-cati-plani-model_page-0001.jpg',
      '/images/4-up-secilenler/up-nokta-detayi-model_page-0001.jpg',
      '/images/4-up-secilenler/up-cati-kesiti-model_page-0001.jpg',
      '/images/4-up-secilenler/up-merdivem-kesiti2-model_page-0001.jpg',
      '/images/4-up-secilenler/up-merdiven-kesiti1-model_page-0001.jpg',
      '/images/4-up-secilenler/up-sistem-kesiti-model_page-0001.jpg',
      '/images/4-up-secilenler/up-sistem-kesiti2-model_page-0001.jpg',
    ],
    renders: [
      '/images/4-up-secilenler/up-gorunus-model_page-0001.jpg',
      '/images/4-up-secilenler/up-banyo-model_page-0001.jpg',
      '/images/4-up-secilenler/up-mutfak-model_page-0001.jpg',
    ],
    photos: [],
  },
  {
    id: 6,
    title: 'HALİÇ SURLARININ TANITILMASI',
    year: 2023,
    category: 'PROJE 3',
    location: 'İSTANBUL',
    description: 'Turistlerin ilgisini Haliç surlarına çekmek amacıyla surların tarihini anlatan bir müze ve kafe tasarladım. Bu projede taşıyıcı sistem olarak çelik kullandım. Cephede oksitlenmiş çelik olan corten malzemeyi tercih ettim.',
    role: 'ÖĞRENCİ TASARIMCI',
    sketches: [
      '/images/5-proje-3-secilenler/cc_3-photo.png',
      '/images/5-proje-3-secilenler/cc_4-photo.png',
      '/images/5-proje-3-secilenler/cc_6-photo.png',
      '/images/5-proje-3-secilenler/cc_7-photo.png',
    ],
    renders: [
      '/images/5-proje-3-secilenler/cc_1-photo.png',
      '/images/5-proje-3-secilenler/cc_2-photo.png',
      '/images/5-proje-3-secilenler/cc_5-photo.png',
      '/images/5-proje-3-secilenler/cc_8-photo.png',
    ],
    photos: [],
    pdfs: [
      '/images/5-proje-3-secilenler/proje-3-paftalar-1-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-2-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-3-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-4-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-5-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-6-model.pdf',
      '/images/5-proje-3-secilenler/proje-3-paftalar-7-model.pdf',
    ],
  },
  {
    id: 7,
    title: 'ŞANTİYE STAJI - ÇELİK MİMARLIK',
    year: 2023,
    category: 'STAJ',
    location: 'İSTANBUL',
    description: '7 bloktan oluşan bir sitenin kaba inşaat sürecinde yer aldım. Beton standartlarını, döküm sırasında dikkat edilmesi gerekenleri ve çelik bağlantılarının nasıl yapıldığını öğrendim.',
    role: 'STAJYER MİMAR',
    sketches: [],
    renders: [],
    photos: [
      '/images/8-santiye-staji-secilen/IMG_20230701_104837.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_104841.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105240.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105419.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105452.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105525.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105609.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230701_105617.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230704_101211.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230704_111252.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230704_111445.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230706_112540.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230706_112722.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_094859.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_094900.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_094933.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_100328.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_100813.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_101240.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230710_101441.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101258.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101329.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101429.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101433.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101546.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101645.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101651.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101739.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_101741.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230717_102118.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_122923.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_122949.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_122956.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123442.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123454.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123640.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123646.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123731.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123832.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123837.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_123914.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_124142_1.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230721_124142.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230731_121948.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230731_121959.jpg',
      '/images/8-santiye-staji-secilen/IMG_20230731_122003.jpg',
    ],
  },
  {
    id: 8,
    title: 'AFET SONRASI YAŞAM ALANI',
    year: 2023,
    category: 'PROJE 2',
    location: 'İSTANBUL',
    description: 'Olası İstanbul depremi sonrası insanları kaostan kurtaracak bir yaşam alanı tasarladım. Bu alanda yemekhane, ilk yardım noktası ve yaşam birimleri üzerine odaklandım.',
    role: 'ÖĞRENCİ TASARIMCI',
    sketches: [
      '/images/6-proje-2-secilenler/sunum-paftasi.png',
      '/images/6-proje-2-secilenler/sunum-paftasi-2.png',
    ],
    renders: [
      '/images/6-proje-2-secilenler/3d-render_6-photo_lighting.jpg',
    ],
    photos: [],
    pdfs: [
      '/images/6-proje-2-secilenler/vaziyet-plani-model.pdf',
      '/images/6-proje-2-secilenler/yemekhane-1-kat-model.pdf',
      '/images/6-proje-2-secilenler/yemekhane-2-katmodel.pdf',
      '/images/6-proje-2-secilenler/yemekhane-aa-kesit-model.pdf',
    ],
  },
  {
    id: 9,
    title: 'SANATÇI KONAKLAMASI',
    year: 2023,
    category: 'PROJE 1',
    location: 'İSTANBUL',
    description: 'Sanatçıların gruplarıyla tiyatro oyunlarını sergileyebilecekleri, içinde tiyatro ve sinema müzesi de bulunan bir kültür merkezi tasarladım.',
    role: 'ÖĞRENCİ TASARIMCI',
    sketches: [
      '/images/7-proje-1-secilenler/proje-1-arazi-model_page-0001.jpg',
      '/images/7-proje-1-secilenler/proje-1-siyah-beyaz_page-0001.jpg',
      '/images/7-proje-1-secilenler/siyah-beyaz-kesit_page-0001.jpg',
      '/images/7-proje-1-secilenler/tarihi-yapi-plan-siyah-beyaz_page-0001.jpg',
    ],
    renders: [
      '/images/7-proje-1-secilenler/whatsapp-image-2023-01-04-at-11.32.28-pm-(2).jpeg',
    ],
    photos: [],
  },
];

// Image preloading cache
const imageCache = new Map<string, HTMLImageElement>();

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

const preloadAdjacentImages = (currentIndex: number, images: string[]) => {
  const toPreload: string[] = [];

  // Preload next and previous images
  if (currentIndex > 0) toPreload.push(images[currentIndex - 1]);
  if (currentIndex < images.length - 1) toPreload.push(images[currentIndex + 1]);

  // Preload up to 3 images ahead and behind for smoother navigation
  for (let i = 1; i <= 3; i++) {
    if (currentIndex + i < images.length) toPreload.push(images[currentIndex + i]);
    if (currentIndex - i >= 0) toPreload.push(images[currentIndex - i]);
  }

  toPreload.forEach(src => {
    preloadImage(src).catch(() => {
      // Silently handle preload failures
    });
  });
};

const openFocusMode = (imageUrl: string, caption: string) => {
  if (!project.value) return;

  // Get all images from current view mode
  const allImages: string[] = [];
  const allCaptions: string[] = [];

  if (viewMode.value === 'process') {
    // Add concept diagram if exists
    if (project.value.conceptDiagram) {
      allImages.push(project.value.conceptDiagram.image);
      allCaptions.push('Konsept Diyagramı');
    }

    // Add sketches
    project.value.sketches.forEach((sketch, index) => {
      allImages.push(sketch);
      allCaptions.push(`Süreç Eskizi ${index + 1}`);
    });
  } else {
    // Add renders
    project.value.renders.forEach((render, index) => {
      allImages.push(render);
      allCaptions.push(`Mimari Render ${index + 1}`);
    });

    // Add photos if they exist
    if (project.value.photos && project.value.photos.length > 0) {
      project.value.photos.forEach((photo, index) => {
        allImages.push(photo);
        allCaptions.push(`Proje Fotoğrafı ${index + 1}`);
      });
    }
  }

  const currentIndex = allImages.indexOf(imageUrl);

  focusMode.value = {
    isActive: true,
    imageUrl,
    caption,
    currentIndex: currentIndex !== -1 ? currentIndex : 0,
    images: allImages,
    captions: allCaptions
  };

  // Preload adjacent images for faster navigation
  preloadAdjacentImages(focusMode.value.currentIndex, allImages);
};

const closeFocusMode = () => {
  focusMode.value.isActive = false;
};

// Download image function
const downloadImage = async () => {
  if (!focusMode.value.imageUrl) return;

  try {
    // Create a temporary anchor element for download
    const link = document.createElement('a');

    // Fetch the image and convert to blob for download
    const response = await fetch(focusMode.value.imageUrl);
    const blob = await response.blob();

    // Create object URL and set up download
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;

    // Generate filename from image URL and caption
    const urlParts = focusMode.value.imageUrl.split('/');
    const originalFileName = urlParts[urlParts.length - 1];
    const fileExtension = originalFileName.split('.').pop() || 'jpg';

    // Create a clean filename using project title and caption
    const cleanCaption = focusMode.value.caption.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞIÖÇ\s]/g, '').replace(/\s+/g, '_');
    const fileName = `${cleanCaption}.${fileExtension}`;

    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Download failed:', error);

    // Fallback: try opening in new tab
    window.open(focusMode.value.imageUrl, '_blank');
  }
};

const navigateImage = (direction: 'prev' | 'next') => {
  const totalImages = focusMode.value.images.length;
  if (totalImages <= 1) return;

  let newIndex = focusMode.value.currentIndex;

  if (direction === 'next') {
    newIndex = (newIndex + 1) % totalImages;
  } else {
    newIndex = (newIndex - 1 + totalImages) % totalImages;
  }

  focusMode.value.currentIndex = newIndex;
  focusMode.value.imageUrl = focusMode.value.images[newIndex];
  focusMode.value.caption = focusMode.value.captions[newIndex];

  // Preload adjacent images after navigation
  preloadAdjacentImages(newIndex, focusMode.value.images);
};

// Keyboard navigation
const handleKeyPress = (event: KeyboardEvent) => {
  if (!focusMode.value.isActive) return;

  switch (event.key) {
    case 'ArrowLeft':
      navigateImage('prev');
      break;
    case 'ArrowRight':
      navigateImage('next');
      break;
    case 'Escape':
      closeFocusMode();
      break;
    case 'd':
    case 'D':
      // Download shortcut (D key)
      event.preventDefault();
      downloadImage();
      break;
  }
};

const navigateToProject = (projectId: number) => {
  // Check if the project exists
  const targetProject = mockProjects.find(p => p.id === projectId);
  if (targetProject && projectId >= 1 && projectId <= 9) {
    router.push(`/projects/${projectId}`);
  }
};

// Function to load project data
const loadProject = () => {
  const projectId = Number(route.params.id);
  project.value = mockProjects.find(p => p.id === projectId) || null;

  // Close focus mode if it was open
  focusMode.value.isActive = false;

  // Set default view mode based on available content
  if (project.value) {
    if (hasProcessContent.value) {
      viewMode.value = 'process';
    } else if (hasExecutionContent.value) {
      viewMode.value = 'execution';
    }
  }
};

// Watch for route parameter changes
watch(() => route.params.id, () => {
  loadProject();
}, { immediate: true });

onMounted(() => {
  // Add keyboard event listener
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  // Remove keyboard event listener
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style scoped>
.study {
  position: relative;
}

/* Image Frames */
.image-frame {
  position: relative;
  background-color: var(--color-canvas);
}

.image-frame img {
  display: block;
  width: 100%;
  height: auto;
}

/* Focus Mode Transitions */
.focus-mode-enter-active,
.focus-mode-leave-active {
  transition: all 0.4s ease;
}

.focus-mode-enter-from,
.focus-mode-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Focus Mode Navigation */
.focus-mode-nav-button {
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.focus-mode-nav-button:hover {
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Button Spacing */
.focus-mode-nav-button.mr-12 {
  margin-right: 3rem !important;
}

.focus-mode-nav-button.ml-12 {
  margin-left: 3rem !important;
}

/* Responsive Focus Mode Navigation */
@media (max-width: 768px) {
  .focus-mode-nav-button {
    padding: 0.75rem;
  }

  .focus-mode-nav-button .w-8 {
    width: 1.5rem;
    height: 1.5rem;
  }

  /* Reduce padding on smaller screens */
  .focus-mode-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Adjust button spacing on tablet */
  .focus-mode-nav-button.mr-12 {
    margin-right: 2rem !important;
  }

  .focus-mode-nav-button.ml-12 {
    margin-left: 2rem !important;
  }
}

@media (max-width: 640px) {
  .focus-mode-nav-button {
    padding: 0.5rem;
  }

  .focus-mode-nav-button .w-8 {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Even less padding on mobile */
  .focus-mode-container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  /* Adjust button spacing on mobile */
  .focus-mode-nav-button.mr-12 {
    margin-right: 1.5rem !important;
  }

  .focus-mode-nav-button.ml-12 {
    margin-left: 1.5rem !important;
  }
}

/* Study Toggle Animation */
.study-toggle {
  position: relative;
}

/* Navigation Buttons */
.nav-button {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.25s ease;
}

.nav-button:hover:not(:disabled) {
  background-color: rgba(107, 122, 143, 0.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.project-nav {
  margin-top: 2rem;
  padding-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .study-toggle .inline-flex {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .study-toggle button {
    width: 100%;
  }

  .study-toggle .border-l {
    border-left: none;
    border-top: 1px solid var(--color-ink);
  }
}

@media (max-width: 480px) {
  .project-nav .flex {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }
}

/* Lightbox Header Button Styling */
.focus-mode header button {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.focus-mode header button:hover {
  background-color: rgba(244, 244, 241, 0.5);
  transform: scale(1.1);
}

.focus-mode header button:active {
  transform: scale(0.95);
}

/* Download button specific styling */
button[title="Fotoğrafı İndir"]:hover {
  background-color: rgba(34, 197, 94, 0.2);
  color: rgb(34, 197, 94);
}

/* Mobile header button adjustments */
@media (max-width: 768px) {
  .focus-mode header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  .focus-mode header button {
    min-width: 40px;
    min-height: 40px;
  }

  .focus-mode header .flex {
    order: -1;
  }
}

/* Image Performance Optimizations */
img {
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}

.focus-mode-overlay img {
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Gallery images optimized for faster loading */
.image-frame img {
  content-visibility: auto;
  contain-intrinsic-size: 300px 200px;
}

/* Thumbnail Image Optimizations */
.thumbnail-image {
  /* Optimize image rendering for thumbnails */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;

  /* Reduce quality for faster loading */
  filter: contrast(0.95) brightness(1.02);

  /* GPU acceleration for smooth interactions */
  transform: translateZ(0);
  backface-visibility: hidden;

  /* Progressive loading effect */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumbnail-image.loaded,
.thumbnail-image[data-loaded="true"] {
  opacity: 1;
}

/* Thumbnail loading placeholder */
.image-frame {
  position: relative;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.image-frame:has(.thumbnail-image.loaded) {
  background: var(--color-canvas);
  animation: none;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

/* Thumbnail size constraints for faster loading */
.thumbnail-image {
  max-height: 400px;
  object-fit: cover;
}

/* Gallery grid optimizations */
.sketch-item .thumbnail-image,
.render-item .thumbnail-image,
.photo-item .thumbnail-image {
  height: 250px;
  object-fit: cover;
}

/* Concept diagram thumbnail */
.concept-diagram .thumbnail-image {
  max-height: 500px;
  object-fit: contain;
}

/* Mobile optimizations */
@media (max-width: 768px) {

  .sketch-item .thumbnail-image,
  .render-item .thumbnail-image,
  .photo-item .thumbnail-image {
    height: 200px;
  }

  .concept-diagram .thumbnail-image {
    max-height: 300px;
  }
}

@media (max-width: 480px) {

  .sketch-item .thumbnail-image,
  .render-item .thumbnail-image,
  .photo-item .thumbnail-image {
    height: 180px;
  }

  .concept-diagram .thumbnail-image {
    max-height: 250px;
  }
}
</style>
