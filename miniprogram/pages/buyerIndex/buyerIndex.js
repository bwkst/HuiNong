Page({
  data: {
    datalist: "",
  },

  getData() {
    wx.cloud.callFunction({
      name: "demogetlist"
    }).then(res => {
      console.log(res.result.data)
      this.setData({
        datalist: res.result.data
      })
    })
  },
  
  onLoad: function (options) {
    this.getData();
  },

  //下单的函数
  clickToOrder: function (e) {
    var orderId = e.currentTarget.id;
    getApp().globalData.userInfo = orderId;
    console.log(getApp().globalData.userInfo);
    wx.navigateTo({
      url: "../buyerOrder/buyerOrder",
    })
  },

  //获取卖家联系方式的函数
  clickToGetContact: function (e) {
    var sellPhoneNum = e.currentTarget.id;
    wx.showModal({
      title: '卖家的联系方式',
      content: '暂无',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setClipboardData({
            data: sellPhoneNum,   //云数据库中该订单的卖家手机号
            success: (res) => {
              wx.showModal({
                title: '卖家信息已复制到剪贴板中',
                content: '',
                showCancel: false,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  buyerCenterPage: function () {
    wx.redirectTo({
      url: '../buyerCenter/buyerCenter',
    })
  }
})