<template>
  <button @click="back">back</button>
  <span>{{ title }}</span>
  <router-link to="/notification"><img src="" alt="notification"></router-link>
</template>

<script setup >
const router = useRouter()
const title = useRoute().name
const back = () => router.go(-1)
</script>

<style scoped>

</style>