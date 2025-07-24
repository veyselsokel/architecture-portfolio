<template>
  <!-- The Dossier: A clean, two-column structure -->
  <div class="dossier min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">

      <!-- Section Header -->
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg slide-in-left">MİMARİ DOSYA</h1>
        <div class="meta-data text-blueprint slide-in-right delay-200">
          FİLOZOFİ, PRATİK VE PROFESYONEL SÜREÇ
        </div>
      </header>

      <DottedDivider />

      <!-- Main Content: Two-Column Layout -->
      <div class="dossier-content grid grid-cols-1 lg:grid-cols-2 gap-10 mb-3xl">

        <!-- Left Column: Portrait -->
        <div class="portrait-section scale-in delay-400">
          <div class="image-frame border border-blueprint bg-canvas p-md mb-lg">
            <img src="https://via.placeholder.com/600x800/6B7A8F/F4F4F1?text=ARCHITECT+PORTRAIT" alt="Mimar Portresi"
              class="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-architect" />
          </div>
          <div class="meta-data text-blueprint text-center pulse-slow">
            MİMARİ PORTRE / STÜDYO SEANSİ / 2024
          </div>
        </div>

        <!-- Right Column: Philosophy and Timeline -->
        <div class="content-section">

          <!-- Architectural Philosophy -->
          <div class="philosophy mb-3xl">
            <h2 class="h2 text-ink mb-lg slide-in-right delay-600">TASARIM FİLOZOFİSİ</h2>
            <div class="space-y-lg">
              <p class="body-text text-ink leading-relaxed slide-up delay-700">
                2003 yılında İstanbul'da doğdum. Memleketim Denizli'dir. Haliç Üniversitesi Mimarlık bölümünden 3.29
                genel ortalama ile mezun oldum.
                Mimarlık, insanların yaşam kalitesini yükseltecek mekanlar yaratma sanatıdır.
              </p>
              <p class="body-text text-ink leading-relaxed slide-up delay-800">
                Her proje, derinlemesine bir bağlam analizle başlar ve sürdürülebilirlik, işlevselliğin ve estetik
                değerlerin uyumu ile devam eder. Tasarım sürecimde geleneksel zanaatçılık ile çağdaş teknolojinin
                birleşiminden güç
                alırım.
              </p>
              <p class="body-text text-ink leading-relaxed slide-up delay-900">
                Udemy üzerinden mesleki kurslar alarak kendimi geliştirdim ve English Time'da İngilizce eğitimi aldım.
                B1 seviyesinde İngilizce bilgim ve çeşitli yazılım araçlarında uzmanlığım bulunmaktadır.
              </p>
            </div>
          </div>

          <!-- Professional Timeline -->
          <div class="timeline">
            <h2 class="h2 text-ink mb-lg slide-in-right delay-1000">PROFESYONEL SÜREÇ</h2>

            <!-- Timeline Container -->
            <div class="timeline-container relative">
              <!-- Vertical Line -->
              <div class="absolute left-0 top-0 bottom-0 w-px bg-blueprint"></div>

              <!-- Timeline Events -->
              <div class="timeline-events space-y-xl pl-xl">
                <div v-for="(event, index) in timeline" :key="index" class="timeline-event relative group slide-in-left"
                  :style="{ 'animation-delay': `${1.1 + index * 0.1}s` }">
                  <!-- Event Content -->
                  <div
                    class="event-content border-l-3 border-transparent group-hover:border-annotation transition-colors duration-250 pl-md">
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
          <h2 class="h2 text-ink mb-sm bounce-in delay-1000">TEKNİK UZMANLIK</h2>
          <div class="meta-data text-blueprint slide-up delay-1000">
            YAZILIM, METODOLOJİ VE UZMANLIK ALANLARI
          </div>
        </header>

        <!-- Skills Grid -->
        <div class="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
          <div v-for="(skill, index) in skills" :key="index"
            class="skill-item border border-blueprint bg-canvas p-md text-center hover:border-annotation hover:bg-annotation/5 transition-all duration-250 ease-architect group scale-in"
            :style="{ 'animation-delay': `${1.2 + index * 0.05}s` }">
            <div class="meta-data text-blueprint group-hover:text-annotation transition-colors duration-250">
              {{ skill }}
            </div>
          </div>
        </div>
      </section>

      <!-- Recognition Section -->
      <section class="recognition-section mt-3xl pt-3xl border-t border-blueprint/30">
        <header class="text-center mb-2xl">
          <h2 class="h2 text-ink mb-sm slide-in-left delay-1000">TANINIŞ VE YETERLİLİK</h2>
          <div class="meta-data text-blueprint slide-in-right delay-1000">
            EĞİTİM, SERTİFİKALAR VE PROFESYONEL DENEYIM
          </div>
        </header>

        <div class="recognition-grid grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div v-for="(recognition, index) in recognitions" :key="index"
            class="recognition-item border border-blueprint bg-canvas p-lg hover:border-annotation transition-colors duration-250 slide-up p-2"
            :style="{ 'animation-delay': `${1.1 + index * 0.2}s` }">
            <div class="meta-data text-blueprint mb-sm">{{ recognition.year }}</div>
            <h3 class="h3 text-ink mb-sm">{{ recognition.title }}</h3>
            <p class="body-text text-ink">{{ recognition.description }}</p>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <footer class="contact-footer mt-3xl pt-2xl border-t border-blueprint/30 text-center">
        <div class="meta-data text-blueprint mb-lg fade-in delay-1000">
          SORU VE İŞBİRLİĞİ İÇİN
        </div>
        <router-link to="/contact"
          class="inline-flex items-center gap-sm px-xl py-lg border border-ink text-ink hover:border-annotation hover:text-annotation transition-all duration-250 ease-architect bounce-in float delay-1000">
          <span class="h3">İLETİŞİME GEÇ</span>
          <ArrowRight class="w-5 h-5" />
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; import DottedDivider from '@/components/DottedDivider.vue'; import { ArrowRight } from 'lucide-vue-next'; import { useSeo } from '@/composables/useSeo'; useSeo('Hakkımda - Şeyma Betül Sökel', 'Mimar Şeyma Betül Sökel\'in tasarım felsefesi, profesyonel süreci ve teknik uzmanlıkları hakkında daha fazla bilgi edinin.'); const timeline = ref([
  {
    year: '2021',
    title: 'MİMARLIK EĞİTİMİNE BAŞLAMA',
    description: 'Haliç Üniversitesi Mimarlık Fakültesi\'nde eğitime başladım. Mimarlığın temel prensipleri ve tasarım süreçlerini öğrenmeye başladım.',
  },
  {
    year: '2023',
    title: 'OFİS STAJI - ŞAT MİMARLIK',
    description: 'Proje aşamaları hakkında deneyim kazandım. Belediyedeki iş süreçlerini uygulamalı olarak öğrendim.',
  },
  {
    year: '2023',
    title: 'ŞANTİYE STAJI - ÇELİK MİMARLIK',
    description: '7 bloktan oluşan bir sitenin kaba inşaat sürecinde yer aldım. Beton standartlarını, döküm sırasında dikkat edilmesi gerekenleri ve çelik bağlantılarının nasıl yapıldığını öğrendim.',
  },
  {
    year: '2024',
    title: 'MESLEKI GELİŞİM KURSLARI',
    description: 'Udemy üzerinden mesleki kurslar aldım. English Time\'da İngilizce kursu tamamlayarak B1 seviyesine ulaştım.',
  },
  {
    year: '2025',
    title: 'MİMARLIK MEZUNU - AGROTOPIA PROJESİ',
    description: 'Haliç Üniversitesi Mimarlık bölümünden 3.29 genel ortalama ile mezun oldum. Agrotopia Kentsel Tarım Projesi ile bitirme tezimi tamamladım.',
  },
]);

