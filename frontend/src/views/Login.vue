<template>
  <div>
    <div class="center">
      <div>
        <img src="../image/login/titel_1.png" class="r_side">
      </div>
      <span class="r_side">账号</span>
      <div class="kuang">
        <input type="text" v-model="formData.uid" placeholder="请输入账号/学号/邮箱">
      </div>
      <span>密码</span>
      <div>
        <input type="password" v-model="formData.pwd" placeholder="请输入密码">
      </div>
      <div >
        <input type="submit" value="登录" @click="login" class="button">
      </div>
    </div>
    <div>
      <img src="../image/login/background_moonshot.png" class="background">
    </div>
      <img src="../image/login/background_1.png" class="light">
  </div>
</template>

<script setup>
import http from '../api/http'
const router = useRouter()
const formData = reactive({
  uid: '',
  pwd: ''
})

const userStore = useUserStore()
let { token } = storeToRefs(userStore)

const login = () => {
  http.post('/login', formData)
    .then(rep => {
      token.value = rep.data
      if (token.value) router.push('/feed')
    })
}
</script>

<style scoped>
div{
  margin: 0px;
}
input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;
}

span {
  color: rgb(0, 0, 0);
  font-size: 20px; /* 修改字体大小为 20px */
  display: block;
  margin: 60px 0px 0px 0px;
  margin-bottom: 20px;
  border: 292px 84px;
}

.center {
  margin: 137px 45.5px 82px;
}

.r_side {
  margin-left: 0;
}

.button {
  background-color: rgb(177, 214, 234);
  color: white;
  margin: 60px 0px 0px 0px;
  height: 42.1px;
  border-radius: 10px;
}

.background {
  margin-left: 18px;
  margin-right: 12px;
  margin-bottom: 54px;
  vertical-align: bottom;
}
.light{
  content: '';
  position: fixed;
  top: 300px;
  right: 0;
  bottom: 0;
  width: 50%; /* 设置伪元素的宽度为页面的一半 */
  background-image: url('../image/login/background_1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
