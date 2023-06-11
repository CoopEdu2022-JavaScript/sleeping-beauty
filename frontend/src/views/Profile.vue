<template>
  <NavBar />
  <div>info: {{ info }}</div>
  <button @click="logout">logout</button>
  
  <div v-for="post in post_list">
    <Post :post="post" />
  </div>

  <TabBar />
</template>

<script setup>
import axios from 'axios';
let { user_id, token } = storeToRefs(useUserStore())

const info = ref('')

const logout = () => {
  user_id.value = undefined
  token.value = undefined
  router.push('/login')
}

const post_list = reactive([
  {
  name: "11111",
  grade:"10",
  time: "9:46",
  content: "hahaha",
  portrait: "./portrait/IMG_9608_1.png",
  likes: 0,
  id: 0,
  },
]); // 用于存储post列表的数组
// console.log(post_list.value)
http.get(`/profile/${user_id.value}`)
  .then(response => {
    post_list.splice(0, post_list.length, ...rep.data); // 假设返回的数据是一个包含post列表的数组
  })
  .catch(error => {
    console.error(error);
  });

http.get(`/profile/${user_id.value}`)
  .then(rep => {
    info.value = rep.data
  })
  .catch(error => {
    console.error(error);
  });
// console.log(post_list.value)
</script>

<style scoped></style>