<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" >
        <el-carousel-item v-for="item in picList" :key="item.rollImageId">
          <img :src="item.imageUrl" alt="" @click="imgpage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
<!-- indicator-position="none" -->
    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="item in commList"
        :key="item.goodsId"
        @click="toDetailPage(item.goodsId)">
        <img :src="item.imageUrl" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>
          <div>￥{{item.goodsSalePrice}}</div>
          <div>￥{{item.goodsFixPrice}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'
export default {
  name: 'comm-home',
  data () {
    return {
      picList: [
        // '../../../static/assets/u159.jpg',
        // '../../../static/assets/u161.jpg',
        // '../../../static/assets/u157.jpg'
      ],
      commList: [
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // },
        // {
        //   goodsId: '1',
        //   goodsName: '迪士尼爱与梦想绘本（套装共15册）[3-6岁]',
        //   goodsImagePath: '../../assets/book1.jpg',
        //   goodsPrice: '￥154.50'
        // }
      ]
    }
  },
  mounted(){
    req('listRollImages').then(res=>{
      if(res.code != 1) return console.log('失败')
        console.log('成功')
        console.log(res)
        this.picList = res.data
    })
    req('listHotGoods').then(res=>{
      if(res.code != 1) return console.log('失败')
        console.log('成功')
        console.log(res)
        this.commList = res.data
    })
  },
  methods: {
    toDetailPage (data) {
      console.log(data)
      this.$store.commit('getHotgoodsId', data)
      this.$router.push({path: '/comm-detail'})
    },
    imgpage(data){
      console.log(data)
       this.$store.commit('getHotgoodsId', data.rollImageGoodsCode)
     this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  margin-top: 10px;
}
/deep/ .book-info{
  text-align: center;
  margin-right: 8px;
}
.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  // margin-top: 10px;
  // /deep/ li:last-child{
  //   margin-left: 5px;
  // }
  li {
    width: 47%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 5px 10px;
    border-radius: 10px;

    img {
      display: block;
      width: 80%;
      height: 150px;
      margin: 0 auto;
    }

    div:nth-child(2) {
      font-size: 13px;
      padding-left: 15px;
      padding-top: 3px;
    }

    div:nth-child(3) {
      display: flex;
      align-items: center;
      margin-left: 15px;
       div:nth-child(1){
          font-size: 16px;
         
          margin-top: 5px;
          color: red;
       }
        div:nth-child(2){
           margin-top: 4px;
           font-size: 12px;
           text-decoration: line-through;
        }
    }
  }
}
</style>
