<template>
  <NavBar />
  <div v-for="i in 5" :key="i">
    <Post />
  </div>
  <!-- <div v-for="post in post_list" @click="goDetail(post.id)">
    <Post :post="post"/>
  </div> -->
  <TabBar />
</template>

<script setup>
let post_list = reactive([])

const router = useRouter()
const goDetail = (post_id) => router.push({
  path: `/feed/detail/${post_id}`
})

http.get('/feed').then(rep => {
  post_list.splice(0, 0, ...rep.data)  // reactively update data
})
</script>

<style scoped>

</style>