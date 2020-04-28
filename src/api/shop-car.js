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
  listShoppingCartsById:{
    url:'/app/client/listShoppingCartsById',
    method: 'post',
  },
  deleteShoppingCart:{
    url:'app/client/deleteShoppingCartById',
    method: 'post',
  },
  addOrder:{
    url:'/app/client/addOrder',
    method: 'post',
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request