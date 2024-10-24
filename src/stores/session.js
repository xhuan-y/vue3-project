import { reactive } from "vue";
import { defineStore } from "pinia";

export const useSessionStore = defineStore(
  "sessionStore",
  () => {
    const session = reactive([]);

    function onAdd(title) {
      session.push({
        id: Date.now(),
        title,
      });
    }

    return { session, onAdd };
  },
  {
    persist: true,
  }
);
