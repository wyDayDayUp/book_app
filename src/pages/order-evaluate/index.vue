<template>
  <div class="container">
    <div v-for="item in list" :key="item.orderDetailId">
      <div class="comm">
        <img :src="item.imageUrl" alt="">
      <el-rate
        :colors="colors"
        v-model="item.value"
        show-text>
      </el-rate>
        <!-- <div class="star" :style="{backgroundPosition: `${180 - count * 36}px 0`}"></div> -->
      </div>

      <div class="title">分享你的使用体验吧</div>

      <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="8" v-model="item.text"></el-input>

    </div>
     <el-button class="submit-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import "@/icont/iconfont.css"
import req from '@/api/order-evaluate.js'
import axios from 'axios'
export default {
  name: 'order-evaluate',
  data () {
    return {
      count:1,
       value: null,
       texts:['极差', '失望', '一般', '满意', '惊喜'],
       colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
       textarea: '',
       orderInfo:{},
       list:[],
    }
  },
  mounted(){
    this.orderInfo = this.$store.state.orderevaluate
    for(var i = 0 ; i < this.orderInfo.orderDetailList.length ; i++)
      this.list.push(this.orderInfo.orderDetailList[i])
    console.log(this.list)  
    console.log(this.orderInfo)
  },
  methods:{
    submit(){
      console.log(this.list)
        axios({
        method: 'post',
        url:'http://299z2526w7.wicp.vip/app/client/addGoodsCommentsByGoodsId',
        data:
           JSON.stringify({
           clientId:window.sessionStorage.getItem('userId'), 
           goodsCommentList:this.List,
           orderId:this.orderInfo.orderId,
           goodsCommentList: this.list.map(item => {
            return Object.assign({}, {goodsCommentGoodsCode: item.orderDetailGoodsCode, goodsComment: item.text, goodsCommentStar: item.value})
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).access_token
        }
      }).then(res=>{
        if(res.data.code != 1) return  this.$message.error(res.data.msg)
          this.$message.success('感谢您的评价和惠顾！')
          this.$router.push({path: '/order-list'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  background: #fff;

  .comm {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    /deep/ .el-rate__icon{
      font-size: 35px;
        margin-left: 5px;
    } 
    /deep/ .el-rate__text{
      display: block;
      text-align: center;
      font-size: 16px;
      margin-top: 15px;
    }
    img {
      width: 120px;
      height: 150px;
    }

    .star {
      width: 180px;
      height: 36px;
      background: url('../../assets/stars.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .title {
    padding-left: 10px;
    line-height: 40px;
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
