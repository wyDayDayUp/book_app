<template>
  <div>
    <!-- <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div> -->

    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="70px" :rules="rules" ref="from">
      <el-form-item label="用户名" prop="userLoginName">
        <el-input v-model="formData.userLoginName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model="formData.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item prop="userSex">
        <el-radio-group v-model="formData.userSex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="userIdcard">
        <el-input v-model="formData.userIdcard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userMail">
        <el-input v-model="formData.userMail"></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="storeInvitationCode">
        <el-input v-model="formData.storeInvitationCode"></el-input>
      </el-form-item>
       <el-form-item label="头像上传"  label-width="100px" class="img"  ref="img">
          <el-upload
          action="http://299z2526w7.wicp.vip//app/image/uploadImage"
          v-model="formData.imageId"
          name="imageFile"
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          :data="imgData">
          <el-button size="small" type="primary" >点击上传</el-button>
          </el-upload>  
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <el-button type="text" @click="toLogin">返回登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import req from '@/api/register.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'register',
  
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formData.confirmUserPassword !== '') {
            this.$refs.from.validateField('confirmUserPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.userPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      fileList:[],
      imgData:{
      imageCate:4,
      // access_token:JSON.parse(sessionStorage.getItem('user')).access_token
      },
      formData: {
        userLoginName:'',
        userPassword:'',
        userPhone:'',
        userName:'',
        userSex:'',
        userIdcard:'',
        userMail:'',
        imageId:'',
        storeInvitationCode:'',
        confirmUserPassword:'',
      },
      rules:{
        userLoginName:[
          { required: true, message: '请输入账号名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
          {pattern:/^[0-9a-zA-Z]+$/, message: '不能带有汉字', trigger: 'blur'}
        ],
        userName:[
           { required: true, message: '请输入用户姓名', trigger: 'blur' },
           { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        userSex:[
           { required: true, message: '请输入性别', trigger: 'change' },
        ],
        userPhone:[
           { required: true, message: '请输入电话号码', trigger: 'blur' },
           {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ ,required: true, message: '不是有效的电话号码', trigger: 'blur' },
        ],
        userMail:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },          
           { pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,required: true, message: '不是有效的邮箱', trigger: 'blur' },
        ],
        userIdcard:[
           { required: true, message: '请输入身份证号', trigger: 'blur' },
           { min:18,max:18, required: true, message: '身份证号必须为18位', trigger: 'blur' },
           { pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
        ],
        userPassword:[
          { required: true, message: '请输密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmUserPassword:[
          { validator: validatePass2, trigger: 'blur' }
        ],
        // imageId:[
        //    { required: true, message: '请上传头像', }
        // ]
        // storeInvitationCode:[
        //   {required: true, message: '请输入邀请码', trigger: 'change' }
        // ]
      },
    }
  },
  methods:{
    handleAvatarSuccess(res, file){
      this.formData.imageId = res.data.imageId
      console.log(this.formData.imageId)
      this.$refs.img.clearValidate()
      console.log(res)
    },
    register(){
      this.$refs.from.validate((valid) => {
        if (valid) {
          // req('registerClient',{
          //   ...this.formData
          // }).then(res=>{
          //   if(res.code != 1) return this.$message.error(res.msg)
          //     this.$message.success('恭喜您注册成功！')
          //     this.$router.push('/login')
          // })
          axios.post('http://299z2526w7.wicp.vip/app/client/registerClient',qs.stringify(this.formData)).then(res=>{
            // console.log(res.data.code)
            // console.log(res)
            if(res.data.code != 1) return this.$message.error(res.data.msg)
              this.$message.success('恭喜您注册成功！')
              this.$router.push('/login')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(this.formData)
    },
    toLogin(){
       this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;
  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 13px;
  }
}

.register-btn {
  width: 150px;
  height: 40px;
  margin-top: 20px;
}
/deep/.el-form .img{
  text-align: left;
  margin-left: 18px;
}
</style>
