import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  listStoreOrders:{
    url:'/app/manager/listStoreOrders',
    method: 'post',
  },
  findStoreOrderDetail:{
    url:'/app/manager/findStoreOrderDetail',
    method: 'post',
  },
  updateStoreOrderCondition:{
    url:'/app/manager/updateStoreOrderCondition',
    method: 'post',
  },
  listOrdersById:{
    url:'app/client/listOrdersById',
    method: 'post',
  },
  updateOrderCondition:{
    url:'app/client/updateOrderConditionById',
    method: 'post',
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request