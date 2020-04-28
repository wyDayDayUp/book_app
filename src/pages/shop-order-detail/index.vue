<template>
  <div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul v-show="shopInfo.length">
            <li></li>
            <li>{{shopInfo[0].orderCode}}</li>
            <li>{{shopInfo[0].orderPayTime}}</li>
            <li class="active">{{Condition|multiple(shopInfo[0].orderCondition)}}</li>
        </ul>
    </div>
    <div class="content">
        <div class="phone">
            <div class="item">
                <img src="../../assets/u1056.png" alt="">
                <span>{{shopInfo[0].userName}}</span>
            </div>
            <div class="item">
                <img src="../../assets/u1060.png" alt="">
                <span>{{shopInfo[0].userPhone}}</span>
            </div>
        </div>
        <!-- <div class="line"></div> -->
        <div class="con-top">
            <div class="top-item" >
                <div class="top-img-con">
                    <img src="../../assets/卡车.png" width="15px" height="15px">
                </div>
                <span>{{shopInfo[0].storeName}}</span>
            </div>
             <div class="top-item" >
                <div class="top-img-con">
                    <img src="../../assets/position2.png" width="13px">
                </div>
                <span>{{shopInfo[0].storeAddress}}</span>
            </div>
        </div>
        <!-- <div class="line"></div> -->
        <div class="order-item" v-for="item of shopInfo[0].orderDetailList" :key="item.orderDetailId">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.imageUrl">
                </div>
                <div class="text">
                    <div class="name-con">{{item.orderDetailGoodsName}}</div>
                    <div class="text-con">{{item.goodsDescription}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.orderDetailGoodsSalePrice}}&nbsp;</span>
                        <span>x&nbsp;{{item.orderDetailGoodsNum}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共&nbsp;{{num}}&nbsp;件商品，合计￥</span>
            <span>{{total}}</span>
        </div>
    </div>
    <!-- <div class="footer">
        <div class="footer-btn">
            <img src="../../assets/按钮2.png" alt="">
            <span>完成取货</span>
        </div>
    </div> -->
  </div>
</template>

<script>
import req from '@/api/shop-order-detail.js'
export default {
  name: 'shop-order-detail',
  mounted(){
    req('findStoreOrderDetail',{
      orderId:this.$store.state.OrderDetailId
    }).then(res=>{
      this.shopInfo = res.data
      console.log(this.shopInfo)
      this.shopInfo[0].orderDetailList.forEach(item=>{
        this.total = this.total + item.orderDetailGoodsNum * item.orderDetailGoodsSalePrice
        this.num =  this.num + item.orderDetailGoodsNum
      })
    })
  },
  filters:{
        'multiple':function(value,value1){
           if(value1 === 0)
            return '已下单'
           else if(value1 === 1)
            return '已取消'
           else if(value1 === 2)
            return '已到货'
           else if(value1 === 3)
            return '已取货'   
           else if(value1 === 4)
             return '已完成未评价'
           else if(value1 === 5)
             return '已完成已评价'  
        }
    },
  data () {
    return {
      total:0,
      num:0,
      shopInfo:[
        {}
      ],
      Condition:'',
      topList: [
        {
          id: '001',
          img: require('../../assets/卡车.png'),
          width: '18px',
          text: '取货门店：新华书店（新街口店）'
        }, {
          id: '002',
          img: require('../../assets/position2.png'),
          width: '13px',
          text: '取货门店：新华书店（新街口店）'
        }
      ],
      orderList: [
        {
          id: '001',
          adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
          img: require('../../assets/book1.jpg'),
          prop: '重量：0.32kg 系列：一生自在系列',
          price: '42.80',
          number: '1',
          count: '42.80'
        }
      ],
      msgList: [
        '2020020713270034',
        '2020-02-11 11:54:01',
        '已付款'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
      width: 95%;
      margin: 12px auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 0 13px;
      box-sizing: border-box;
      .phone {
          width: 100%;
          height: 56px;
          display: flex;
          font-size: 14px;
          flex-direction: column;
          margin-bottom: 5px;
          justify-content: center;
          padding: 0 6px;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
          .item {
              flex: 1;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              img {
                  width: 18px;
                  height: 18px;
                  margin-right: 5px;
              }
          }  
      }
      .con-top {
         border-bottom: 1px solid #ccc;
         padding-bottom: 5px;
          width: 100%;
          .top-item {
              display: flex;
              padding: 5px 0 8px;
              .top-img-con {
                  width: 30px;
                  text-align: center;
              }
              span {
                  font-size: 15px;
              }
          }
      }
      .line {
          width: 100%;
          height: 0.5px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
          margin-top: 12px;
          background-color: white;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
              .img-con {
                  flex: 1;
                  text-align: center;
                  img {
                      width: 75px;
                      height: 90px;
                  }
              }
              .text {
                  margin-left: 10px;
                  flex: 2.2;
                  .text-con {
                      font-size: 14px;
                      line-height: 55px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 20px;
                      color: rgb(168,168,168);
                  }
                  .price-con {
                      text-align: right;
                      line-height: 26px;
                      span:nth-child(1) {
                          font-size: 11px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 16px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(3) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
      }
  }
  .order-msg {
      width: 95%;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 2px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
      border-bottom: 1px solid #ccc;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
  .footer {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      background-color: rgb(242,242,242);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 10px;
      box-sizing: border-box;
      .footer-btn {
          width: 110px;
          height: 40px;
          position: relative;
          img {
              width: 100%;
          }
          span {
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: -32px;
              margin-top: -10.4px;
              color: white;
          }
      }
  }
   .item-bottom {
              float: right;
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
</style>
