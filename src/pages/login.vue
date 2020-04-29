<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="60px" :rules="rules" ref = "form">
      <el-form-item label="用户名" prop="username" label-width="65px">
        <el-input v-model="formData.username" :clearable = "true"	></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="65px">
        <el-input type="password" v-model="formData.password" :clearable = "true"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import req from '@/api/login.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '333',
        password: '123456'
      },
       rules: {
        username:[
          { required: true, message: '请输入账号名', trigger: 'blur' },
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
        ],
       }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
         if (valid) {
            // alert('submit!');
            axios.post('http://299z2526w7.wicp.vip/uaa/auth/form',qs.stringify(this.formData)).then(res=>{
              console.log(res.data)
              if(res.data.code!=0) return this.$message.error('用户名或密码错误')
              this.$message.success('登录成功')
              window.sessionStorage.setItem('user',JSON.stringify(res.data.data))
              req('findUser').then(res=>{
                console.log(res)
                if(res.code !=1) return false
                console.log('成功')
                 window.sessionStorage.setItem('userInfo',JSON.stringify(res.data)) 
                 window.sessionStorage.setItem('userId',res.data.userId)
                if(res.data.userRole === 2){
                  // this.$store.state.userType = 'shop'
                  this.$store.commit('getuser', 'shop')
                  this.$router.push('/order-list')
                }else if(res.data.userRole === 3){
                  this.$store.commit('getuser', 'diver')
                  this.$router.push('/diver-shop')
                }else{
                  this.$store.commit('getuser', 'user')
                  this.$router.push('/home')
                }  
              })
              // this.$router.push('/home')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: rgb(64, 158, 255);
}
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}

</style>
