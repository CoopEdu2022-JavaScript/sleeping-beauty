<template>
  <NavBar />
  <div class="area">
    <div class="tagsContainer">
      <div v-for="i in 5" :key="i" class="tags" >
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
  let post_list = reactive([
  {
    name: "11111",
    grade:"10",
    time: "9:46",
    content: "hahaha",
    portrait: "./portrait/IMG_9608_1.png",
    likes: 3,
    id: 1,
  },
  {
    name: "222222",
    grade:"10",
    time: "2:22",
    content: "开心",
    portrait: "./portrait/1.jpg",
    likes: 999,
    id: 2,
  },
  {
    name: "333333333",
    grade:"10",
    time: "3:33",
    content: "弄死我皇后欸发",
    portrait: "./portrait/2.jpg",
    likes: 2,
    id: 3,
  },
  {
    name: "44444444",
    grade:"10",
    time: "4:44",
    content: "拉克斯基的回复了呢据传闻",
    portrait: "./portrait/2.jpg",
    likes: 14,
    id: 4,
  },
  ])


  const router = useRouter()
  const goDetail = (post_id) => {  //
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
    overflow-x: scroll;
    flex-wrap: nowrap; 
    justify-content: space-between;
  }
  
  .tags {
    flex-shrink: 0;
    width: 100%; /* 调整tag之间的间距 */
  }

  .area {
  max-height: 730px;
  overflow: scroll;
  }
</style>