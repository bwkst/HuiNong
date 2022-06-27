// pages/sellerCenter/sellerCenter.js
Page({

  data: {
    nickName: "微信昵称",
    phoneNo: "11111111111",
    status: "我的发布",
    List: 7,//实例展示
    iconURL: "",
  },

  //点击发布商品按钮
  postgoods: function (e) {
    wx.navigateTo({
      url: '/pages/fabushangpin/fabushangpin',
    })
  },

  changeStatusAboutHuiNong: function(){
    this.setData({
      status: "关于惠农"
    })
  },

  changeStatusMine: function(){
    this.setData({
      status: "我的发布"
    })
  },

  change: function(){
    wx.navigateTo({
      url: '../dingdanxiugai/dingdanxiugai',
    })
  },

  loginPage: function (e) {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  onLoad: function () {
    this.setData({
      nickName: getApp().globalData.userInfo.nickName,
      iconURL: getApp().globalData.userInfo.avatarUrl,
    })
  },

  sellerIndexPage: function(){
    wx.redirectTo({
      url: '../sellerIndex/sellerIndex',
    })
  }
})