Page({

  data: {
    nickName: "微信昵称",
    phoneNo: "11111111111",
    address: "北京市昌平区",
    status: "我的订单",
    List: 7,//实例展示
    zhuangtai: "weijichu",
  },

  changeStatusAboutHuiNong: function(){
    this.setData({
      status: "关于惠农"
    })
  },

  changeStatusMine: function(){
    this.setData({
      status: "我的订单"
    })
  },

  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  onLoad: function () {
  },

  buyerIndexPage: function(){
    wx.redirectTo({
      url: '../buyerIndex/buyerIndex',
    })
  },

  buyerAddressPage: function(){
    wx.navigateTo({
      url: '../buyerAddress/buyerAddress',
    })
  }
})