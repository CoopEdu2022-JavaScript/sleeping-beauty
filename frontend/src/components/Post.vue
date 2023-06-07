<template>
  <hr />
  <div @click="goDetail">
    <!-- 头像的图片怎么从数据库调取？ -->
    <div class="head">
      <!-- <img v-bind:src= "post.portrait" alt=""> -->
      <!-- <img src="https://img2.baidu.com/it/u=3618236253,1028428296&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="" class="portrait"> -->
      <img :src= "post.portrait" alt="" class="portrait">

      <div>
        <span>name: {{ post.name }}</span>
        <span>grade: {{ post.grade }}</span>
      </div>
    </div>
    <div class="main">
      <p>content: {{ post.content }}</p>
      <div class="image">
        imgs:<img src="https://www.automobilismo.it/files/articoli/3/5/7/35783/B_nissan-skyline-gtr34-1.jpg" alt=" ">
      </div>
    </div>
    <div>
      <span >time: {{ post.time }}</span>
    </div>
    <span >comments: {{ post.comments }}</span>
  </div>
  <span>&nbsp;</span>
  <button id="like-button" onclick="likePost()">Like</button>
  <span id="like-count">likes: {{ post.likes }}</span>
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
  content: "hahaha",
  portrait: "IMG_9608_1.png",
})

</script>

<style scoped>
.portrait {
  width: 45px;
  height: auto;
}
.head {
  display: flex;
  align-items: center;
}
.head div{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.main {
  text-align: center;
}

.main p {
  display: inline-block;
}

.image {
    display: flex; /* to center the image vertically and horizontally */
    justify-content: center;
    align-items: center;
    height: 235px; /* set a height to the div element */
  }
  .image img {
    max-width: 100%; /* set the maximum width of the image to prevent it from stretching */
    max-height: 100%; /* set the maximum height of the image to prevent it from stretching */
  }
</style>