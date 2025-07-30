<template>
  <div class="blog-post min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl" id="main-content">
      <!-- Enhanced Navigation -->
      <nav class="mb-3xl max-w-5xl mx-auto slide-in-left">
        <router-link to="/blog"
          class="back-link inline-flex items-center gap-sm text-blueprint hover:text-annotation transition-all duration-300 px-sm py-xs rounded-md hover:bg-annotation/5 focus:outline-none focus:ring-2 focus:ring-annotation focus:ring-offset-2"
          :aria-label="'Blog anasayfasına geri dön'">
          <ChevronLeft class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span class="meta-data uppercase tracking-wider font-medium">Tüm Yazılar</span>
        </router-link>
      </nav>

      <div v-if="post" class="max-w-5xl mx-auto">
        <article class="blog-article">
          <header class="article-header mb-3xl text-center slide-up">
            <!-- Enhanced Hero Image -->
            <div v-if="post.image" class="hero-image-container mb-3xl">
              <div class="image-frame relative overflow-hidden border border-blueprint bg-canvas rounded-sm shadow-lg">
                <!-- Loading placeholder -->
                <div v-if="!imageLoaded" class="image-placeholder absolute inset-0"></div>

                <img :src="post.image" :alt="`Görsel: ${post.title} başlıklı blog yazısının ana görseli`"
                  class="hero-image w-full h-auto max-h-[600px] object-cover transition-all duration-400 lazy-image"
                  :class="{ 'loaded': imageLoaded }" loading="eager" decoding="async" @load="handleImageLoad"
                  @error="handleImageError" />

                <!-- Image caption overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent p-lg">
                  <div class="meta-data text-canvas opacity-90">{{ post.title }}</div>
                </div>
              </div>
            </div>

            <!-- Enhanced Title Section -->
            <div class="title-section text-center flex flex-col items-center">
              <div class="meta-data text-blueprint mb-md animate-delay-200">{{ post.date }}</div>
              <h1 class=" text-ink mb-lg animate-delay-300">{{ post.title }}</h1>
              <div class="summary-text align-center text-blueprint/80 max-w-2xl mx-auto mb-lg animate-delay-400">
                {{ post.summary }}
              </div>
            </div>
          </header>

          <DottedDivider class="animate-delay-500 pb-6" />

          <!-- Enhanced Content Area -->
          <div class="post-content-wrapper max-w-4xl mx-auto mt-3xl">
            <div class="reading-progress-bar fixed top-0 left-0 h-1 bg-annotation transition-all duration-300 z-50"
              :style="{ width: readingProgress + '%' }"></div>

            <div class="post-content prose prose-lg max-w-none text-ink leading-relaxed slide-up animate-delay-600"
              v-html="post.content"></div>

            <!-- Enhanced Author/Date Section -->
            <footer
              class="article-footer mt-3xl pt-3xl border-t border-blueprint/30 text-center slide-up animate-delay-800">
              <div class="author-info">
                <div class="meta-data text-blueprint mb-sm">YAZAR</div>
                <div class="h3 text-ink mb-md">ŞEYMA BETÜL SÖKEL</div>
                <div class="meta-data text-blueprint/70">{{ post.date }} tarihinde yayınlandı</div>
              </div>
            </footer>
          </div>
        </article>

        <!-- Enhanced Related/Navigation Section -->
        <section class="navigation-section mt-3xl pt-3xl border-t border-blueprint/20 slide-up animate-delay-1000">
          <div class="text-center mb-xl">
            <router-link to="/blog"
              class="cta-button inline-flex items-center gap-md px-xl py-lg border border-blueprint text-ink hover:border-annotation hover:text-annotation hover:bg-annotation/5 transition-all duration-300 rounded-md font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-annotation focus:ring-offset-2">
              <span>Diğer Yazılara Göz At</span>
              <ChevronLeft class="w-5 h-5 rotate-180" />
            </router-link>
          </div>
        </section>
      </div>

      <!-- Enhanced 404 State -->
      <div v-else class="error-state text-center py-3xl slide-up">
        <div class="error-icon mb-xl">
          <div class="w-24 h-24 mx-auto border-2 border-blueprint rounded-full flex items-center justify-center">
            <span class="text-4xl text-blueprint">?</span>
          </div>
        </div>
        <h2 class="h2 text-ink mb-lg">YAZDI BULUNAMADI</h2>
        <div class="meta-data text-blueprint mb-xl max-w-md mx-auto">
          Aradığınız yazı mevcut değil veya kaldırılmış olabilir.
        </div>
        <router-link to="/blog"
          class="error-cta inline-flex items-center gap-sm px-xl py-lg border border-ink text-ink hover:border-annotation hover:text-annotation hover:bg-annotation/5 transition-all duration-300 rounded-md font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-annotation focus:ring-offset-2">
          <ChevronLeft class="w-4 h-4" />
          <span>Bloga Geri Dön</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSeo } from '@/composables/useSeo';
