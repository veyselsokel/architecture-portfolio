<template>
  <!-- The Dossier: A clean, two-column structure -->
  <div class="dossier min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">
      
      <!-- Section Header -->
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg">ARCHITECTURAL DOSSIER</h1>
        <div class="meta-data text-blueprint">
          PHILOSOPHY, PRACTICE, AND PROFESSIONAL TRAJECTORY
        </div>
      </header>

      <DottedDivider />

      <!-- Main Content: Two-Column Layout -->
      <div class="dossier-content grid grid-cols-1 lg:grid-cols-2 gap-3xl mb-3xl">
        
        <!-- Left Column: Portrait -->
        <div class="portrait-section">
          <div class="image-frame border border-blueprint bg-canvas p-md mb-lg">
            <img 
              src="https://via.placeholder.com/600x800/6B7A8F/F4F4F1?text=ARCHITECT+PORTRAIT" 
              alt="Architect Portrait"
              class="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-architect"
            />
          </div>
          <div class="meta-data text-blueprint text-center">
            ARCHITECTURAL PORTRAIT / STUDIO SESSION / 2024
          </div>
        </div>

        <!-- Right Column: Philosophy and Timeline -->
        <div class="content-section">
          
          <!-- Architectural Philosophy -->
          <div class="philosophy mb-3xl">
            <h2 class="h2 text-ink mb-lg">DESIGN PHILOSOPHY</h2>
            <div class="space-y-lg">
              <p class="body-text text-ink leading-relaxed">
                Architecture is fundamentally about creating spaces that enhance human experience while respecting the natural environment. Every project begins with a deep understanding of context—both physical and cultural—and evolves through a rigorous process of analysis, synthesis, and refinement.
              </p>
              <p class="body-text text-ink leading-relaxed">
                I believe in the power of restraint, the beauty of materiality, and the importance of light as a design element. Each space should tell a story, serve its inhabitants, and contribute positively to the broader urban fabric.
              </p>
              <p class="body-text text-ink leading-relaxed">
                My practice embraces both traditional craftsmanship and contemporary technology, seeking innovative solutions that are grounded in timeless architectural principles.
              </p>
            </div>
          </div>

          <!-- Professional Timeline -->
          <div class="timeline">
            <h2 class="h2 text-ink mb-lg">PROFESSIONAL TRAJECTORY</h2>
            
            <!-- Timeline Container -->
            <div class="timeline-container relative">
              <!-- Vertical Line -->
              <div class="absolute left-0 top-0 bottom-0 w-px bg-blueprint"></div>
              
              <!-- Timeline Events -->
              <div class="timeline-events space-y-xl pl-xl">
                <div 
                  v-for="(event, index) in timeline" 
                  :key="index"
                  class="timeline-event relative group"
                >
                  <!-- Timeline Marker -->
                  <div class="absolute -left-xl top-sm w-2 h-2 bg-annotation border-2 border-canvas rounded-full transform -translate-x-1/2"></div>
                  
                  <!-- Event Content -->
                  <div class="event-content border-l-3 border-transparent group-hover:border-annotation transition-colors duration-250 pl-md">
                    <div class="meta-data text-blueprint mb-xs">{{ event.year }}</div>
                    <h3 class="h3 text-ink mb-sm">{{ event.title }}</h3>
                    <p class="body-text text-ink leading-relaxed">{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills and Tools Section -->
      <section class="skills-section">
        <header class="text-center mb-2xl">
          <h2 class="h2 text-ink mb-sm">TECHNICAL EXPERTISE</h2>
          <div class="meta-data text-blueprint">
            SOFTWARE, METHODOLOGIES, AND SPECIALIZED KNOWLEDGE
          </div>
        </header>

        <!-- Skills Grid -->
        <div class="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
          <div 
            v-for="(skill, index) in skills" 
            :key="index"
            class="skill-item border border-blueprint bg-canvas p-md text-center hover:border-annotation hover:bg-annotation/5 transition-all duration-250 ease-architect group"
          >
            <div class="meta-data text-blueprint group-hover:text-annotation transition-colors duration-250">
              {{ skill }}
            </div>
          </div>
        </div>
      </section>

      <!-- Recognition Section -->
      <section class="recognition-section mt-3xl pt-3xl border-t border-blueprint/30">
        <header class="text-center mb-2xl">
          <h2 class="h2 text-ink mb-sm">RECOGNITION & CREDENTIALS</h2>
          <div class="meta-data text-blueprint">
            AWARDS, PUBLICATIONS, AND PROFESSIONAL MEMBERSHIPS
          </div>
        </header>

        <div class="recognition-grid grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div 
            v-for="(recognition, index) in recognitions" 
            :key="index"
            class="recognition-item border border-blueprint bg-canvas p-lg hover:border-annotation transition-colors duration-250"
          >
            <div class="meta-data text-blueprint mb-sm">{{ recognition.year }}</div>
            <h3 class="h3 text-ink mb-sm">{{ recognition.title }}</h3>
            <p class="body-text text-ink">{{ recognition.description }}</p>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <footer class="contact-footer mt-3xl pt-2xl border-t border-blueprint/30 text-center">
        <div class="meta-data text-blueprint mb-lg">
          FOR INQUIRIES AND COLLABORATION
        </div>
        <router-link 
          to="/contact"
          class="inline-flex items-center gap-sm px-xl py-lg border border-ink text-ink hover:border-annotation hover:text-annotation transition-all duration-250 ease-architect"
        >
          <span class="h3">INITIATE CONTACT</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DottedDivider from '@/components/DottedDivider.vue';

const timeline = ref([
  {
    year: '2010',
    title: 'ARCHITECTURAL EDUCATION',
    description: 'Bachelor of Architecture, Magna Cum Laude, Harvard Graduate School of Design. Thesis focused on sustainable urban housing solutions.',
  },
  {
    year: '2012',
    title: 'STUDIO INTERNSHIP',
    description: 'Architectural intern at Tadao Ando Architect & Associates, Tokyo. Gained expertise in concrete construction and minimalist design principles.',
  },
  {
    year: '2015',
    title: 'PROFESSIONAL LICENSURE',
    description: 'Licensed architect in New York State. Specialized in residential and mixed-use development projects.',
  },
  {
    year: '2018',
    title: 'INDEPENDENT PRACTICE',
    description: 'Founded architectural studio specializing in sustainable design and community-focused projects. Emphasis on contextual sensitivity and material innovation.',
  },
  {
    year: '2020',
    title: 'DESIGN RECOGNITION',
    description: 'AIA Young Architects Award for innovative approach to urban residential development and environmental stewardship.',
  },
  {
    year: '2023',
    title: 'DIGITAL ATELIER',
    description: 'Launched digital practice focusing on the intersection of traditional craftsmanship and contemporary technology.',
  },
]);

const skills = ref([
  'RHINO 3D',
  'GRASSHOPPER',
  'REVIT',
  'AUTOCAD',
  'SKETCHUP',
  'LUMION',
  'V-RAY',
  'ADOBE CREATIVE SUITE',
  'BIM COORDINATION',
  'PARAMETRIC DESIGN',
  'SUSTAINABLE DESIGN',
  'CONSTRUCTION DOCUMENTATION',
  'PROJECT MANAGEMENT',
  'URBAN PLANNING',
  'MATERIAL RESEARCH',
  'BUILDING CODES',
]);

const recognitions = ref([
  {
    year: '2023',
    title: 'AIA DESIGN EXCELLENCE AWARD',
    description: 'Recognition for Urban Oasis residential complex, highlighting innovative sustainable design strategies.',
  },
  {
    year: '2022',
    title: 'ARCHITECTURAL RECORD AWARD',
    description: 'Featured in "Young Architects of the Year" for contributions to environmentally conscious architecture.',
  },
  {
    year: '2021',
    title: 'LEED ACCREDITED PROFESSIONAL',
    description: 'Certified in Leadership in Energy and Environmental Design, specializing in sustainable building practices.',
  },
  {
    year: '2020',
    title: 'AIA YOUNG ARCHITECTS AWARD',
    description: 'Honored for innovative approach to residential architecture and commitment to community engagement.',
  },
]);
</script>

<style scoped>
.dossier {
  position: relative;
}

/* Image Frames */
.image-frame {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Timeline Styling */
.timeline-container {
  position: relative;
}

.timeline-event {
  position: relative;
}

.timeline-event::before {
  content: '';
  position: absolute;
  left: -22px;
  top: 8px;
  width: 8px;
  height: 8px;
  background-color: var(--color-canvas);
  border: 2px solid var(--color-blueprint);
  border-radius: 50%;
  transform: translateX(-50%);
  transition: all 0.25s ease;
}

.timeline-event:hover::before {
  background-color: var(--color-annotation);
  border-color: var(--color-annotation);
  transform: translateX(-50%) scale(1.2);
}

/* Skills Grid */
.skill-item {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Recognition Items */
.recognition-item {
  position: relative;
  overflow: hidden;
}

.recognition-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--color-blueprint);
  transition: background-color 0.25s ease;
}

.recognition-item:hover::before {
  background-color: var(--color-annotation);
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .dossier-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
  
  .portrait-section {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
  
  .recognition-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-events {
    padding-left: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .image-frame {
    aspect-ratio: 1/1;
  }
}

/* Focus States for Accessibility */
.skill-item:focus,
.recognition-item:focus {
  outline: 2px solid var(--color-annotation);
  outline-offset: 2px;
}
</style>