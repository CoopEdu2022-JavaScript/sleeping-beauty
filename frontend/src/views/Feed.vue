<template>
  <div>
    <NavBar />
    <div class="tagsContainer">
      <div v-for="i in 5" :key="i" class="tags" >
        <Tag />
      </div>
    </div>
    <div v-for="i in 5" :key="i" @click="goDetail(post_id)">
      <Post />
    </div>
    <!-- <div v-for="post in post_list" @click="goDetail(post.id)">
      <Post :post="post"/>
    </div> -->
    <TabBar />
  </div>
</template>

<script setup>
let post_list = reactive([])
const post_id = 1; //假数据
const router = useRouter()
const goDetail = (post_id) => {  //post_id以后都应该是post.id, 
  router.push({
  path: `/feed/detail/${post_id}`
})
}

http.get('/feed').then(rep => {
  post_list.splice(0, 0, ...rep.data)  // reactively update data
})
</script>

<style scoped>
.tagsContainer {
    display: flex;
    overflow: scroll;
    flex-wrap: nowrap; 
    justify-content: space-between;
  }
  
  .tags {

    flex-shrink: 0;
    width: 100%; /* 调整tag之间的间距 */
  }
</style>