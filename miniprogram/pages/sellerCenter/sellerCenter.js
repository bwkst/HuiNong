// pages/sellerCenter/sellerCenter.js
Page({

  data: {
    nickName: "微信昵称",
    phoneNo: "11111111111",
    status: "我的发布",
    List: 7,//实例展示
    iconURL: "",
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