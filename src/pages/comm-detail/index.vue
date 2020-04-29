<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.imageUrl" alt="">
    </div>

    <div class="book-detail">
      <!-- <div class="book-name">{{commDetailData.goodsName}}</div> -->
      <div class="book-price">
        <div>￥{{commDetailData.goodsSalePrice}}</div>
        <div>￥{{commDetailData.goodsFixPrice}}</div>
        <div class="book-evaluate">
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
       </div>
      </div>
      <div class="book-name">{{commDetailData.goodsName}}</div>
      <div class="book-Describe">{{commDetailData.goodsDescription}}</div>
      <div class="count-box">
        
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{commDetailData.storeAddress}}</span>
      </div>
    </div>
    <div class="foot">
       <img src="@/assets/shop_car2.png" @click="Carbtn">  
       <el-button  @click="addBuy" class="btn1">加入购物车</el-button>
       <el-button  @click="buy" class="btn2">立即购买</el-button>
    </div>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'
export default {
  name: 'comm-detail',
  data () {
    return {
       value:0,
      commDetailData: {
        // goodsName: '三国演义',
        // isbn: '',
        // goodsDescribe: '《三国演义是中国古典四大名著之一，亦是中国第一部长篇历史章回小说，作者一般被认为是元末明初的罗贯中。',
        // goodsPrice: '100',
        // goodsImagePath: '',
        // goodsEvaluateScore: '1',
        // goodsAuthor: '罗挂钟',
        // goodsPress: '666'
      },
      bookCount: 1,
      address: '新华书店（新街口店）',
    }
  },
  mounted(){
    req('findGoods',{
      goodsId:this.$store.state.HotgoodsId
    }).then(res=>{
      if(res.code != 1) return console.log('失败')
        console.log('成功')
        console.log(res)
        this.commDetailData = res.data
        this.commDetailData.storeAddress = JSON.parse(window.sessionStorage.getItem('userInfo')).storeAddress
        this.value = this.commDetailData.goodsStar
    })
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    buy () {
      if(!JSON.parse(sessionStorage.getItem('userInfo')).storeInvitationCode){
         this.$router.push({path: '/change-store-code'})
         return this.$message.error('请先绑定店铺邀请码，在进行购买')
      }
      this.$confirm('请检查信息无误后，进行结算', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then(() => {
           req('addOrder',{
            orderClientCode:window.sessionStorage.getItem('userId'),
            orderDetailGoodsCodes:this.commDetailData.goodsId,
            orderDetailGoodsNums:this.bookCount,
            orderStoreCode:JSON.parse(sessionStorage.getItem('userInfo')).storeId,
          }).then(res=>{
            if(res.code != 1) return this.$message.error(res.msg)
              this.$router.push({path: '/order-list'})
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addBuy(){
      req('addShoppingCart',{
        shoppingCartGoodsCode:this.$store.state.HotgoodsId,
        shoppingCartClientCode:window.sessionStorage.getItem('userId'),
        shoppingCartGoodsNum:this.bookCount
      }).then(res=>{
        if(res.code != 1) return  this.$message.error(res.msg)
           this.$message.success('加入购物车成功')
      })
    },
    Carbtn(){
      this.$router.push({path: '/shop-car'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}
.el-message-box{
   width: 300px;
}
.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    width: 65%;
    height: 95%;
    margin: 0 auto;
    margin-top: 5px;
  }
}

.book-detail {
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;

  .book-price {
    // font-size: 22px;
    // color: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .book-evaluate{
        margin-right: 15px;
       .el-rate{
         float: left;
       }
    }
    div:nth-child(1){
          font-size: 22px;
         
         
          color: red;
       }
        div:nth-child(2){
           margin-right: 110px;
           font-size: 12px;
           text-decoration: line-through;
        }
    }
 
  .book-name {
    font-size: 18px;
    line-height: 30px;
  }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  // .book-evaluate{
  //   border-bottom: 1px solid #ddd;
  //   padding-bottom: 10px;
  //   display: flex;
  //   .el-rate{
  //     width: 70%;
  //   }
  // }
  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
}
.foot{
  position: absolute;
  bottom: 10px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  img{
    height: 30px;
    width: 30px;
    margin-right: 15px;
  }
  .el-button{
    margin-right: 10px;
  }
}
.btn1{
  background-color: red;
  color: #fff;
}
.btn2{
  background-color: rgb(197, 156, 104);
  color: #fff;
}
</style>
