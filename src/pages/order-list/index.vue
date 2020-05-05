<template>
  <div class="box">
    <div class="leader">
        <ul>
            <li :class="act1" @click="Act1">全部订单</li>
            <li :class="act2" @click="Act2">已付款</li>
            <li :class="act3" @click="Act3">待取货</li>
            <li :class="act4" @click="Act4">已完成</li>
        </ul>
    </div>
    <div class="list-box">
    <div class="order-item" v-for="(item,index) in list" :key="item.orderId" :class="index === 0 ? 'Top':''">
        <div class="item-top"  @click="toPage(item.orderId)">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>{{Condition|multiple(item.orderCondition)}}
            </span>
        </div>
    <div v-for="item1 in item.orderDetailList" :key="item1.orderDetailId"> 
        <div class="item-center">
            <div class="img-con">
                <img :src="item1.imageUrl" alt="">
            </div>
            <div class="text">
                <div class="text-name">
                    {{item1.orderDetailGoodsName}}
                </div>
                <div class="text-con">
                    {{item1.goodsDescription}}
                </div>
                <div class="props-con">
                    {{item.prop}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{item1.orderDetailGoodsSalePrice}} &nbsp;</span>
                    <span>x&nbsp;{{item1.orderDetailGoodsNum}}</span>
                </div>
            </div>
        </div>
        <!-- <div class="item-bottom">
            <span>共&nbsp;{{item1.orderDetailGoodsNum}}&nbsp;件商品，合计￥</span>
            <span>{{item1.orderDetailGoodsSalePrice*item1.orderDetailGoodsNum}}</span>
        </div> -->
        <!-- <div class="item-more" v-show="item.orderStatus == '已完成'">
            <div class="btn" @click.stop="evaluate(item)">
                <span>评价</span>
            </div>
        </div> -->
     </div>
     <div class="orderInfo" v-show="$store.state.userType === 'shop'">
        <div>
            <img src="../../assets/u1056.png" width="15px" height="15px">
            <span>{{item.userName}}</span>
        </div>
        <div>
            <img src="../../assets/u1060.png" width="15px" height="15px">
            <span>{{item.userPhone}}</span>
        </div>
        <div>

        </div>
     </div>
       <div class="item-bottom">
            <span>共&nbsp;{{item.orderTotalNum}}&nbsp;件商品，合计￥</span>
            <span>{{item.orderTotalPrice}}</span>
        </div>
      <div class="btn-list" v-show="Type === 'shop'">
          <button v-if="item.orderCondition===0" @click="btn1(item.orderId,item.version)">取消订单</button>
          <button v-if="item.orderCondition===0" @click="btn2(item.orderId,item.version)">订单到货</button>
          <button v-if="item.orderCondition===2" @click="btn3(item.orderId,item.version)">订单已取货</button>
          <button v-if="item.orderCondition===2" @click="btn4(item.orderId,item.version)">取消到货</button>
          <button v-if="item.orderCondition===3" @click="btn5(item.orderId,item.version)">取消已取货</button>
      </div>
       <div class="btn-list1" v-show="Type === 'user'">
          <button v-if="item.orderCondition===0" @click="btn8(item.orderId)">取消订单</button>
          <button v-if="item.orderCondition===2" @click="btn8(item.orderId)">取消订单</button>
          <button v-if="item.orderCondition===3" @click="btn6(item.orderId)">确认收货</button>
          <button v-if="item.orderCondition===4" @click="btn7(item)">评价</button>
      </div>
    </div>
  </div>
  </div> 
</template>