import { useJsonLd } from '@/composables/useJsonLd';
import DottedDivider from '@/components/DottedDivider.vue';
import { ChevronLeft } from 'lucide-vue-next';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
}

const route = useRoute();
const post = ref<Post | null>(null);

// Image loading state
const imageLoaded = ref(false);
const imageError = ref(false);

// Reading progress tracking
const readingProgress = ref(0);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleImageError = () => {
  imageError.value = true;
  imageLoaded.value = true; // Show placeholder
};

// Reading progress calculation
const updateReadingProgress = () => {
  const article = document.querySelector('.post-content') as HTMLElement;
  if (!article) return;

  const articleTop = article.offsetTop;
  const articleHeight = article.offsetHeight;
  const windowTop = window.scrollY;
  const windowHeight = window.innerHeight;

  const progress = Math.min(
    Math.max(
      ((windowTop + windowHeight - articleTop) / articleHeight) * 100,
      0
    ),
    100
  );

  readingProgress.value = progress;
};

// Örnek blog yazıları (BlogView.vue ile aynı olmalı)
const posts: Post[] = [
  {
    slug: 'mimar-nedir-ne-is-yapar',
    title: 'Mimar Nedir, Ne İş Yapar?',
    date: '2025-07-25',
    summary: 'Mimarlık mesleğinin temel tanımlarını, bir mimarın sorumluluklarını ve tasarım sürecindeki rolünü keşfedin.',
    content: '<p>Mimar, en genel tanımıyla, mekanları tasarlayan ve bu tasarımların uygulanmasını denetleyen kişidir. Ancak bu tanım, mesleğin derinliğini ve kapsamını tam olarak yansıtmaz. Mimar, sadece binalar değil, aynı zamanda o binaların içindeki yaşamları, etkileşimleri ve deneyimleri de şekillendirir.</p><h3>Temel Sorumluluklar:</h3><ul><li><b>Tasarım ve Planlama:</b> Kullanıcı ihtiyaçlarını analiz ederek işlevsel, güvenli ve estetik mekanlar yaratmak.</li><li><b>Proje Yönetimi:</b> Bütçe, zaman ve kaynakları yöneterek projenin başından sonuna kadar koordinasyonunu sağlamak.</li><li><b>Teknik Bilgi:</b> Yapı malzemeleri, inşaat teknikleri ve yönetmelikler hakkında derinlemesine bilgi sahibi olmak.</li><li><b>İletişim:</b> Müşteriler, mühendisler, müteahhitler ve diğer paydaşlarla etkili bir iletişim kurmak.</li></ul><p>Mimarlık, sanat ve bilimin kesişim noktasında yer alan, hem yaratıcılık hem de teknik uzmanlık gerektiren çok yönlü bir disiplindir.</p>',
    image: '/images/4-up-secilenler/teknik_cizim/up-sistem-kesiti-model_page-0001.jpg'
  },
  {
    slug: 'mimarligin-kisa-tarihcesi',
    title: 'Mimarlığın Kısa Tarihçesi',
    date: '2025-07-22',
    summary: 'Antik Mısır\'ın piramitlerinden modernizmin gökdelenlerine, mimarlığın binlerce yıllık evrimine kısa bir yolculuk.',
    content: '<p>Mimarlığın tarihi, insanlık tarihi kadar eskidir. Barınma ihtiyacıyla başlayan bu serüven, zamanla medeniyetlerin kültürel, teknolojik ve sosyal kimliklerini yansıtan bir sanat formuna dönüştü.</p><h3>Dönüm Noktaları:</h3><ul><li><b>Antik Dönem:</b> Mısır piramitleri, Yunan tapınakları ve Roma su kemerleri gibi anıtsal yapılar, mühendislik ve estetiğin ilk büyük birleşimini temsil eder.</li><li><b>Gotik ve Rönesans:</b> Gotik katedrallerin yükselen yapıları ve Rönesans\'ın insan ölçeğine ve simetriye verdiği önem, mimari düşüncede devrim yarattı.</li><li><b>Modernizm:</b> 20. yüzyılda ortaya çıkan modernizm, süslemeyi reddederek işlevselliği ve sadeliği ön plana çıkardı. Le Corbusier, Mies van der Rohe gibi isimler bu akımın öncüleri oldu.</li><li><b>Çağdaş Mimari:</b> Günümüzde ise sürdürülebilirlik, dijital tasarım araçları ve küresel kültürlerin etkileşimi, mimarlığın geleceğini şekillendirmektedir.</li></ul><p>Her dönem, kendi malzeme, teknoloji ve felsefesiyle mimariye yeni bir katman eklemiştir.</p>',
    image: '/images/7-proje-1-secilenler/teknik_cizim/tarihi-yapi-plan-siyah-beyaz_page-0001.jpg'
  },
  {
    slug: 'surdurulebilir-mimari-ilkeleri',
    title: 'Sürdürülelebilir Mimari İlkeleri',
    date: '2025-07-20',
    summary: 'Geleceğin şehirlerini şekillendirirken çevreye duyarlı ve enerji verimli binalar tasarlamanın önemi üzerine bir bakış.',
    content: '<p>Sürdürülebilir mimari, sadece bir trend değil, aynı zamanda gezegenimizin geleceği için bir zorunluluktur. Bu yaklaşım, binaların çevresel etkilerini en aza indirmeyi hedefler. Enerji verimliliği, su tasarrufu, atık yönetimi ve yenilenebilir kaynakların kullanımı gibi temel ilkeler üzerine kuruludur.</p><p>Tasarım sürecinde, yerel malzemelerin kullanımı ve pasif iklimlendirme stratejileri gibi faktörler, projenin ekolojik ayak izini önemli ölçüde azaltabilir. Yeşil çatılar, yağmur suyu toplama sistemleri ve akıllı bina otomasyonu gibi teknolojiler, sürdürülebilirliğin modern uygulamaları arasında yer almaktadır.</p>',
    image: '/images/1-bitirme-secilenler/render/2_render.jpg'
  },
  {
    slug: 'kentsel-tarimin-donusumu',
    title: 'Kentsel Tarımın Dönüşümü',
    date: '2025-07-15',
    summary: 'Agrotopia projemden yola çıkarak, kent içinde gıda üretiminin topluluklar ve mekanlar üzerindeki dönüştürücü gücünü inceliyorum.',
    content: '<p>Kentsel tarım, şehirlerde yaşayan insanların taze ve sağlıklı gıdaya erişimini kolaylaştıran yenilikçi bir çözümdür. Bitirme projem olan Agrotopia, bu konsepti bir adım öteye taşıyarak, kentsel tarımı sosyal ve ekonomik bir merkez haline getirmeyi amaçlamaktadır. Dikey çiftlikler, topluluk bahçeleri ve akuaponik sistemler, sınırlı alanlarda maksimum verim almayı mümkün kılar.</p><p>Bu tür projeler, sadece gıda güvenliğini artırmakla kalmaz, aynı zamanda yerel ekonomiyi canlandırır, komşuluk ilişkilerini güçlendirir ve insanları doğayla yeniden buluşturur.</p>',
    image: '/images/2-proje-5-secilen/render/ekran-goruntusu-2025-07-11-124606.png'
  },
  {
    slug: 'tarihi-yapilarda-modern-dokunuslar',
    title: 'Tarihi Yapılarda Modern Dokunuşlar',
    date: '2025-07-10',
    summary: 'Tarihi dokuyu korurken modern ihtiyaçlara cevap veren mekanlar yaratmanın zorlukları ve estetik çözümleri.',
    content: '<p>Tarihi yapıların restorasyonu ve yeniden işlevlendirilmesi, mimarlar için en hassas konulardan biridir. Amaç, yapının orijinal karakterini ve ruhunu korurken, günümüzün yaşam standartlarına ve teknolojik gereksinimlerine uyum sağlamaktır.</p><p>Bu süreçte, eski ve yeni arasında bir diyalog kurmak esastır. Cam, çelik gibi modern malzemelerin tarihi taş veya ahşap dokuyla bir araya getirilmesi, dikkatli bir denge gerektirir. Başarılı bir proje, geçmişe saygı duyan ve geleceğe ilham veren bir mekan ortaya koyar.</p>',
    image: '/images/3-proje-4-secilenler/render/ekran-goruntusu-2025-07-11-124052.png'
  }
];

