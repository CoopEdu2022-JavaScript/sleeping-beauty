<template>
  <body>
    <div class="center">
    <div>
      <img src="../image/login/titel_1.png" class="r_side">
    </div>
    <span class="r_side">账号</span>
    <div class="kuang">
      <input type="text" v-model="formData.uid" placeholder="请输入">
    </div>
    <span>密码</span>
    <div>
      <input type="password" v-model="formData.pwd">
    </div>
    <div class="button">
      <input type="submit" value="登录" @click="login">
    </div>
  </div>
  <div>
    <img src="../image/login/background_moonshot.png" class="background">
  </div>
  </body>

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
      // console.log(formData)
      if (token.value) router.push('/feed')
    })
}
</script>


<style scoped>
input{
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;

}
span{
  color: rgb(0, 0, 0);
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
  border: 292px 84px;
}
.center {
  margin: 137px 45.5px 307px;
}

.r_side{
  margin-left: 0;
}
.background{
  margin-left: 18px;
  margin-right: 12px;
  margin-bottom: 54px;
  vertical-align: bottom;
}
</style>