<template>
  <!-- The Study: A multi-part layout that tells a story -->
  <div class="study min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">
      
      <!-- Navigation Back -->
      <nav class="mb-3xl">
        <router-link 
          to="/projects"
          class="inline-flex items-center gap-sm text-blueprint hover:text-annotation transition-colors duration-250 ease-architect"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
          </svg>
          <span class="meta-data uppercase tracking-wider">Return to Gallery</span>
        </router-link>
      </nav>

      <div v-if="project">
        <!-- Project Header -->
        <header class="mb-3xl">
          <div class="border-b border-blueprint/30 pb-2xl">
            <h1 class="h1 text-ink mb-md">{{ project.title }}</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
              <div class="meta-data text-blueprint">
                <div class="mb-xs">YEAR</div>
                <div>{{ project.year }}</div>
              </div>
              <div class="meta-data text-blueprint">
                <div class="mb-xs">CATEGORY</div>
                <div>{{ project.category }}</div>
              </div>
              <div class="meta-data text-blueprint">
                <div class="mb-xs">LOCATION</div>
                <div>{{ project.location }}</div>
              </div>
            </div>
            <div class="body-text text-ink leading-relaxed max-w-4xl">
              {{ project.description }}
            </div>
            <div class="meta-data text-blueprint mt-lg">
              ROLE: {{ project.role }}
            </div>
          </div>
        </header>

        <!-- Interactive Toggle: Process vs Execution -->
        <div class="study-toggle mb-3xl">
          <div class="flex justify-center">
            <div class="inline-flex border border-ink">
              <button
                @click="viewMode = 'process'"
                :class="[
                  'px-xl py-md h3 transition-all duration-250 ease-architect',
                  viewMode === 'process' 
                    ? 'bg-ink text-canvas' 
                    : 'bg-canvas text-ink hover:bg-annotation hover:text-canvas'
                ]"
              >
                PROCESS
              </button>
              <button
                @click="viewMode = 'execution'"
                :class="[
                  'px-xl py-md h3 border-l border-ink transition-all duration-250 ease-architect',
                  viewMode === 'execution' 
                    ? 'bg-ink text-canvas' 
                    : 'bg-canvas text-ink hover:bg-annotation hover:text-canvas'
                ]"
              >
                EXECUTION
              </button>
            </div>
          </div>
          
          <!-- Active State Underline -->
          <div class="flex justify-center mt-sm">
            <div class="relative w-64 h-px bg-blueprint/30">
              <div 
                class="absolute top-0 h-px bg-annotation transition-all duration-400 ease-architect"
                :class="[
                  viewMode === 'process' ? 'left-0 w-1/2' : 'left-1/2 w-1/2'
                ]"
              ></div>
            </div>
          </div>
        </div>

        <!-- Process Gallery (Sketches, Diagrams, Concept Notes) -->
        <section v-if="viewMode === 'process'" class="process-section">
          <div class="text-center mb-2xl">
            <h2 class="h2 text-ink mb-sm">DESIGN PROCESS</h2>
            <div class="meta-data text-blueprint">
              SKETCHES, DIAGRAMS, AND CONCEPT NOTES
            </div>
          </div>

          <!-- Concept Diagram -->
          <div v-if="project.conceptDiagram" class="concept-diagram mb-3xl">
            <h3 class="h3 text-ink mb-lg text-center">CONCEPT STUDY</h3>
            <div class="max-w-4xl mx-auto">
              <div class="image-frame border border-blueprint bg-canvas p-md mb-lg">
                <img 
                  :src="project.conceptDiagram.image" 
                  :alt="`${project.title} - Concept Diagram`"
                  class="w-full h-auto cursor-pointer hover:opacity-80 transition-opacity duration-250"
                  @click="openFocusMode(project.conceptDiagram.image, 'Concept Diagram')"
                />
              </div>
              <div class="body-text text-ink leading-relaxed">
                {{ project.conceptDiagram.explanation }}
              </div>
            </div>
          </div>

          <!-- Process Sketches -->
          <div class="sketches-grid">
            <h3 class="h3 text-ink mb-lg text-center">PROCESS SKETCHES</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              <div 
                v-for="(sketch, index) in project.sketches" 
                :key="`sketch-${index}`"
                class="sketch-item group"
              >
                <div class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img 
                    :src="sketch" 
                    :alt="`${project.title} - Sketch ${index + 1}`"
                    class="w-full h-auto cursor-pointer filter sepia-0 group-hover:sepia transition-all duration-250"
                    @click="openFocusMode(sketch, `Process Sketch ${index + 1}`)"
                  />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  SKETCH {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Execution Gallery (Final Renders and Real-world Photography) -->
        <section v-else class="execution-section">
          <div class="text-center mb-2xl">
            <h2 class="h2 text-ink mb-sm">FINAL EXECUTION</h2>
            <div class="meta-data text-blueprint">
              RENDERS AND REAL-WORLD PHOTOGRAPHY
            </div>
          </div>

          <!-- Final Renders -->
          <div class="renders-section mb-3xl">
            <h3 class="h3 text-ink mb-lg text-center">ARCHITECTURAL RENDERS</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div 
                v-for="(render, index) in project.renders" 
                :key="`render-${index}`"
                class="render-item group"
              >
                <div class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img 
                    :src="render" 
                    :alt="`${project.title} - Render ${index + 1}`"
                    class="w-full h-auto cursor-pointer group-hover:brightness-105 transition-all duration-250"
                    @click="openFocusMode(render, `Architectural Render ${index + 1}`)"
                  />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  RENDER {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>

          <!-- Real-world Photos -->
          <div class="photos-section">
            <h3 class="h3 text-ink mb-lg text-center">COMPLETED PROJECT</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div 
                v-for="(photo, index) in project.photos" 
                :key="`photo-${index}`"
                class="photo-item group"
              >
                <div class="image-frame border border-blueprint bg-canvas p-sm hover:border-annotation transition-colors duration-250">
                  <img 
                    :src="photo" 
                    :alt="`${project.title} - Photo ${index + 1}`"
                    class="w-full h-auto cursor-pointer group-hover:brightness-105 transition-all duration-250"
                    @click="openFocusMode(photo, `Project Photo ${index + 1}`)"
                  />
                </div>
                <div class="meta-data text-blueprint mt-sm text-center">
                  PHOTO {{ String(index + 1).padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Project Navigation -->
        <nav class="project-nav mt-3xl pt-2xl border-t border-blueprint/30">
          <div class="flex justify-between items-center">
            <button 
              @click="navigateToProject(project.id - 1)"
              :disabled="project.id === 1"
              class="nav-button flex items-center gap-sm text-blueprint hover:text-annotation disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-250"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
              </svg>
              <span class="meta-data">PREVIOUS PROJECT</span>
            </button>
            
            <router-link 
              to="/projects"
              class="text-center"
            >
              <div class="meta-data text-blueprint hover:text-annotation transition-colors duration-250">
                ALL PROJECTS
              </div>
            </router-link>

            <button 
              @click="navigateToProject(project.id + 1)"
              :disabled="project.id === 6"
              class="nav-button flex items-center gap-sm text-blueprint hover:text-annotation disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-250"
            >
              <span class="meta-data">NEXT PROJECT</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"/>
              </svg>
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
        <router-link 
          to="/projects"
          class="inline-flex items-center gap-sm px-lg py-md border border-ink text-ink hover:border-annotation hover:text-annotation transition-all duration-250"
        >
          <span class="uppercase tracking-wider">Return to Gallery</span>
        </router-link>
      </div>
    </div>

    <!-- Focus Mode Overlay -->
    <transition name="focus-mode">
      <div 
        v-if="focusMode.isActive" 
        class="fixed inset-0 bg-ink/95 backdrop-blur-sm z-50 flex items-center justify-center p-lg"
        @click="closeFocusMode"
      >
        <div class="max-w-6xl max-h-full w-full h-full flex flex-col">
          <!-- Focus Mode Header -->
          <header class="flex justify-between items-center mb-lg">
            <div class="meta-data text-canvas">
              {{ focusMode.caption }}
            </div>
            <button 
              @click="closeFocusMode"
              class="text-canvas hover:text-annotation transition-colors duration-250"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </header>
          
          <!-- Focus Mode Image -->
          <div class="flex-1 flex items-center justify-center">
            <img 
              :src="focusMode.imageUrl" 
              :alt="focusMode.caption"
              class="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';

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
  caption: ''
});

// Mock data for project details
const mockProjects: ProjectDetail[] = [
  {
    id: 1,
    title: 'URBAN OASIS',
    year: 2023,
    category: 'RESIDENTIAL',
    location: 'NEW YORK',
    description: 'A sustainable urban residential complex designed to integrate green spaces and community living. The project explores the relationship between private and public space through a series of interconnected courtyards and shared amenities.',
    role: 'LEAD ARCHITECT',
    sketches: [
      'src/assets/images/Architecture Draw Photo.jpg',
      'src/assets/images/Architecture Draw Photo (1).jpg',
      'src/assets/images/Architecture Draw Photo (2).jpg',
      'src/assets/images/Architecture Draw Photo (3).jpg',
    ],
    renders: [
      'src/assets/images/Architecture Design Photo.jpg',
      'src/assets/images/Architecture Design Photo 2786187.jpg',
    ],
    photos: [
      'src/assets/images/Architecture Photo Yajun Dong.jpg',
      'src/assets/images/Buildings.jpeg',
    ],
    conceptDiagram: {
      image: 'src/assets/images/Sketch Concept Building (1).jpeg',
      explanation: 'The concept revolves around a modular design, allowing for flexible living spaces and maximizing natural light and ventilation. Each unit is designed to foster community interaction while maintaining privacy.',
    },
  },
  {
    id: 2,
    title: 'ECO TOWER',
    year: 2022,
    category: 'COMMERCIAL',
    location: 'COPENHAGEN',
    description: 'A high-rise commercial building with integrated vertical gardens and energy-efficient systems. The design prioritizes sustainability through passive solar design and innovative materials.',
    role: 'PROJECT ARCHITECT',
    sketches: [
      'src/assets/images/Architecture Draw Photo (4).jpg',
      'src/assets/images/Architecture Draw Photo (5).jpg',
    ],
    renders: [
      'src/assets/images/Architecture Photo 31759015.jpg',
      'src/assets/images/draw.jpeg',
    ],
    photos: [
      'src/assets/images/Interior Design Pin.jpeg',
    ],
  },
  // Add more projects...
];

const openFocusMode = (imageUrl: string, caption: string) => {
  focusMode.value = {
    isActive: true,
    imageUrl,
    caption
  };
};

const closeFocusMode = () => {
  focusMode.value.isActive = false;
};

const navigateToProject = (projectId: number) => {
  router.push(`/projects/${projectId}`);
};

onMounted(() => {
  const projectId = Number(route.params.id);
  project.value = mockProjects.find(p => p.id === projectId) || null;
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

/* Study Toggle Animation */
.study-toggle {
  position: relative;
}

/* Navigation Buttons */
.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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
</style>