const loadPost = () => {
  const slug = route.params.slug as string;
  post.value = posts.find(p => p.slug === slug) || null;

  // Reset image loading state when post changes
  imageLoaded.value = false;
  imageError.value = false;
  readingProgress.value = 0;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', updateReadingProgress);
  window.addEventListener('resize', updateReadingProgress);

  // Initial progress calculation
  setTimeout(updateReadingProgress, 100);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress);
  window.removeEventListener('resize', updateReadingProgress);
});

watch(() => route.params.slug, () => {
  loadPost();
}, { immediate: true });

const blogPostSchema = computed(() => {
  if (!post.value) return null;

  const authorName = "ŞEYMA BETÜL SÖKEL"; // Hardcoded author name
  const authorUrl = "https://www.bestesokel.com/about"; // Example author URL
  const publisherName = "Şeyma Betül Sökel Mimarlık Portfolyosu"; // Your website name
  const publisherLogoUrl = "https://www.bestesokel.com/favicon.ico"; // Your website logo

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.bestesokel.com/blog/${post.value.slug}`
    },
    "headline": post.value.title,
    "image": post.value.image ? `https://www.bestesokel.com${post.value.image}` : undefined,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": authorUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogoUrl
      }
    },
    "datePublished": new Date(post.value.date).toISOString(),
    "dateModified": new Date(post.value.date).toISOString(), // Assuming no modification date, use published date
    "description": post.value.summary,
    "articleBody": post.value.content.replace(/<[^>]*>?/gm, ''), // Strip HTML tags for articleBody
  };
});

