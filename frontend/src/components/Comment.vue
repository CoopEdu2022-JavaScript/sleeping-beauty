<template>
  <hr />
  <div>
    <img src="" alt="/">
    <span>name: {{ comment.name }}</span>
    <span>time: {{ comment.time }}</span>
    <span>comment: {{ comment.comment }}</span>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  comment: Object,
})


const comment = reactive(props.comment);

</script>

<style scoped>
</style>