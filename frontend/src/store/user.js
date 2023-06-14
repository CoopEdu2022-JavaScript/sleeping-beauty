import { defineStore } from "pinia"

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null)
    const user_id = ref(null)
    return { token, user_id }
  },
  {
    persist: true
  }
)