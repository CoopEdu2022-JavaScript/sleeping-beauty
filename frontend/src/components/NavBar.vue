<template>
  <button @click="back">back</button>
  <span>{{ title }}</span>
  <router-link to="/notification"><img src="" alt="notification"></router-link>
  <div class="swiper-container tagCarousel">
  <div class="swiper-wrapper">
    <div v-for="i in 5" :key="i" class="swiper-slide">
      <Tag class="tag" />
    </div>
  </div>
</div>

<!-- 引入 Swiper 库 -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
  
</template>

<script setup src="https://unpkg.com/swiper/swiper-bundle.min.js">
const router = useRouter()
const title = useRoute().name
const back = () => router.go(-1)
</script>

<style scoped>
  .tagContainer{
    /* display: flex;
    overflow-x: scroll;
    width: 100%;
    scroll-behavior: smooth; */
    display: flex; 
    flex-wrap: nowrap; 
    overflow-x: scroll;
  }
  .tags {
    flex: 1 0 100%;
    margin-right: 20px;
  }
  .tag {
    width: 100%;
  }
</style>