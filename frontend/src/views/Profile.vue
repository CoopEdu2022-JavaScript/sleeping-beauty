<template>
  <NavBar />
  <div>{{ nickname }}</div>
  <button @click="nickname = 11111"></button>
  <button @click="logout">logout</button>
  <TabBar />
</template>

<script setup>
const router = useRouter()
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
const logout = () => {
  token.value = false
  router.push('/login')
}
let nickname = ref('name')

// const info = ref('')
// http.get('/profile?uid=' + uid.value).then(rep => {
//   info.value = rep.data
// })
</script>

<style scoped></style>