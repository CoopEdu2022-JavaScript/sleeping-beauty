<template>
  <NavBar />
  <div class="area">
    <div class="tagsContainer">
      <div class="tags" >
        <Tag />
      </div>
    </div>
    <div v-for="post in post_list" @click="goDetail(post.id)">
      <Post :post="post"/>
    </div>
  </div>
  <TabBar/>
</template>

<script setup>

  let post_list = reactive([])

  
  const router = useRouter()
  const goDetail = (post_id) => {  //
    router.push({
    path: `/feed/detail/${post_id}`
  })
  }

  http.get('/feed').then(rep => { 
    console.log(rep)
    post_list.splice(0, post_list.length, ...rep.data)  // reactively update data
    console.log(post_list)
  })
</script>

<style scoped>
  .tagsContainer {
    display: flex;
    overflow-x: scroll;
    flex-wrap: nowrap; 
    justify-content: space-between;
  }

  ::-webkit-scrollbar{
    display: none;
  }
  
  .tags {
    flex-shrink: 0;
    width: 95%; /* 调整tag之间的间距 */
    margin: 0 10px;
  }

  .area {
  max-height: 730px;
  overflow: scroll;
  }

  hr {
    height: 5.88px;
    background-color: #eeedee ;
  }
</style> 