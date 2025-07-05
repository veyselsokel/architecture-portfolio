import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isSketchMode: false,
    isNotebookMode: false,
  }),
  actions: {
    toggleSketchMode() {
      this.isSketchMode = !this.isSketchMode;
    },
    toggleNotebookMode() {
      this.isNotebookMode = !this.isNotebookMode;
    },
  },
});