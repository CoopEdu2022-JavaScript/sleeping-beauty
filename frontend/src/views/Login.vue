<template>
  <input type="text" v-model="formData.uid">
  <input type="password" v-model="formData.pwd">
  <input type="submit" value="login" @click="login">
</template>

<script setup>
import http from '../api/http'
const router = useRouter()
const formData = reactive({
  uid: '',
  pwd: ''
})

const userStore = useUserStore()
let { token } = storeToRefs(userStore)

const login = () => {
  http.post('/login', formData)
    .then(rep => {
      token.value = rep.data
      // console.log(formData)
      if (token.value) router.push('/feed')
  })
}
</script>

<style scoped></style>