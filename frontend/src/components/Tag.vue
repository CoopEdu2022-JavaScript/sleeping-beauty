<template>
    <div class="back">
        <!-- <img src="./tag_page/shade.png" alt="" class="shade"> -->
        <h1 class="hashtag">{{ post.hashtag }}</h1>
        <h1 class="tag-content">{{ post.tagContent }}</h1> 
        <p>{{ post.content }}</p>
        <div class="parent">
            <!-- 下面这里可能还需要有一个自动输入tag内容的功能 -->
            <router-link to="/editor"><button>立即参与</button></router-link>
            <span>{{ post.participant }}人参与</span>
        </div>
    </div>    
</template>


<script setup>

import { reactive } from 'vue';

const post = reactive ({
    hashtag: "#",
    tagContent: "Join us!",
    content: "探月搬到新家啦！在搬家过程中有没有遇到什么想吐槽的/有趣的事情呢？",
    participant: "2300",
})
</script>

<style scoped>
.parent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hashtag {
  width: 24.58px;
  height: 26.4px;   
}
button{
    border-radius: 20px;
    width: 84.59px;
    height: 33.14px;
}
/* div {
    border: 1px solid black;
} */
/* .back {
    background-image: url("./tag_page/shade.png") repeating-linear-gradient() ;
    background-position: 130px 230px;
    width: 100%;
    height: 100%;
}

.shade {
  width: 80px;
  height: 78px;
  left: 227px;
  top: 104px;
} */
</style>