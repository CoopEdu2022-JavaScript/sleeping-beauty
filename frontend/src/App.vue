<template>
  <div class="boundary">
    <router-view />
  </div>
  <!-- <div>token={{ token }}</div> -->
</template>

<script setup>
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
</script>

<style scoped>
.boundary {
    width: 390px;
    height: 100%;
    border: 1px solid black;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }
</style>