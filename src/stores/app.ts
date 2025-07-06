import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      // Apply theme to document element for CSS custom properties
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    initializeTheme() {
      // Check for saved theme or default to light
      const savedTheme = localStorage.getItem('architectural-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark-mode');
      } else {
        this.isDarkMode = false;
        document.documentElement.classList.add('light-mode');
      }
    },
    saveTheme() {
      localStorage.setItem('architectural-theme', this.isDarkMode ? 'dark' : 'light');
    },
  },
});