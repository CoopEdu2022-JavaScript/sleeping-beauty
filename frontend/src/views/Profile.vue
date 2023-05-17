<template>
  <NavBar />
  <div>{{ nickname }}</div>
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
let nickname = 'name'
</script>

<style scoped></style>