// pages/sellerIndex/sellerIndex.js
Page({
  data: {
    zhuangtai: "weijichu",
    List: 7,          //示例展示
  },

  onLoad() {
  },

  sellerCenterPage: function () {
    wx.redirectTo({
      url: '../sellerCenter/sellerCenter',
    })
  }
})