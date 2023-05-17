<template>
  <NavBar />
  <Post />
  <div v-for="i in 10" :key="i">
    <Comment />
  </div>
</template>

<script setup>

</script>

<style scoped></style>