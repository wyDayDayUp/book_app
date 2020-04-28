<template>
  <div>
    <div class="pwd-con">
        <!-- <div class="pwd-item" v-for="(item,index) in conList"
        :key="index">
            <div class="item-left">{{item.label}}</div>
            <input type="text" :placeholder="item.placeholder" v-model="item.value">
        </div> -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <el-form-item label="原密码" prop="userPassword" label-width="85px">
            <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="Password" label-width="85px">
            <el-input type="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再确认密码" prop="userNewPassword"  label-width="85px">
            <el-input type="password" v-model="ruleForm.userNewPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
    </div>
    <div class="btn">
        <img src="../../assets/按钮.png" >
        <span @click="get">确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/change-password.js'
export default {
  name: 'change-password',
  data () {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.userNewPassword !== '') {
            this.$refs.ruleForm.validateField('userNewPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.Password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      conList: [
       {
          label: '新密码',
          placeholder: '请输入新密码',
          value:''
        }, {
          label: '确认新密码',
          placeholder: '请再次输入新密码',
          value:''
        }
      ],
      ruleForm:{
        userPassword:'',
        Password:'',
        userNewPassword:''
      },
      rules:{
        userPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        Password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userNewPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    get(){
      // console.log(this.conList)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          req('updatePassword',{
            userId: window.sessionStorage.getItem('userId'),
            ...this.ruleForm
          }).then(res=>{
             if(res.code!=1) return console.log('修改失败')
                 this.$message.success('修改成功')
                   this.$router.push('/shop-mine')
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
.demo-ruleForm{
  padding-right: 25px;
}
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
