<template>
  <NavBar />
  <Post v-for="post in post_list" :post="post" />
  <div v-for="comment in comment_list">
    <Comment :comment="comment"/>
  </div>
  <!-- 这里应该有个评论框 -->
  <input type="text" placeholder="comment" v-model="formData.content">
  <input type="submit" value="send" @click="sendComment">
  </template>

<script setup>
// 这里和 Feed 获取的逻辑一致，从列表里获取
let post_list = reactive([])
let comment_list = reactive([])

// 跳转链接时传递参数的方式是 / 而不是 ?=，需要使用 params 来获取参数
// 如果是 ?= 的形式，就是 query 获取参数
const post_id = useRoute().params.id


// 发送 get 请求，和 Profile 的处理逻辑一致
http.get(`/feed/detail/${post_id}`).then(rep => {
  // console.log(rep)
  post_list.splice(0, 0, ...rep.data)
  console.log(111111111,rep)
    // reactively update data
})

//comment的get请求
http.get(`/feed/comment/${post_id}`).then(rep => {
  comment_list.splice(0, 0, ...rep.data)  // 这里相当于是在末尾插入rep.data，
  console.log(rep.data)
})



//formData 就是我需要给后端发送的东西，里面包含了我给后端具体发送的东西，视情况增加
// 向后端发送评论
const formData = reactive({
  content: '',
  // user_id: storeToRefs(useUserStore()).user_id.value,
})

const router = useRouter()
const sendComment = () => {

  if (!formData.content) {
    alert('have no content!') 
    return
  }

  http.post(`feed/${post_id}/comment`, formData).then(rep => {
    if (rep.data) {
      formData.content = ''
      router.go(0)
    }
  })
}

</script>

<style scoped></style>