import { onMounted, onUnmounted, watch } from 'vue';

export function useJsonLd(schema: any) {
  let scriptElement: HTMLScriptElement | null = null;

  const injectSchema = (data: any) => {
    if (scriptElement) {
      document.head.removeChild(scriptElement);
      scriptElement = null;
    }

    if (data) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.textContent = JSON.stringify(data);
      document.head.appendChild(scriptElement);
    }
  };

  onMounted(() => {
    watch(schema, (newSchema) => {
      injectSchema(newSchema);
    }, { immediate: true, deep: true });
  });

  onUnmounted(() => {
    if (scriptElement) {
      document.head.removeChild(scriptElement);
    }
  });
}
