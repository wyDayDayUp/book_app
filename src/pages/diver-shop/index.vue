<template>
  <div class="box">
    <div class="list-box">
      <div class="top" v-for="item in  driverShop" :key="item.storeCode">
        <div>
          <img src="@/assets/u919.png">
          <span>{{item.storeCode}}</span>
        </div>
        <div>
          <span>门店：{{item.storeName}}</span>
          <span>地址：{{item.storeAddress}}</span>
        </div>
        <div>
          <span>店长：{{item.userName}}</span>
          <span>手机：{{item.userPhone}}</span>
        </div>
      </div>
  </div>
  </div>  
</template>

<script>
import req from "@/api/diver-shop.js"
export default {
  name:'diver-shop',
  data(){
    return{
      driverShop:[],
    }
  },
  mounted(){
    req('listDriverStores',{
      userId: window.sessionStorage.getItem('userId')
    }).then(res=>{
      this.driverShop = res.data
      console.log(this.driverShop)
    })
  }
}
</script>

<style lang="scss" scoped>
.list-box{
  padding-bottom: 50px;
}
.top{
  width: 95%;
  border-radius: 10px ;
  background-color: #f6f6f6;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 15px;
  div:nth-child(1){
    padding: 15px 0 0 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    // border-top: 1px solid black;
    span{
      margin-left: 10px;
    }
  }
  div:nth-child(2){
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0 15px 30px;
    border-bottom: 1px solid black;
    span{
      width: 100%;
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
  div:nth-child(3){
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 0 15px 30px;
    // border-bottom: 1px solid black;
    span{
      width: 100%;
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
}
</style>