watch(post, (newPost) => {
  if (newPost) {
    useSeo(`${newPost.title} - Şeyma Betül Sökel Blog`, newPost.summary);
  }
}, { immediate: true });

useJsonLd(blogPostSchema);

</script>

<style scoped>
/* Enhanced Blog Post Styles */
.blog-post {
  position: relative;
}

/* Enhanced Navigation */
.back-link {
  position: relative;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-link:hover {
  transform: translateX(-2px);
  background-color: rgba(217, 119, 6, 0.05);
}

.back-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);
}

/* Enhanced Hero Image */
.hero-image-container {
  position: relative;
  margin-bottom: 3rem;
}

.image-frame {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: var(--color-canvas);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.image-frame:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.hero-image {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: cover;
  transition: opacity 0.3s ease;
  /* Ensure crisp image rendering */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.hero-image.loaded {
  opacity: 1;
}

/* Enhanced Title Section */
.title-section {
  position: relative;
  z-index: 1;
}

.summary-text {
  font-size: 1.125rem;
  line-height: 1.6;
  font-style: italic;
}

/* Reading Progress Bar */
.reading-progress-bar {
  height: 3px;
  background: linear-gradient(90deg, var(--color-annotation), var(--color-blueprint));
  transform-origin: left;
  transition: width 0.1s ease-out;
  box-shadow: 0 1px 3px rgba(217, 119, 6, 0.3);
}

/* Enhanced Prose Styles */
.prose {
  color: var(--color-ink);
  max-width: none;
  line-height: 1.8;
  font-size: 1.125rem;
}

.prose ::v-deep(p) {
  margin-bottom: 1.75rem;
  text-align: justify;
  hyphens: auto;
}

.prose ::v-deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-ink);
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
}

