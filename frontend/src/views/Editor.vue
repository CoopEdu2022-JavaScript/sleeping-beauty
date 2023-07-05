<template>
  <NavBar></NavBar>
  <div class="input-container">
    <input type="text" placeholder="填写标题更容易被发现哦" v-model="formData.title">
    <hr>
    <input type="text" placeholder="输入内容" v-model="formData.content">
    <input type="text" placeholder="#tag" v-model="formData.tag">
    <hr>
  </div>
  <div class="post-container">
      <input type="submit" value="post" @click="post" class="post">
  </div>
</template>

<script setup>
import http from '../api/http'
import{useRouter} from 'vue-router'
const router = useRouter()
const formData = reactive({
  title: '',
  content: '',

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

<style scoped>
.input-container{
  display: flex;
  flex-direction: column;
  margin-left: 33px;
}
input{
  border: none;
  word-wrap: break-word;
}
hr{
  width: 336px;
height: 0px;
left: 33.5px;
top: 228.5px;
}
.post-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

</style>