Page({
  data: {
    zhuangtai:'weijichu',
    List:7
  },


  sellerCenterPage: function () {
    wx.redirectTo({
      url: '../sellerCenter/sellerCenter',
    })
  }
})