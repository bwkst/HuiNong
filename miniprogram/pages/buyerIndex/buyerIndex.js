// pages/buyerIndex/buyerIndex.js
Page({
  data: {
    List: 7,//实例展示
  },

  //下单的函数
  clickToOrder: function(){
    wx.navigateTo({
      url: "../buyerOrder/buyerOrder",
    })
  },

  //获取卖家联系方式的函数
  clickToGetContact: function(){
    wx.showModal({
      title: '卖家的联系方式',
      content: '暂无',
      showCancel:false,
    })
  },


  onLoad(options) {
    //设定导航栏的地址
    wx.setTabBarItem({
      index: 0,
      "pagePath": "pages/buyerIndex/buyerIndex"
    }),
    wx.setTabBarItem({
      index: 1,
      "pagePath": "pages/buyerCenter/buyerCenter"
    })
  }
})