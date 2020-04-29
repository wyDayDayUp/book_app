<template>
  <div>
    <div class="list-box">
      <div class="box" v-for="(item, index) in driverList" :key="index">
        <div class="diverInfo">
          <div>
            <img src="@/assets/u1210.png" />
            <span>{{item.userName}}</span>
          </div>
          <div>
            <img src="@/assets/u1151.png" />
            <span>{{item.userPhone}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import req from "@/api/diver.js";
export default {
  name: "diver",
  data() {
    return {
      driverList: [],
    }
  },
  mounted() {
    req('findStoreDriver', {
      userId: window.sessionStorage.getItem('userId')
    }).then(res => {
      console.log(res)
      this.driverList = res.data
    })
  }
};
</script>

<style lang="scss" scoped>
.list-box{
  padding-bottom: 50px;
}
.diverInfo {
  // border-bottom: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px 0 15px 20px;
  box-sizing: border-box;
  div {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
     align-items: center;
    span{
      margin-left: 10px;
    }
  }
 
}
.box {
  width: 95%;
  margin: 0 auto;
  background-color: #f6f6f6;
  border-radius: 10px;
  margin-top: 15px;
}
</style>