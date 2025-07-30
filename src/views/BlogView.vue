<template>
  <div class="blog-archive min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl" id="main-content">
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg slide-in-left">MİMARİ GÜNLÜK</h1>
        <div class="meta-data text-blueprint slide-in-right delay-200">
          TASARIM, DÜŞÜNCE VE İLHAM ÜZERİNE YAZILAR
        </div>
      </header>

      <DottedDivider />

      <div class="posts-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-xl">
        <article v-for="(post, index) in posts" :key="post.slug"
          class="post-card group cursor-pointer flex flex-col slide-up focus-within:outline-none focus-within:ring-2 focus-within:ring-annotation focus-within:ring-offset-2 rounded-lg"
          :style="{ 'animation-delay': `${0.6 + index * 0.1}s` }" @click="navigateToPost(post.slug)"
          @keydown.enter="navigateToPost(post.slug)" @keydown.space.prevent="navigateToPost(post.slug)" tabindex="0"
          role="button" :aria-label="`${post.title} makalesini oku - ${post.date}`">

          <div
            class="post-container border border-blueprint hover:border-annotation transition-all duration-300 overflow-hidden h-full flex flex-col rounded-sm bg-canvas shadow-sm hover:shadow-lg">
            <!-- Featured Image -->
            <div v-if="post.image" class="image-container aspect-ratio-container relative overflow-hidden bg-canvas">
              <!-- Loading placeholder -->
              <div v-if="!imageLoaded[post.slug]" class="image-placeholder absolute inset-0"></div>

              <img :src="post.image" :alt="`${post.title} önizleme görseli`"
                class="post-image w-full h-full object-cover transition-all duration-400 ease-architect lazy-image"
                :class="{ 'loaded': imageLoaded[post.slug] }" loading="lazy" decoding="async"
                @load="handleImageLoad(post.slug)" @error="handleImageError(post.slug)" />
            </div>

            <!-- Content Area -->
            <div class="post-content p-lg flex flex-col flex-grow">
              <div class="flex-grow">
                <div class="meta-data text-blueprint mb-md">{{ post.date }}</div>
                <h2
                  class="h3 text-ink mb-md group-hover:text-annotation group-focus-within:text-annotation transition-colors duration-300 line-clamp-2">
                  {{ post.title }}
                </h2>
                <p class="body-text text-ink mb-lg line-clamp-3 leading-relaxed">
                  {{ post.summary }}
                </p>
              </div>

              <!-- Read More CTA -->
              <div
                class="mt-auto inline-flex items-center gap-sm text-annotation group-hover:text-ink group-focus-within:text-ink transition-colors duration-300">
                <span class="meta-data uppercase tracking-wider font-medium">Devamını Oku</span>
                <ArrowRight
                  class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1" />
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Footer Note -->
      <footer class="text-center mt-3xl pt-3xl border-t border-blueprint/30">
        <div class="meta-data text-blueprint fade-in delay-1000">
          MİMARLIK VE TASARIM ÜZERİNE DÜŞÜNCELERİM
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSeo } from '@/composables/useSeo';
import DottedDivider from '@/components/DottedDivider.vue';
import { ArrowRight } from 'lucide-vue-next';

useSeo('Blog - Şeyma Betül Sökel Mimarlık', 'Mimari tasarım, sürdürülebilirlik ve kentsel gelişim üzerine en son makaleler ve düşünceler.');

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
}

const router = useRouter();

// Image loading state management
const imageLoaded = ref<Record<string, boolean>>({});
const imageErrors = ref<Record<string, boolean>>({});

// Initialize image loading states
const initializeImageStates = () => {
  posts.value.forEach(post => {
    imageLoaded.value[post.slug] = false;
    imageErrors.value[post.slug] = false;
  });
};

const handleImageLoad = (postSlug: string) => {
  imageLoaded.value[postSlug] = true;
};

const handleImageError = (postSlug: string) => {
  imageErrors.value[postSlug] = true;
  imageLoaded.value[postSlug] = true; // Show placeholder or fallback
};

