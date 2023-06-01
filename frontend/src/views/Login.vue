<template>
  <body>
    <div class="center" >
      <span>
        登舱
      </span>
      <span class="a">
        账号
      </span>
      <div class="kuang">
        <input type="text" v-model="formData.uid">
      </div>
      <span>
        密码
      </span>
      <div>
        <input type="password" v-model="formData.pwd">
      </div>
      <div class="button">
        <input type="submit" value="登录" @click="login">
      </div>
      
    </div>
  </body>
</template>

<script setup> sd
const http = require("..api/http")
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
span{
  color: white;
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
}
.center {
  display: block;
  width:50px;
  margin: auto;
}
</style>