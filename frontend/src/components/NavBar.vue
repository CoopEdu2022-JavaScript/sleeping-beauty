<template>
  <div class="shell">
    <div v-show="title != 'Feed'" class="nav">
      <button @click="back">back</button>
      <span>{{ title }}</span>
    </div>
    <router-link to="/notification" v-show="title == 'Feed'" class="note">
      <img src="../public/tag_page/bell.png" alt="notification">
    </router-link>
  </div>
</template>

<script setup >
const router = useRouter()
const title = useRoute().name
const back = () => router.go(-1)
</script>

<style scoped>
.shell{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
}
.flex-container {
  display: flex;
  align-items: center;
}

.flex-container div {
  flex: 1;
}

.note {
  margin-left: auto;
}

button {
    margin-right: auto;
  }

.nav{
  display: flex;
  align-items: center;
  height: 100%;
  width: 57%;

}
</style>