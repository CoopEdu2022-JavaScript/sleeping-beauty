<template>
  <NavBar />
  <Post v-for="post in post_list" :post="post" />
  <!-- 这里评论还是写死的，仅供展示 -->
  <div v-for="i in 10" :key="i">
    <Comment />
  </div>
  <!-- 这里应该有个评论框 -->
  <input type="text" placeholder="comment"><input type="submit" value="send" @click="send">
</template>

<script setup>
// 这里和 Feed 获取的逻辑一致，从列表里获取
let post_list = reactive([])

// 跳转链接时传递参数的方式是 / 而不是 ?=，需要使用 params 来获取参数
// 如果是 ?= 的形式，就是 query 获取参数
const post_id = useRoute().params.id

// 发送 get 请求，和 Profile 的处理逻辑一致
http.get(`/feed/detail/${post_id}`).then(rep => {
  post_list.splice(0, 0, ...rep.data)  // reactively update data
})
</script>

<style scoped></style>