const skills = ref([
  'AUTOCAD',
  '3DS MAX',
  'ADOBE PHOTOSHOP',
  'SKETCHUP',
  'ADOBE INDESIGN',
  'LUMION',
  'V-RAY',
  'REVIT',
  'TEKNİK ÇİZİM',
  'PROJE GELİŞTİRME',
  'SÜRDÜRÜLEBİLİR TASARIM',
  'KENTSEL TARIM',
  'YARATICI DÜŞÜNCE',
  'TAKIM ÇALIŞMASI',
  'PROBLEM ÇÖZME',
  'İNGİLİZCE (B1)',
]);

const recognitions = ref([
  {
    year: '2025',
    title: 'HALİÇ ÜNİVERSİTESİ MİMARLIK MEZUNU',
    description: '3.29 genel ortalama ile Mimarlık Fakültesi\'nden başarıyla mezun oldum.',
  },
  {
    year: '2024',
    title: 'UDEMY MESLEKI SERTİFİKALARI',
    description: 'Mimarlık alanında çeşitli online kursları tamamlayarak mesleki bilgilerimi geliştirdim.',
  },
  {
    year: '2024',
    title: 'İNGİLİZCE B1 SERTİFİKASI',
    description: 'English Time\'da aldığım kurs ile İngilizce B1 seviyesine ulaştım.',
  },
  {
    year: '2023',
    title: 'ŞANTİYE VE OFİS STAJ DENEYİMİ',
    description: 'Çelik Mimarlık ve Şat Mimarlık\'ta yaptığım stajlar ile hem sahada hem ofiste pratik deneyim kazandım.',
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
