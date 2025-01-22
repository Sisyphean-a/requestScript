import { ref, computed } from "vue";

const isUTools = computed(() => typeof window.utools !== "undefined");

export function useUTools() {
  return {
    isUTools,
  };
}
