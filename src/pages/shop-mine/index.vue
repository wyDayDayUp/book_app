<template>
  <div class="box">
    <div class="bg">
      <div class="driverinfo">
         <img :src="img" v-if="img">
         <img src="../../assets/head_pic.png"  v-else>
         <div class="text-con">{{name}}</div>
      </div>
    </div>
    <div class="info">
      <div>
        <img src="@/assets/u919.png">
        <span>门店：{{driverInfo.storeName}}</span>
      </div> 
      <div>
        <img src="@/assets/u1265.png">
        <span>邀请码：{{driverInfo.storeInvitationCode}}</span>
      </div>
      <div>
        <img src="@/assets/u295.png">
        <span>{{driverInfo.storeAddress}}</span>
      </div>
    </div>
     <div class="content">
        <div
          class="con-item"
          v-for="(item,index) in conList"
          :key="index"
          @click="toPage(item)">
            <div>
                <img :src="item.img1" alt="">
            </div>
            <div><span>{{item.label}}</span></div>
            <div>
                <img :src="item.img2" alt="">
            </div>
        </div>
    </div>
  </div>  
  
</template>
<script>
import req from '@/api/shop-mine.js'
export default {
   name: 'shop-mine',
  data () {
    return {
      img:'',
      name:'',
      conList: [
        {
          img1: require('../../assets/u675.png'),
          label: '修改密码',
          img2: require('../../assets/右.png'),
          toPath: '/change-password'
        },
         {
          img1: require('../../assets/u666.png'),
          label: '退出登录',
          img2: require('../../assets/右.png'),
          toPath: '/login'
        }
      ],
      driverInfo:{},
    }
  },
  mounted(){
    this.img = JSON.parse(window.sessionStorage.getItem('userInfo')).imageUrl 
    this.name = JSON.parse(window.sessionStorage.getItem('userInfo')).userName  
    req('findUser').then(res=>{
      console.log(res)
      this.driverInfo = res.data
    })
  },
  methods: {
    toPage (data) {
      if(data.label === '退出登录'){
         this.$confirm('是否退出登录，返回登录界面？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then(() => {
           this.$router.push({path: data.toPath})
          this.$message({
            type: 'success',
            message: '退出登录成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }else{
        this.$router.push({path: data.toPath})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-message-box{
   width: 300px;
}
.bg{
  height: 100px;
  display: flex;
  align-items: center;
  .driverinfo{
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 5%;
    img{
      width: 65px;
      height: 65px;
    }
    .text-con{
      flex: 2;
      font-size: 22px;
      margin-left: 5%;
    }
  }
}
.info{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 10px;
  div{
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    img{
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
    span{
      flex:1;
    }
  }
}
.content {
      width: 95%;
      height: 100px;
      padding: 18px 2px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          div:nth-child(1) {
              display: flex;
              // align-items: center;
              // justify-content: center;
              img {
                  width: 16px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              // margin-top: 12px;
              // line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              // align-items: center;
              img {
                  width: 100%;
                  height: 14px;
                  margin-top: 10px;
              }
          }
      }
  }
</style>