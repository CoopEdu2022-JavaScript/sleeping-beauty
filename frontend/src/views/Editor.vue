<template>
  <input type="text" placeholder="title" v-model="formData.title">
  <input type="text" placeholder="content" v-model="formData.content">
  <input type="text" placeholder="tag" v-model="formData.tag">
  <input type="submit" value="post" @click="post">
</template>

<script setup>
const formData = reactive({
  title: '',
  content: '',
  tag: '',
})

const router = useRouter()
const post = () => {
  http.post('/feed/post', formData).then(rep => {
    console.log(formData)
    if (rep.data) {
      router.push('/feed')
    }
  })
}
</script>

<style scoped></style>