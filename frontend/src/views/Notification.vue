<template>
  <NavBar />
  <div v-for="i in 5" :key="i">
    <Message />
  </div>
</template>

<script setup></script>

<style scoped></style>