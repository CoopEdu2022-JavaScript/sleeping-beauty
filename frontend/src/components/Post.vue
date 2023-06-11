<template>
  <hr />
  <div>
    <div class="head">
     <img :src= "post.portrait" alt="" class="portrait">
      <div>
        <span>name: {{ post.name }}</span>
        <span>grade: {{ post.grade }}</span>
      </div>
    </div>
    <div class="main">
      <p>content: {{ post.content }}</p>
      <div class="image">
        <img src="https://www.automobilismo.it/files/articoli/3/5/7/35783/B_nissan-skyline-gtr34-1.jpg" alt=" ">
      </div>
    </div>
    <div>
      <span >time: {{ post.time }}</span>
    </div>
    <span >comments: {{ post.comments }}</span>
  </div>
  <span>&nbsp;</span>
  <button @click.stop="like" :state="post.liked?'press':'release'">likes</button>: {{ post.likes }}
</template>

<script setup>
import { reactive } from 'vue';

defineProps({
  post: Object,
})

// const post = reactive({
//   name: "11111",
//   grade:"10",
//   time: "9:46",
//   content: "hahaha",
//   portrait: "IMG_9608_1.png",
//   likes: 0,
//   id: 0,
// })

const like = () => {
  post.liked = !post.liked  //从后端传过来的，1表示点赞了0表示没有点赞
  post.likes += (post.liked ? 1 : -1)  // 响应式数据变化，实时显示在页面
  if (post.liked) http.post(`feed/${post.id}/like`)
  else http.post(`feed/${post.id}/unlike`)
}

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
    width: 300px;
    height: 235px; /* set a height to the div element */
  }
.image img {
    max-width: 100%; /* set the maximum width of the image to prevent it from stretching */
    max-height: 100%; /* set the maximum height of the image to prevent it from stretching */
    object-fit: cover;
  }

[state='press'] {
  background-color: red;
}
</style>