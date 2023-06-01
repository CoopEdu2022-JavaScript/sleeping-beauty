<template>
    <h1>{{ post.tag }}</h1> 
    <p>{{ post.content }}</p>
    <div class="parent">
        <!-- 下面这里可能还需要有一个自动输入tag内容的功能 -->
        <router-link to="/editor"><img src="" alt="Join tag"></router-link>
        <span>participant: {{ post.participant }} 人参与</span>
    </div>
    
</template>


<script setup>

import { reactive } from 'vue';

const post = reactive ({
    tag: "#Join us!",
    content: "探月搬到新家啦！在搬家过程中有没有遇到什么想吐槽的/有趣的事情呢？",
    participant: "2300",
})
</script>

<style scoped>
.parent {
  display: flex;
  justify-content: space-between;
}

</style>