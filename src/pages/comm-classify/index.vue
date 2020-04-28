<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.goodsCateId === commListid.goodsCateId}" v-for="item in oneList" :key="item.goodsCateId" @click="getTwoList(item)">
        <b></b>
        <span>{{item.cateName}}</span>
      </li>
      <!-- <li>
        <b></b>
        <span>任务传记</span>
      </li>
      <li>
        <b></b>
        <span>世界名著</span>
      </li>
      <li>
        <b></b>
        <span>教育</span>
      </li> -->
    </ul>
 <!-- <li :class="{active: item.classifyId === currentClassify.classifyId}" v-for="(item, index) in oneClassifyList" :key="index" @click="getTwoClassify(item)"> -->
    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index" v-show="item.goodsList.length">
        <div class="book-classify-item-title">{{item.cateName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodsList" :key="childIndex" @click="getCommDetail(childItem.goodsId)">
            <img :src="childItem.imageUrl" alt="">
            <div>{{childItem.goodsName}}</div>
            <div>
              ￥{{childItem.goodsSalePrice}}
              <span>￥{{childItem.goodsFixPrice}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      oneList:[],
      commListid:{},
      commList: [
        // {
        //   classifyId: '',
        //   classifyName: '小说',
        //   goodsList: [
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     }
        //   ]
        // },
        // {
        //   classifyId: '',
        //   classifyName: '散文',
        //   goodsList: [
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     },
        //     {
        //       goodsId: '',
        //       goodsImagePath: './image/book1.jpg',
        //       goodsName: '迪士尼爱与梦想绘本',
        //       goodsPrice: '131.30'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted(){
   this.getoneList()
  },
  methods: {
    getCommDetail (data) {
      console.log(data)
      this.$store.commit('getHotgoodsId', data)
      this.$router.push({path: '/comm-detail'})
    },
    getoneList(){
      req('listGoodsByGoodsCateCode').then(res=>{
        if(res.code != 1) return console.log('失败')
          console.log('成功')
          console.log(res)
          this.oneList = res.data
          this.commListid = this.oneList[0]
          console.log(this.commListid)
          this.getTwoList(this.commListid)
      })
    },
    getTwoList(data){
      this.commListid = data
       req('twolist',{
         goodsCateCode:data.goodsCateId
       }).then(res=>{
        if(res.code != 1) return console.log('失败')
          console.log('成功')
          console.log(res)
          this.commList = res.data
          // this.oneList = res.data
          // this.commListid = this.oneList[0]
          // console.log(this.commListid)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ddd;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: rgb(197, 156, 104);
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 60px;
    overflow: auto;
    width: 78%;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 65%;
            height: 110px;
          }

          div:nth-child(2) {
            font-size: 12px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 15px;
            font-weight: bold;

            span {
              // color: #ddd;
              color: black;
              font-weight: normal;
              font-size: 11px;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>
