<template>
  <div>
    <div class="content">
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/卡车.png" width="18px">
                </div>
                <span>取货门店：{{shopInfo.storeName}}</span>
            </div>
             <div class="top-item">
                <div class="top-img-con">
                    <img src="../../assets/position2.png" width="13px">
                </div>
                <span>{{shopInfo.storeAddress}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="item of shopInfo.orderDetailList" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.imageUrl">
                </div>
                <div class="text">
                    <div class="text-con">{{item.orderDetailGoodsName}}</div>
                    <div class="props-con">{{item.goodsDescription}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.orderDetailGoodsSalePrice}}&nbsp;&nbsp;</span>
                        <span>x&nbsp;&nbsp;{{item.orderDetailGoodsNum}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-bottom" style="float:right">
            <span>共&nbsp;{{num}}&nbsp;件商品，合计￥</span>
            <span>{{total}}</span>
        </div>
    </div>
    <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{shopInfo.orderCode}}</li>
            <li>{{shopInfo.orderPayTime}}</li>
            <li class="active">{{
                shopInfo.orderCondition === 0? '已下单':
                shopInfo.orderCondition === 1? '已取消':
                shopInfo.orderCondition === 2? '已到货':
                shopInfo.orderCondition === 3? '已取货':
                shopInfo.orderCondition === 4? '已完成未评价':
                '已完成已评价'    
            }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import req from "@/api/order-detail.js"
export default {
  name: 'order-detail',
  mounted(){
     req('findOrderDetailById',{
         orderId:this.$store.state.OrderDetailId
     }).then(res=>{
         if(res.code != 1 ) return console.log('失败')
            console.log('成功')
            console.log(res)
            this.shopInfo = res.data
            for(var i = 0; i < this.shopInfo.orderDetailList.length; i++){
                 this.total = this.total + this.shopInfo.orderDetailList[i].orderDetailGoodsNum * this.shopInfo.orderDetailList[i].orderDetailGoodsSalePrice
                 this.num =  this.num + this.shopInfo.orderDetailList[i].orderDetailGoodsNum
            }
     })
  },
  data () {
    return {
      total:0,
      num:0,
      shopInfo:[],  
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
      padding: 13px 13px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          .top-item {
              display: flex;
              margin-bottom: 15px;
              align-items: center;
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
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
      .order-item {
          width: 95%;
          margin: 0 auto;
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
                      font-size: 15px;
                      line-height: 22px;
                      overflow : hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      line-height: 26px;
                      color: rgb(168,168,168);
                      margin-top: 5px;
                  }
                  .price-con {
                      text-align: right;
                      line-height: 22px;
                       margin-top: 20px;
                      span:nth-child(1) {
                          font-size: 13px;
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
  .item-bottom {
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              padding-bottom: 8px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
  .order-msg {
      width: 95%;
      border-top: rgb(204,204,204) 1px solid;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      border-radius: 8px;
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
</style>
