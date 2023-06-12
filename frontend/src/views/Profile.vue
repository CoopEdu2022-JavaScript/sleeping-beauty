<template>
  <NavBar />
  <div>info: {{ info }}</div>
  <button @click="logout">logout</button>
  
  <div v-for="post in post_list" @click="goDetail(post.id)">
    <Post :post="post"/>
  </div>

  <TabBar />
</template>

<script setup>
import { reactive } from 'vue';
import http from '../api/http';
let { user_id, token } = storeToRefs(useUserStore())

const info = ref('')

const logout = () => {
  user_id.value = undefined
  token.value = undefined
  router.push('/login')
}
const post_list = reactive([])

const router = useRouter()
  const goDetail = (post_id) => {
    router.push({
    path: `/feed/detail/${post_id}`
  })
}


user_id.value = 123123  //假数据
http.get(`/profile/${user_id.value}`)
  .then(rep => {
    console.log(11111111)
    console.log(rep.data)
    post_list.splice(0, 0, ...rep.data[0]); // 假设返回的数据是一个包含post列表的数组
    info.value = rep.data[1]
    console.log(22222222)
  })
  .catch(error => {
    console.error(error);
  });
</script>

<style scoped></style>