<script>
import req from '@/api/order-list.js'
export default {
  name: 'order-list',
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
      act1:'active',  
      act2:'',  
      act3:'',  
      act4:'',  
      type:-1,
      Condition:'',
      list: [
        // {
        //   id: '001',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已付款',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }, {
        //   id: '002',
        //   orderNum: '2020020713270034',
        //   orderStatus: '已完成',
        //   adv: '一生自在季羡林的自在智慧（午静携侣寻野菜，黄昏抱猫看夕阳！金庸、贾平凹...）',
        //   img: require('../../assets/book1.jpg'),
        //   prop: '重量：0.32kg 系列：一生自在系列',
        //   price: '42.80',
        //   number: '1',
        //   count: '42.80'
        // }
      ]
    }
  },
  mounted(){
      this.getOrderList()
      console.log(this.$store.state.userType)
  },
  computed:{
    Type(){
      return this.$store.state.userType
    }
  },
  methods: {
       getOrderList(){
           if(this.$store.state.userType === 'shop'){
               req('listStoreOrders',{
                  pageNum:1,
                  pageSize:100,  
                  userId:window.sessionStorage.getItem('userId'),
                  orderCondition:this.type,
               }).then(res=>{
                   this.list = res.data.list
                   console.log(this.list)
               })
           }
           if(this.$store.state.userType === 'user'){
               req('listOrdersById',{
                  pageNum:1,
                  pageSize:100,  
                  orderclientCode:window.sessionStorage.getItem('userId'),
                  orderCondition:this.type,
               }).then(res=>{
                   this.list = res.data.list
                   console.log(this.list)
               })
           }

       },
	    toPage (data) {
            this.$store.commit('getorderDetailId', data)
            console.log(data)
            if(this.$store.state.userType === 'shop')
              this.$router.push({path: '/shop-order-detail'})
             if(this.$store.state.userType === 'user')
              this.$router.push({path: '/order-detail'})
		},
		evaluate (data) {
			console.log(data)
			this.$router.push({path: '/order-evaluate'})
        },
        Act1(){
            this.act1 = "active"
            this.act2 = ''
            this.act3 = ''
            this.act4 = ''
            this.type = -1
            this.getOrderList()
        },
         Act2(){
            this.act1 = ''
            this.act2 = "active"
            this.act3 = ''
            this.act4 = ''
            this.type = 0
            this.getOrderList()
        },
         Act3(){
            this.act1 = ''
            this.act2 = ''
            this.act3 = "active"
            this.act4 = ''
            this.type = 2
            this.getOrderList()
        },
         Act4(){
            this.act1 = ''
            this.act2 = ''
            this.act3 = ''
            this.act4 = "active"
            this.type = 4
            this.getOrderList()
        },
        btn1(val1,val2){
            req('updateStoreOrderCondition',{
                orderId:val1,
                orderCondition:1,
                version:val2
            }).then(res=>{
                if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                    this.getOrderList()  
            })
        },
         btn2(val1,val2){
            req('updateStoreOrderCondition',{
                orderId:val1,
                orderCondition:2,
                version:val2
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                   this.getOrderList() 
            })
        },
         btn3(val1,val2){
            req('updateStoreOrderCondition',{
                orderId:val1,
                orderCondition:3,
                version:val2
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                    this.getOrderList()  
            })
        },
         btn4(val1,val2){
            req('updateStoreOrderCondition',{
                orderId:val1,
                orderCondition:0,
                version:val2
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                  this.getOrderList()    
            })
        },
         btn5(val1,val2){
            req('updateStoreOrderCondition',{
                orderId:val1,
                orderCondition:2,
                version:val2
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                  this.getOrderList()    
            })
        },
        btn6(val){
            req('updateOrderCondition',{
                orderId:val,
                orderCondition:4
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                this.getOrderList()    
            })
        },
        btn7(val){
            console.log(val)
            this.$store.commit('getorderevaluate', val)
             this.$router.push({path: '/order-evaluate'})
        },
        btn8(val){
            req('updateOrderCondition',{
                orderId:val,
                orderCondition:1
            }).then(res=>{
                 if(res.code!=1) return this.$message.error(res.msg)
                    this.$message.info('订单状态修改成功')
                this.getOrderList()    
            })
        },
        
  }
}
</script>

<style lang="scss" scoped>
  .box{
      background-color: #f6f6f6;
  }
  .leader {
      position: fixed;
      left: 0;
      top: 50px;
      z-index: 99999;
      height: 50px;
      width: 100%;
      padding-bottom: 5px;
      background-color: #f6f6f6;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 15px;
      position: relative;
    //   margin-top: 50px;
    //   bottom: 50px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 8px 5px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          margin-top: 20px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
                  height: 100px;
              }
          }
          .text {
              flex: 2.2;
              padding-left: 10px;
              box-sizing: border-box;
              .text-name{
                  font-size: 15px;
              }
              .text-con {
                  font-size: 13px;
                //   line-height: 10px;
                  margin-top: 5px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 12px;
                  line-height: 26px;
                  margin-top: 5px;
                  color: rgb(168,168,168);
              }
              .price-con {
                  text-align: right;
                //   line-height: 30px;
                  margin-top: 15px;
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
      .item-bottom {
          width: 100%;
        //   line-height: 40px;
          text-align: right;
          padding-top: 5px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 100%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
  }
.list-box{
    // position: relative;
    // left: 0px;
    min-height: 550px;
    padding-bottom: 50px;
}
 /deep/ .btn-list{
    //   position: absolute;
    //   right: 0px;
    //   bottom: -10px;
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
      button{
        width: 82px;
        height: 25px;
        outline: none;
        border: 1px solid #c39862;
        background-color: #ffffff;
        border-radius: 18px;
        color: #c39862;
        margin-right: 5px;
  }
 }
 /deep/ .btn-list1{
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
     button{
        width: 82px;
        height: 25px;
        outline: none;
        border: 1px solid #c39862;
        background-color: #ffffff;
        border-radius: 18px;
        color: #c39862;
        margin-right: 5px;
  }
 }
 /deep/ .Top{
     margin-top: 50px;
 } 
 .orderInfo{
     margin-top: 8px;
     display: flex;
     justify-content: flex-end;
     align-items: center;
     div:nth-child(1){
         margin-right: 15px;
     }
     div{
         display: flex;
         align-items: center;
         justify-self: flex-end;
         font-size: 13px;
        //  margin-left: 10px;
     }
 }
</style>