const posts = ref<Post[]>([
  {
    slug: 'mimar-nedir-ne-is-yapar',
    title: 'Mimar Nedir, Ne İş Yapar?',
    date: '25 Temmuz 2025',
    summary: 'Mimarlık mesleğinin temel tanımlarını, bir mimarın sorumluluklarını ve tasarım sürecindeki rolünü keşfedin.',
    content: '<p>Mimar, en genel tanımıyla, mekanları tasarlayan ve bu tasarımların uygulanmasını denetleyen kişidir. Ancak bu tanım, mesleğin derinliğini ve kapsamını tam olarak yansıtmaz. Mimar, sadece binalar değil, aynı zamanda o binaların içindeki yaşamları, etkileşimleri ve deneyimleri de şekillendirir.</p><h3>Temel Sorumluluklar:</h3><ul><li><b>Tasarım ve Planlama:</b> Kullanıcı ihtiyaçlarını analiz ederek işlevsel, güvenli ve estetik mekanlar yaratmak.</li><li><b>Proje Yönetimi:</b> Bütçe, zaman ve kaynakları yöneterek projenin başından sonuna kadar koordinasyonunu sağlamak.</li><li><b>Teknik Bilgi:</b> Yapı malzemeleri, inşaat teknikleri ve yönetmelikler hakkında derinlemesine bilgi sahibi olmak.</li><li><b>İletişim:</b> Müşteriler, mühendisler, müteahhitler ve diğer paydaşlarla etkili bir iletişim kurmak.</li></ul><p>Mimarlık, sanat ve bilimin kesişim noktasında yer alan, hem yaratıcılık hem de teknik uzmanlık gerektiren çok yönlü bir disiplindir.</p>',
    image: '/images/4-up-secilenler/teknik_cizim/up-sistem-kesiti-model_page-0001.jpg'
  },
  {
    slug: 'mimarligin-kisa-tarihcesi',
    title: 'Mimarlığın Kısa Tarihçesi',
    date: '22 Temmuz 2025',
    summary: 'Antik Mısır\'ın piramitlerinden modernizmin gökdelenlerine, mimarlığın binlerce yıllık evrimine kısa bir yolculuk.',
    content: '<p>Mimarlığın tarihi, insanlık tarihi kadar eskidir. Barınma ihtiyacıyla başlayan bu serüven, zamanla medeniyetlerin kültürel, teknolojik ve sosyal kimliklerini yansıtan bir sanat formuna dönüştü.</p><h3>Dönüm Noktaları:</h3><ul><li><b>Antik Dönem:</b> Mısır piramitleri, Yunan tapınakları ve Roma su kemerleri gibi anıtsal yapılar, mühendislik ve estetiğin ilk büyük birleşimini temsil eder.</li><li><b>Gotik ve Rönesans:</b> Gotik katedrallerin yükselen yapıları ve Rönesans\'ın insan ölçeğine ve simetriye verdiği önem, mimari düşüncede devrim yarattı.</li><li><b>Modernizm:</b> 20. yüzyılda ortaya çıkan modernizm, süslemeyi reddederek işlevselliği ve sadeliği ön plana çıkardı. Le Corbusier, Mies van der Rohe gibi isimler bu akımın öncüleri oldu.</li><li><b>Çağdaş Mimari:</b> Günümüzde ise sürdürülebilirlik, dijital tasarım araçları ve küresel kültürlerin etkileşimi, mimarlığın geleceğini şekillendirmektedir.</li></ul><p>Her dönem, kendi malzeme, teknoloji ve felsefesiyle mimariye yeni bir katman eklemiştir.</p>',
    image: '/images/7-proje-1-secilenler/teknik_cizim/tarihi-yapi-plan-siyah-beyaz_page-0001.jpg'
  },
  {
    slug: 'surdurulebilir-mimari-ilkeleri',
    title: 'Sürdürülebilir Mimari İlkeleri',
    date: '20 Temmuz 2025',
    summary: 'Geleceğin şehirlerini şekillendirirken çevreye duyarlı ve enerji verimli binalar tasarlamanın önemi üzerine bir bakış.',
    content: '<p>Sürdürülebilir mimari, sadece bir trend değil, aynı zamanda gezegenimizin geleceği için bir zorunluluktur. Bu yaklaşım, binaların çevresel etkilerini en aza indirmeyi hedefler. Enerji verimliliği, su tasarrufu, atık yönetimi ve yenilenebilir kaynakların kullanımı gibi temel ilkeler üzerine kuruludur.</p><p>Tasarım sürecinde, yerel malzemelerin kullanımı ve pasif iklimlendirme stratejileri gibi faktörler, projenin ekolojik ayak izini önemli ölçüde azaltabilir. Yeşil çatılar, yağmur suyu toplama sistemleri ve akıllı bina otomasyonu gibi teknolojiler, sürdürülebilirliğin modern uygulamaları arasında yer almaktadır.</p>',
    image: '/images/1-bitirme-secilenler/render/2_render.jpg'
  },
  {
    slug: 'kentsel-tarimin-donusumu',
    title: 'Kentsel Tarımın Dönüşümü',
    date: '15 Temmuz 2025',
    summary: 'Agrotopia projemden yola çıkarak, kent içinde gıda üretiminin topluluklar ve mekanlar üzerindeki dönüştürücü gücünü inceliyorum.',
    content: '<p>Kentsel tarım, şehirlerde yaşayan insanların taze ve sağlıklı gıdaya erişimini kolaylaştıran yenilikçi bir çözümdür. Bitirme projem olan Agrotopia, bu konsepti bir adım öteye taşıyarak, kentsel tarımı sosyal ve ekonomik bir merkez haline getirmeyi amaçlamaktadır. Dikey çiftlikler, topluluk bahçeleri ve akuaponik sistemler, sınırlı alanlarda maksimum verim almayı mümkün kılar.</p><p>Bu tür projeler, sadece gıda güvenliğini artırmakla kalmaz, aynı zamanda yerel ekonomiyi canlandırır, komşuluk ilişkilerini güçlendirir ve insanları doğayla yeniden buluşturur.</p>',
    image: '/images/2-proje-5-secilen/render/ekran-goruntusu-2025-07-11-124606.png'
  },
  {
    slug: 'tarihi-yapilarda-modern-dokunuslar',
    title: 'Tarihi Yapılarda Modern Dokunuşlar',
    date: '10 Temmuz 2025',
    summary: 'Tarihi dokuyu korurken modern ihtiyaçlara cevap veren mekanlar yaratmanın zorlukları ve estetik çözümleri.',
    content: '<p>Tarihi yapıların restorasyonu ve yeniden işlevlendirilmesi, mimarlar için en hassas konulardan biridir. Amaç, yapının orijinal karakterini ve ruhunu korurken, günümüzün yaşam standartlarına ve teknolojik gereksinimlerine uyum sağlamaktır.</p><p>Bu süreçte, eski ve yeni arasında bir diyalog kurmak esastır. Cam, çelik gibi modern malzemelerin tarihi taş veya ahşap dokuyla bir araya getirilmesi, dikkatli bir denge gerektirir. Başarılı bir proje, geçmişe saygı duyan ve geleceğe ilham veren bir mekan ortaya koyar.</p>',
    image: '/images/3-proje-4-secilenler/render/ekran-goruntusu-2025-07-11-124052.png'
  }
]);

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`);
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
  // Allow arrow key navigation between post cards
  if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement?.classList.contains('post-card')) {
      event.preventDefault();
      const cards = Array.from(document.querySelectorAll('.post-card')) as HTMLElement[];
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
/* Enhanced Blog Archive Styles */
.blog-archive {
  position: relative;
}

/* Enhanced Post Card Styles */
.post-card {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.post-card:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-annotation), 0 8px 32px rgba(0, 0, 0, 0.1);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced Post Container */
.post-container {
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--color-canvas);
  overflow: hidden;
}

.post-card:hover .post-container {
  border-color: var(--color-annotation);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Enhanced Image Container */
.image-container {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  background: var(--color-canvas);
}

.image-container::before {
  content: '';
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 aspect ratio */
}

.post-image {
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

.post-card:hover .post-image {
  transform: translateZ(0);
}

/* Enhanced Content Area */
.post-content {
  position: relative;
  background: var(--color-canvas);
  padding: var(--spacing-lg);
}

.post-content h2 {
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: var(--spacing-md);
}

.post-content p {
  line-height: 1.6;
  color: var(--color-ink);
  opacity: 0.9;
}

/* Text clamping for consistent card heights */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced Responsive Grid */
.posts-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 640px) {
  .posts-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .post-card {
    border-radius: 6px;
  }

  .image-container {
    aspect-ratio: 5/3;
    /* Slightly different ratio on mobile */
  }

  .post-content {
    padding: var(--spacing-md);
  }

  .post-content h2 {
    font-size: 1rem;
    line-height: 1.2;
  }

  .post-content p {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .meta-data {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .posts-grid {
    gap: 1.5rem;
  }

  .post-card {
    border-radius: 4px;
  }

  .image-container {
    aspect-ratio: 4/3;
  }

  .post-content {
    padding: var(--spacing-sm);
  }

  .post-content h2 {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-xs);
  }

  .post-content p {
    font-size: 0.8rem;
    margin-bottom: var(--spacing-sm);
  }

  .meta-data {
    font-size: 0.7rem;
  }
}

/* Ultra-small screens */
@media (max-width: 360px) {
  .posts-grid {
    gap: 1rem;
  }

  .image-container {
    aspect-ratio: 3/2;
  }

  .post-content h2 {
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
  border-radius: 6px 6px 0 0;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .post-card {
    border: 2px solid var(--color-ink);
  }

  .post-container {
    border-width: 2px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .post-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .post-card:hover {
    transform: none;
    box-shadow: none;
  }

  .post-image {
    transition: none;
  }

  .image-placeholder {
    animation: none;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .post-card:hover {
    transform: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .post-card:active {
    transform: scale(0.99) translateZ(0);
    transition: transform 0.1s ease;
  }

  .post-image {
    /* Prevent any blur on touch devices */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  .post-card:hover .post-image {
    transform: translateZ(0);
  }
}

/* Print Styles */
@media print {
  .post-card {
    break-inside: avoid;
    margin-bottom: 2rem;
    box-shadow: none;
    border: 1px solid #000;
  }

  .post-image {
    filter: grayscale(100%);
  }
}

/* Enhanced accessibility for screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
