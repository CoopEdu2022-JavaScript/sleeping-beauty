<template>
  <input type="text" placeholder="title" v-model="formData.title">
  <input type="text" placeholder="content" v-model="formData.content">
  <input type="text" placeholder="tag" v-model="formData.tag">
  <input type="submit" value="post" @click="post">
</template>

<script setup>
import http from '../api/http'
import{useRouter} from 'vue-router'
const router = useRouter()
const formData = reactive({
  title: '',
  content: '',
  tag: '',
})


const post = () => {
console.log(formData)
  http.post('/editor', formData).then(rep => {
    // console.log(rep)
    if (rep.data) {
      router.push('/feed')
    }
  })
}
</script>

<style scoped></style>