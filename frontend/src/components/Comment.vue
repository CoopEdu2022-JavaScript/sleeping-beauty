<template>
  <hr />
  <div>
    <img src="" alt="/">
    <span>name: {{ comment.username }} </span>
    <p></p>
    <span>time: {{ comment.time }}</span>
    <p>
    </p>
    <span>comment: {{ comment.content }}</span>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import http from '../api/http';

const formData = reactive({
  post_id: '',
  content: '',
  user_id: '',
  
})
const props = defineProps({
  comment: Object,
})


const comment = reactive(props.comment);

console.log(comment.$props)
http.post('/deatil', )

const commment_post = () => {
  if (!content) {
    msg.value = 'have no content!'
    return
  }
  http.post('/feed/comment', formData).then(rep => {
    console.log(2222222333333,rep.data.code)
      user_id.value = rep.data.user_id
      token.value = rep.data.token
      content.value = rep.data.content
  })
}

</script>

<style scoped>
  
</style>