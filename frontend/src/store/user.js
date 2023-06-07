import { defineStore } from "pinia"

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(false)
    const user_id = ref()
    return { token, user_id }
  },
  {
    persist: true
  }
)