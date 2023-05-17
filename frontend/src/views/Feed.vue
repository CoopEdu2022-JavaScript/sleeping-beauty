<template>
  <NavBar />
  <div v-for="i in 5" :key="i">
    <Post />
  </div>
  <TabBar />
</template>

<script setup></script>

<style scoped></style>