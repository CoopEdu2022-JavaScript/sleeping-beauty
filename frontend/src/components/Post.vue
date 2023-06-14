<template>
  <hr />
  <div>
    <div class="head">
     <img :src= "post.portrait" alt="" class="portrait">
      <div>
        <span>name: {{ post.username }}</span>
        <span>grade: {{ post.grade }}</span>
      </div>
    </div>
    <div class="main">
      <p>content: {{ post.content }}</p>
      <div class="image">
        
      </div>
    </div>
    <div>
      <span >time: {{ post.time }}</span>
    </div>
    <span >comments: {{ post.comments }}</span>
  </div>
  <span>&nbsp;</span>
  <button @click.stop="like" :state="post.liked?'press':'release'">likes</button>: {{ post.likes }}
</template>

<script setup>
const props = defineProps({
  post: Object
})
const post = reactive(props.post)

const like = () => {
  post.liked = !post.liked
  post.likes += (post.liked ? 1 : -1)
  if (post.liked) http.post(`feed/${post.id}/like`)
  else http.post(`feed/${post.id}/unlike`)
}
</script>

<style scoped>
.portrait {
  width: 45px;
  height: auto;
}
.head {
  display: flex;
  align-items: center;
}
.head div{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.main p {
  display: inline-block;
}

.image {
    display: flex; /* to center the image vertically and horizontally */
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 235px; /* set a height to the div element */
  }
.image img {
    max-width: 100%; /* set the maximum width of the image to prevent it from stretching */
    max-height: 100%; /* set the maximum height of the image to prevent it from stretching */
    object-fit: cover;
  }

[state='press'] {
  background-color: red;
}
</style>