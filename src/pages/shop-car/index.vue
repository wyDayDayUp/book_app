<template>
  <div class="container">
    <div v-if="list.length === 0" class="kong">
      <div>购物车居然是空的</div>
      <div>在忙也要给自己买东西，对自己好一点~</div>
      <button @click="kongbtn">去逛逛</button>
    </div>
    <ul class="book-list" v-else>
      <li class="book-list-item" v-for="item in list" :key="item.shoppingCartId">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @click="inputChange(item)">
            <div class="action" :style="{display:item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.imageUrl" alt="">
          <div>
            <div>{{item.goodsName}}</div>
            <!-- <div></div> -->
            <div class="change_box">
              <span>￥{{item.goodsSalePrice}}</span>
              <div class="change-count-box" >
                <div @click="cut(item)">-</div>
                <div>{{item.shoppingCartGoodsNum}}</div>
                <div @click="add(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
      
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @click="all">
          <div class="action" :style="{display:Allchecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{total}}</span>
        </div>

        <button @click="accounts">结算</button>
        <button @click="Delete">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'
export default {
  name: 'shop-car',
  data () {
    return {
      list:[],
      total:0,
      Allchecked:false,
      listId:[],
      orderDetailGoodsCodes:[],
      orderDetailGoodsNums:[],
    }
  },
  mounted (){
     this.getShop()
      // let list = [
      //   {
      //     goodsName:'三国演义',
      //     goodsSalePrice:'32.5',
      //     shoppingCartGoodsNum:'0',
      //     shoppingCartId:'1',
      //     imageUrl:''
      //   },
      //   {
      //     goodsName:'三国演义',
      //     goodsSalePrice:'32.5',
      //     shoppingCartGoodsNum:'0',
      //     shoppingCartId:'2',
      //     imageUrl:''
      //   },
      //   {
      //     goodsName:'三国演义',
      //     goodsSalePrice:'32.5',
      //     shoppingCartGoodsNum:'0',
      //     shoppingCartId:'3',
      //     imageUrl:''
      //   },
      //   {
      //     goodsName:'三国演义',
      //     goodsSalePrice:'32.5',
      //     shoppingCartGoodsNum:'0',
      //     shoppingCartId:'4',
      //     imageUrl:''
      //   }
      // ]
  },
  methods :{
    getShop(){
      req('listShoppingCartsById',{
        pageNum:1,
        pageSize:100,
        shoppingCartClientCode: window.sessionStorage.getItem('userId')
      }).then(res=>{
        if(res.code != 1) return console.log('失败')
          console.log('成功')
            this.list = res.data.list.map(item => {
          return Object.assign({}, item, {checked: false}) 
        })  
        this.Allchecked = false
        // console.log(this.list)
      })
    },
    inputChange(item){
      this.listId = []
      this.orderDetailGoodsCodes = []
      this.orderDetailGoodsNums = []
      item.checked = !item.checked
      let flag = 1
      for(var i = 0 ; i < this.list.length;i++){
        if(this.list[i].checked == false){
           flag = 0
        }else{
          this.listId.push(this.list[i].shoppingCartId)
          this.orderDetailGoodsCodes.push(this.list[i].shoppingCartGoodsCode)
          this.orderDetailGoodsNums.push(this.list[i].shoppingCartGoodsNum)
        }
      }
      if(flag){
        this.Allchecked = true
      }
      else{
         this.Allchecked = false
      }
      this.total = this.gettotal()
      console.log(this.listId)
      console.log(this.list)
    },
    add(item){
      item.shoppingCartGoodsNum ++
      this.total = this.gettotal()
    },
    cut(item){
      if(item.shoppingCartGoodsNum > 0){
        item.shoppingCartGoodsNum --
         this.total = this.gettotal()
      }
      else{  
        item.shoppingCartGoodsNum = 0  
         this.total = this.gettotal()
      }  
    },
    all(){
      this.Allchecked = !this.Allchecked
      this.list.forEach(item=>{
        item.checked = this.Allchecked
      })
       if(this.Allchecked === true){
         this.listId = []
         for(var i = 0; i < this.list.length; i++){
           this.listId.push(this.list[i].shoppingCartId)
         }
       }else{
         this.listId = []
       }
       this.total = this.gettotal()
    },
    gettotal(){
      let total = 0
      this.list.forEach(item=>{
        if(item.checked){
          total = total + parseFloat(item.shoppingCartGoodsNum * item.goodsSalePrice)
        }
      })
      return parseFloat(total.toFixed(2))
    },
    Delete(){
      if(this.listId.length <= 0)
        return this.$message.warning('请至少选择一条数据')
      for(var i = 0 ; i < this.list.length ; i++ ){
         for(var j = 0 ; j < this.listId.length ; j++){
           if(this.list[i].shoppingCartId === this.listId[j]){
             this.list[i].checked = false
           }
         }
      } 
       this.$confirm('是否要删除选中的商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then(() => {
           req('deleteShoppingCart',{
            shoppingCartIds:this.listId.join(',')
          }).then(res=>{
            if(res.code != 1) return this.$message.error(res.msg)
              this.$message.success('删除成功')
              this.getShop()
              this.total = this.gettotal()
              this.listId = []
          })  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      // console.log(this.listId)  
    },
    accounts(){
      if(this.listId.length <= 0)
        return this.$message.warning('请选择您要结算的商品')
      if(!JSON.parse(sessionStorage.getItem('userInfo')).storeInvitationCode){
         this.$router.push({path: '/change-store-code'})
         return this.$message.error('请先绑定店铺邀请码，在进行购买')
      }
      req('addOrder',{
        orderClientCode:window.sessionStorage.getItem('userId'),
        orderDetailGoodsCodes:this.orderDetailGoodsCodes.join(','),
        orderDetailGoodsNums:this.orderDetailGoodsNums.join(','),
        orderStoreCode:JSON.parse(sessionStorage.getItem('userInfo')).storeId,
        shoppingCartIds:this.listId.join(','),
      }).then(res=>{
        if(res.code != 1) return console.log('失败')
           this.$router.push({path: '/order-list'})
      })
       
    },
    kongbtn(){
       this.$router.push({path: '/comm-home'})
    }
  }
}
</script>


<style lang="scss" scoped>
.kong{
     margin-top: 180px;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     div{
       margin-bottom: 15px;
     }
     button{
       width: 80px;
       height: 30px;
     }
}
.container {
  padding-bottom: 110px;
  
}
  .book-list {
    width: 100%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;  
        >img {
          height: 80%;
          width: 90px;
          vertical-align: middle;
          align-self: center;
          margin-left: 5px;
        }
 
        >div {
          > div:first-child {
            float: right;
            font-size: 14px;
            width: 100%;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
          }
          // > div:nth-child(2) {
          //   font-size: 14px;
          //   width: 100%;
          //   height: 30px;
          //   padding-left: 10px;
          //   box-sizing: border-box;
          //   color: #ddd;
          // }
          /deep/ .change_box{
            padding-top: 30px;
          }
          > div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;

      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 80px;
      height: 40px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 40px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 20px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}
</style>

