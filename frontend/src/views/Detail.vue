<template>
  <NavBar />
  <Post v-for="post in post_list" :post="post" />
  <div v-for="comment in comment_list">
    <Comment :comment="comment"/>
  </div>
  <!-- 这里应该有个评论框 -->
  <input type="text" placeholder="comment" v-model="formData.content"><input type="submit" value="send" @click="send">
  </template>

<script setup>
// 这里和 Feed 获取的逻辑一致，从列表里获取
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
])
let comment_list = reactive([
  {name:1,time:1,comment:1},
  {name:2,time:2,comment:2},
  {name:3,time:3,comment:3},
  {name:4,time:4,comment:4},
])

// 跳转链接时传递参数的方式是 / 而不是 ?=，需要使用 params 来获取参数
// 如果是 ?= 的形式，就是 query 获取参数
const post_id = useRoute().params.id

// 发送 get 请求，和 Profile 的处理逻辑一致
// http.get(`/feed/detail/${post_id}`).then(rep => {
//   post_list.splice(0, 0, ...rep.data)  // reactively update data
// })


// 让黄书恒一次性把post_list和comment_list都发过来 <<<——————————————
//只需要接收一个数组，这个数组应该包含根据post.id查询到的post以及该post的所有comment
// http.get(`/feed/detail/${post_id}`).then(rep => {
//   comment_list.splice(0, 0, ...rep.data)  // 这里相当于是在末尾插入rep.data，
// })



//formData 就是我需要给后端发送的东西，里面包含了我给后端具体发送的东西，视情况增加
const formData = reactive({
  content: '',
  // user_id: storeToRefs(useUserStore()).user_id.value,
})

const router = useRouter()
const send = () => {
  alert(11111111111) 
  if (!formData.content) return
  alert(1.511115151515)
  alert(formData)
  http.post(`feed/${post_id}/comment`, formData).then(rep => {
    alert(222222222222)
    if (rep.data) {
      alert(333333333333333)
      formData.content = ''
      router.go(0)
    }
  })
}

</script>

<style scoped></style>