Page({
  data: {
    datalist: [],
  },

  getData(num=5,page=0) {
    wx.cloud.callFunction({
      name: "demogetlist",
      data:{
        num:num,
        page:page
      }
    }).then(res => {
      var oldData=this.data.datalist
      var newData=oldData.concat(res.result.data);
      console.log(res.result.data)
      this.setData({
        datalist: newData
      })
    })
  },
  
  onLoad: function (options) {
    this.getData();
  },
// 触底
  onReachBottom:function(){
    var page=this.data.datalist.length
  this.getData(5,page)//5为每次刷新的次数
  },

  //下单的函数
  clickToOrder: function (e) {
    var orderId = e.currentTarget.id;
    getApp().globalData.orderCloudId = orderId;
    console.log(getApp().globalData.orderCloudId);
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