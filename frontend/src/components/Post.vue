<template>
  <hr />
  <div @click="goDetail">
    <!-- 头像的图片怎么从数据库调取？ -->
    <img src="" alt=" ">
    <span>name: {{ post.name }}</span>
    <div>
      <span>grade: {{ post.grade }}</span>
    </div>
    <div class="image">imgs: 
      <img src="" alt=" ">
      <img src="" alt=" ">
      <img src="" alt=" ">
      <img src="" alt=" ">
    </div>
    <p>content: {{ post.content }}</p>
    <div>
      <span >time: {{ post.time }}</span>
    </div>
    <span >comments: {{ post.comments }}</span>
    <span>&nbsp;</span>
    <span >likes: {{ post.likes }}</span>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

defineProps({
  post: Object,
})

const post = reactive({
  name: "11111",
  grade:"10",
  time: "9:46",
  content: "hahaha"
})
const router = useRouter()
const goDetail = () => {
  router.push('/feed/detail')
}

</script>

<style scoped>
</style>