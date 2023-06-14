<template>
  <div>
    <div class="center">
      <div>
        <img src="../image/login/titel_1.png" class="r_side">
      </div>
      <span class="r_side">账号</span>
      <div class="kuang">
        <input type="text" v-model="formData.username" placeholder="请输入账号/学号/邮箱">
      </div>
      <span>密码</span>
      <div>
        <input type="password" v-model="formData.password" placeholder="请输入密码">
        <!-- <p v-if="showErrorMessage" class="error-message">Invalid username or password</p> -->
      </div>
      <div >
        <input type="submit" value="登录" @click="login" class="button">
      </div>
    </div>
    <div>
      <img src="../image/login/moonshot_background.png" class="background">
    </div>
      <img src="../image/login/background_1.png" class="light">
      
  </div>
  <div>{{ token }}</div>
</template>

<script setup>
import http from '../api/http'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = reactive({
  username: '',
  password: ''
  
})
// let showErrorMessage = false;


const { user_id, token } = storeToRefs(useUserStore())


const login = () => {
  if (!formData.username || !formData.password) {
    msg.value = 'empty username or password!'
    return
  }
  http.post('/login', formData).then(rep => {
    if (rep.data.code === 0) {
      user_id.value = rep.data.user_id
      token.value = rep.data.token
      console.log(token.value)
      router.push('/feed')
    } else {
      msg.value = rep.data.msg
    }})
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
  background-color: transparent;
}

span {
  color: rgb(0, 0, 0);
  font-size: 20px; /* 修改字体大小为 20px */
  display: block;
  margin: 60px 0px 0px 0px;
  margin-bottom: 20px;
  border: 292px 84px;
  background-color: transparent;
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
  z-index: -1;
  width: 50%; 
  background-image: url('../image/login/background_1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.button:active {
  /* 添加交互效果样式 */
  transform: translateY(2px);
}
</style>
