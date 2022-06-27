// pages/buyerOrder/buyerOrder.js
Page({
  data: {
    deliveryName: "",
    deliveryPhoneNo: "",
    deliveryRegion: "",
    deliverySheng: "",
    deliveryShi: "",
    deliveryQu: "",
    deliveryAddress: "",
  },

  centerPage: function(){
    wx.redirectTo({
      url: '../buyerCenter/buyerCenter',
    })
  },

  buyerAddress: function(){
    wx.navigateTo({
      url: '../buyerAddress/buyerAddress',
    })
  }
})