.prose ::v-deep(h3)::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 3rem;
  height: 2px;
  background: var(--color-annotation);
}

.prose ::v-deep(ul) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.prose ::v-deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.7;
  position: relative;
}

.prose ::v-deep(li)::marker {
  color: var(--color-annotation);
}

.prose ::v-deep(b),
.prose ::v-deep(strong) {
  color: var(--color-ink);
  font-weight: 600;
}

.prose ::v-deep(em) {
  color: var(--color-blueprint);
  font-style: italic;
}

/* Enhanced Author Section */
.article-footer {
  background: linear-gradient(to bottom, transparent, rgba(100, 116, 139, 0.02));
  border-radius: 8px;
  padding: 2rem;
  margin-top: 3rem;
}

.author-info {
  text-align: center;
}

/* Enhanced CTA Buttons */
.cta-button,
.error-cta {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  font-weight: 500;
}

.cta-button:hover,
.error-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.2);
}

.cta-button:focus,
.error-cta:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.3), 0 4px 20px rgba(217, 119, 6, 0.2);
}

/* Enhanced Error State */
.error-state {
  padding: 4rem 2rem;
}

.error-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

/* Loading States */
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
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

/* Enhanced Responsive Design */
@media (max-width: 1024px) {
  .prose {
    font-size: 1rem;
  }

  .summary-text {
    font-size: 1rem;
  }

  .hero-image {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .prose {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  .prose ::v-deep(p) {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .prose ::v-deep(h3) {
    font-size: 1.25rem;
    margin-top: 2rem;
  }

  .summary-text {
    font-size: 0.9rem;
  }

  .hero-image {
    max-height: 300px;
  }

  .article-footer {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .prose {
    font-size: 0.875rem;
  }

  .prose ::v-deep(h3) {
    font-size: 1.125rem;
  }

  .summary-text {
    font-size: 0.875rem;
  }

  .hero-image {
    max-height: 250px;
  }

  .cta-button,
  .error-cta {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
}

/* Animation Delays */
.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-300 {
  animation-delay: 0.3s;
}

.animate-delay-400 {
  animation-delay: 0.4s;
}

.animate-delay-500 {
  animation-delay: 0.5s;
}

.animate-delay-600 {
  animation-delay: 0.6s;
}

.animate-delay-800 {
  animation-delay: 0.8s;
}

.animate-delay-1000 {
  animation-delay: 1s;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .image-frame {
    border-width: 2px;
  }

  .reading-progress-bar {
    height: 4px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .back-link:hover {
    transform: none;
  }

  .cta-button:hover,
  .error-cta:hover {
    transform: none;
  }

  .error-icon {
    animation: none;
  }

  .image-placeholder {
    animation: none;
  }

  .reading-progress-bar {
    transition: none;
  }
}

/* Print Styles */
@media print {

  .reading-progress-bar,
  .back-link,
  .cta-button,
  .error-cta {
    display: none;
  }

  .prose {
    font-size: 12pt;
    line-height: 1.5;
  }

  .hero-image {
    max-height: 300px;
    filter: grayscale(100%);
  }
}
</style>
