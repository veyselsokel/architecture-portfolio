<template>
  <!-- The Annex: A single, focused column -->
  <div class="annex min-h-screen bg-canvas pt-20 font-architect">
    <div class="container mx-auto px-md py-3xl">
      
      <!-- Section Header -->
      <header class="text-center mb-3xl">
        <h1 class="h1 text-ink mb-lg">INITIATE CONTACT</h1>
        <div class="meta-data text-blueprint">
          FOR INQUIRIES, COLLABORATION, AND PROFESSIONAL DISCOURSE
        </div>
      </header>

      <DottedDivider />

      <!-- Main Content: Single Column Focus -->
      <div class="max-w-2xl mx-auto">
        
        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="contact-form mb-3xl">
          
          <!-- Name Field -->
          <div class="form-field mb-xl">
            <label for="name" class="field-label meta-data text-blueprint mb-sm block">
              FULL NAME
            </label>
            <div class="field-container relative">
              <input
                type="text"
                id="name"
                v-model="form.name"
                :class="[
                  'field-input w-full bg-transparent border-0 border-b border-blueprint pb-sm text-ink text-body focus:outline-none transition-colors duration-250',
                  form.name ? 'border-annotation' : 'focus:border-annotation'
                ]"
                required
                @focus="focusField('name')"
                @blur="blurField('name')"
              />
              <div 
                class="field-underline absolute bottom-0 left-0 h-px bg-annotation transition-all duration-250"
                :class="[activeField === 'name' ? 'w-full' : 'w-0']"
              ></div>
            </div>
          </div>

          <!-- Email Field -->
          <div class="form-field mb-xl">
            <label for="email" class="field-label meta-data text-blueprint mb-sm block">
              EMAIL ADDRESS
            </label>
            <div class="field-container relative">
              <input
                type="email"
                id="email"
                v-model="form.email"
                :class="[
                  'field-input w-full bg-transparent border-0 border-b border-blueprint pb-sm text-ink text-body focus:outline-none transition-colors duration-250',
                  form.email ? 'border-annotation' : 'focus:border-annotation'
                ]"
                required
                @focus="focusField('email')"
                @blur="blurField('email')"
              />
              <div 
                class="field-underline absolute bottom-0 left-0 h-px bg-annotation transition-all duration-250"
                :class="[activeField === 'email' ? 'w-full' : 'w-0']"
              ></div>
            </div>
          </div>

          <!-- Project Type Field -->
          <div class="form-field mb-xl">
            <label for="projectType" class="field-label meta-data text-blueprint mb-sm block">
              PROJECT TYPE
            </label>
            <div class="field-container relative">
              <select
                id="projectType"
                v-model="form.projectType"
                :class="[
                  'field-input w-full bg-transparent border-0 border-b border-blueprint pb-sm text-ink text-body focus:outline-none transition-colors duration-250',
                  form.projectType ? 'border-annotation' : 'focus:border-annotation'
                ]"
                @focus="focusField('projectType')"
                @blur="blurField('projectType')"
              >
                <option value="" disabled>SELECT PROJECT TYPE</option>
                <option value="residential">RESIDENTIAL</option>
                <option value="commercial">COMMERCIAL</option>
                <option value="cultural">CULTURAL</option>
                <option value="educational">EDUCATIONAL</option>
                <option value="public">PUBLIC</option>
                <option value="consultation">CONSULTATION</option>
                <option value="other">OTHER</option>
              </select>
              <div 
                class="field-underline absolute bottom-0 left-0 h-px bg-annotation transition-all duration-250"
                :class="[activeField === 'projectType' ? 'w-full' : 'w-0']"
              ></div>
            </div>
          </div>

          <!-- Message Field -->
          <div class="form-field mb-2xl">
            <label for="message" class="field-label meta-data text-blueprint mb-sm block">
              PROJECT DETAILS / MESSAGE
            </label>
            <div class="field-container relative">
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                :class="[
                  'field-input w-full bg-transparent border-0 border-b border-blueprint pb-sm text-ink text-body focus:outline-none resize-none transition-colors duration-250',
                  form.message ? 'border-annotation' : 'focus:border-annotation'
                ]"
                placeholder="DESCRIBE YOUR PROJECT, TIMELINE, AND SPECIFIC REQUIREMENTS..."
                required
                @focus="focusField('message')"
                @blur="blurField('message')"
              ></textarea>
              <div 
                class="field-underline absolute bottom-0 left-0 h-px bg-annotation transition-all duration-250"
                :class="[activeField === 'message' ? 'w-full' : 'w-0']"
              ></div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button inline-flex items-center gap-sm px-2xl py-lg border border-ink text-ink hover:bg-ink hover:text-canvas transition-all duration-250 ease-architect disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="h3">
                {{ isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE' }}
              </span>
              <svg 
                v-if="!isSubmitting"
                class="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <div 
                v-else
                class="w-5 h-5 border border-current border-t-transparent rounded-full animate-spin"
              ></div>
            </button>
          </div>
        </form>

        <!-- Contact Information -->
        <div class="contact-info text-center">
          <div class="meta-data text-blueprint mb-lg">
            DIRECT COMMUNICATION CHANNELS
          </div>
          
          <div class="contact-details space-y-md mb-xl">
            <div class="contact-item">
              <span class="meta-data text-blueprint">EMAIL: </span>
              <a href="mailto:studio@architect.com" class="text-ink hover:text-annotation transition-colors duration-250">
                STUDIO@ARCHITECT.COM
              </a>
            </div>
            <div class="contact-item">
              <span class="meta-data text-blueprint">TELEPHONE: </span>
              <a href="tel:+1234567890" class="text-ink hover:text-annotation transition-colors duration-250">
                +1 (234) 567-8900
              </a>
            </div>
            <div class="contact-item">
              <span class="meta-data text-blueprint">LOCATION: </span>
              <span class="text-ink">NEW YORK, NY</span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="social-links border-t border-blueprint/30 pt-xl">
            <div class="meta-data text-blueprint mb-lg">
              PROFESSIONAL NETWORKS
            </div>
            <div class="flex justify-center space-x-xl">
              <a 
                href="#" 
                class="social-link text-ink hover:text-annotation transition-colors duration-250 border-b border-transparent hover:border-annotation"
              >
                <span class="meta-data">BEHANCE</span>
              </a>
              <a 
                href="#" 
                class="social-link text-ink hover:text-annotation transition-colors duration-250 border-b border-transparent hover:border-annotation"
              >
                <span class="meta-data">INSTAGRAM</span>
              </a>
              <a 
                href="#" 
                class="social-link text-ink hover:text-annotation transition-colors duration-250 border-b border-transparent hover:border-annotation"
              >
                <span class="meta-data">LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <footer class="text-center mt-3xl pt-2xl border-t border-blueprint/30">
        <div class="meta-data text-blueprint">
          RESPONSE TIME: 24-48 HOURS / ALL INQUIRIES WILL RECEIVE A FORMAL RESPONSE
        </div>
      </footer>
    </div>

    <!-- Success Message Overlay -->
    <transition name="success-overlay">
      <div 
        v-if="showSuccess" 
        class="fixed inset-0 bg-ink/90 backdrop-blur-sm z-50 flex items-center justify-center p-lg"
      >
        <div class="max-w-md w-full text-center">
          <div class="bg-canvas border border-annotation p-2xl">
            <div class="w-16 h-16 bg-annotation rounded-full mx-auto mb-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="h3 text-ink mb-md">MESSAGE TRANSMITTED</h3>
            <p class="body-text text-ink mb-lg">
              Your inquiry has been received and will be reviewed within 24-48 hours.
            </p>
            <button 
              @click="closeSuccess"
              class="px-lg py-md border border-ink text-ink hover:bg-ink hover:text-canvas transition-all duration-250"
            >
              <span class="meta-data">ACKNOWLEDGED</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DottedDivider from '@/components/DottedDivider.vue';

const form = ref({
  name: '',
  email: '',
  projectType: '',
  message: '',
});

const activeField = ref<string | null>(null);
const isSubmitting = ref(false);
const showSuccess = ref(false);

const focusField = (fieldName: string) => {
  activeField.value = fieldName;
};

const blurField = (fieldName: string) => {
  if (activeField.value === fieldName) {
    activeField.value = null;
  }
};

const submitForm = async () => {
  isSubmitting.value = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Form submitted:', form.value);
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    projectType: '',
    message: '',
  };
  
  isSubmitting.value = false;
  showSuccess.value = true;
};

const closeSuccess = () => {
  showSuccess.value = false;
};
</script>

<style scoped>
.annex {
  position: relative;
}

/* Form Field Styling */
.form-field {
  position: relative;
}

.field-input {
  background: none;
  font-family: inherit;
}

.field-input::placeholder {
  color: var(--color-blueprint);
  opacity: 0.7;
}

.field-input:focus {
  outline: none;
}

/* Select Styling */
select.field-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%236B7A8F' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 0.65rem auto;
  padding-right: 2rem;
}

select.field-input:focus {
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23C85A3A' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
}

/* Submit Button */
.submit-button {
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(200, 90, 58, 0.1), transparent);
  transition: left 0.5s ease;
}

.submit-button:hover::before {
  left: 100%;
}

/* Contact Information */
.contact-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

/* Success Overlay Transitions */
.success-overlay-enter-active,
.success-overlay-leave-active {
  transition: all 0.4s ease;
}

.success-overlay-enter-from,
.success-overlay-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .contact-item {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  .social-links .flex {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .form-field {
    margin-bottom: var(--spacing-lg);
  }
  
  .submit-button {
    width: 100%;
    justify-content: center;
  }
}

/* Focus States for Accessibility */
.field-input:focus {
  outline: none;
  box-shadow: 0 2px 0 var(--color-annotation);
}

.submit-button:focus {
  outline: 2px solid var(--color-annotation);
  outline-offset: 2px;
}

.social-link:focus {
  outline: 2px solid var(--color-annotation);
  outline-offset: 2px;
}
</style>