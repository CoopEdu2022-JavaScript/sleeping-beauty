import { defineStore } from "pinia"

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(false)
    return { token }
  },
  {
    persist: true
  }
)