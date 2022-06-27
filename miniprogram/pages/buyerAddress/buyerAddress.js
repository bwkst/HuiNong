// pages/buyerAddress/buyerAddress.js
Page({
  data: {
    deliveryName: "",
    deliveryPhoneNo: "",
    deliveryRegion: "",
    deliverySheng: "",
    deliveryShi: "",
    deliveryQu: "",
    deliveryAddress: "",
    customItem: '全部',
    status: "显示",
  },

  onLoad: function () {
    this.setData({            //从数据库拉下来
      deliveryName: "未输入收货人",
      deliveryPhoneNo: "未输入收货手机号",
      deliveryRegion: "未输入收货地区",
      deliverySheng: "未输入收货省",
      deliveryShi: "未输入收货市",
      deliveryQu: "未输入收货区",
      deliveryAddress: "未输入收货详细地址",
      customItem: '全部',
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      deliveryRegion: e.detail.value,
      deliverySheng: e.detail.value[0],
      deliveryShi: e.detail.value[1],
      deliveryQu: e.detail.value[2]
    })
    this.haveChange();
  },

  haveChange: function () {           //目前的修改数据是否和数据库内数据对比，有区别才可以提交修改
    //下方condition需改
    if (DatabaseName != this.data.deliveryName) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabasePhoneNo != this.data.deliveryPhoneNo) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabaseRegion != this.data.deliveryRegion) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabaseSheng != this.data.deliverySheng) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabaseShi != this.data.deliveryShi) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabaseQu != this.data.deliveryQu) {
      this.setData({
        status: "修改完成"
      })
    } else if (DatabaseAddress != this.data.deliveryAddress) {
      this.setData({
        status: "修改完成"
      })
    } else {
      this.setData({
        status: "修改中"
      })
    }
  },

  return: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  changeInfo: function () {
    this.setData({
      status: "修改中"
    })
  },

  submitChange: function () {
    this.setData({
      status: "修改完成"
    })
    //更新数据库
  },

  cancelChange: function () {
    this.setData({
      status: "显示"
    })
  }
})