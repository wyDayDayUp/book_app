<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="act1" @click="Act1()">全部评价</span>
      <span :class="act2" @click="Act2()">好评</span>
      <span :class="act3" @click="Act3()">中评</span>
      <span :class="act4" @click="Act4()">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="item in list" :key="item.goodsCommentId">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userName}}</div>
              <div class="date">{{item.goodsCommentTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.goodsCommentStar*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.goodsComment}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'
import axios from 'axios'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      act1:'active',
      act2:'',
      act3:'',
      act4:'',
      type:-1,
      List:[
         {
                                goodsCommentGoodsCode: 'test1',
                                goodsComment:'goodsComment1',
                                goodsCommentStar:5
                              },
                              {
                  goodsCommentGoodsCode: 'test2',
                                goodsComment:null,
                                goodsCommentStar:0
                              }
      ],
      list: [
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '3',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '2',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '5',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // },
        // {
        //   userAcct: 'Cvita Doleschall',
        //   evaluateContent: '这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容这是一段评价内容',
        //   evaluateScore: '1',
        //   createTime: '2020-01-01 11:11:11',
        //   imageList: []
        // }
      ]
    }
  },
  mounted(){
    this.getlistGoodsComments()
    //  axios({
    //     method: 'post',
    //     url:'http://299z2526w7.wicp.vip/app/client/addGoodsCommentsByGoodsId',
    //     data:
    //        JSON.stringify({
    //        clientId:"111",  
    //        goodsCommentList:this.List
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json;',
    //       Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).access_token
    //     }
    //   }).then(res=>{
    //     if(res.code != 1) return console.log('失败')
    //       console.log('成功')
    //   })
  },
  methods:{
    getlistGoodsComments(){
        req('listGoodsComments',{
        pageNum:1,
        pageSize:100,
        goodsCommentGoodsCode:this.$store.state.HotgoodsId,
        goodsCommentStar:this.type
      }).then(res=>{
        if(res.code != 1) return console.log('失败')
          console.log('成功')
          console.log(res)
          this.list = res.data.list
      })
    },
    Act1(){
      this.act1 = 'active'
      this.act2 = ''
      this.act3 = ''
      this.act4 = ''
      this.type = -1
      this.getlistGoodsComments()
    },
    Act2(){
      this.act1 = ''
      this.act2 = 'active'
      this.act3 = ''
      this.act4 = ''
      this.type = 5
      this.getlistGoodsComments()
    },
    Act3(){
      this.act1 = ''
      this.act2 = ''
      this.act3 = 'active'
      this.act4 = ''
      this.type = 3
      this.getlistGoodsComments()
    },
    Act4(){
      this.act1 = ''
      this.act2 = ''
      this.act3 = ''
      this.act4 = 'active'
      this.type = 1
      this.getlistGoodsComments()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
   min-height: 616px;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #ddd;
    margin: 0 auto;
    border-radius: 10px;
    padding-bottom: 20px;
    li {
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      margin-bottom: 10px;
      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
              margin-top: 5px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
