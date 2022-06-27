var id;
var num;

Page({
  data: {
    deliveryName: "",         //数据库内的值
    deliveryPhoneNo: "",
    deliveryRegion: "",
    deliverySheng: "",
    deliveryShi: "",
    deliveryQu: "",
    deliveryAddress: "",

    newDeliveryName: "",        //修改中的值
    newDeliveryPhoneNo: "",
    newDeliveryRegion: "",
    newDeliverySheng: "",
    newDeliveryShi: "",
    newDeliveryQu: "",
    newDeliveryAddress: "",

    showDeliveryName: "",        //纯显示的值
    showDeliveryPhoneNo: "",
    showDeliveryRegion: "",
    showDeliverySheng: "",
    showDeliveryShi: "",
    showDeliveryQu: "",
    showDeliveryAddress: "",

    customItem: '全部',
    status: "显示",
  },

  onLoad: function () {
    console.log(getApp().globalData.phonenumber);
    wx.cloud.database().collection('buyerAddress')
      .get()
      .then(res => {
        console.log("Test1", res.data.length);
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].identifyPhoneNo == getApp().globalData.phonenumber) {
            console.log("Test2")
            num = index;
            this.setData({
              deliveryName: res.data[index].deliveryName,
              deliveryPhoneNo: res.data[index].deliveryPhoneNo,
              deliveryRegion: res.data[index].deliveryRegion,
              deliverySheng: res.data[index].deliverySheng,
              deliveryShi: res.data[index].deliveryShi,
              deliveryQu: res.data[index].deliveryQu,
              deliveryAddress: res.data[index].deliveryAddress,
            })
            console.log(this.data);
            this.newDelivery();
          }
        }
      })
  },

  newDelivery: function () {
    if (this.data.deliveryName == "") {
      this.setData({
        newDeliveryName: '未输入收货人',
        showDeliveryName: '未输入收货人'
      })
    } else {
      this.setData({
        newDeliveryName: this.data.deliveryName,
        showDeliveryName: this.data.deliveryName
      })
    };
    if (this.data.deliveryPhoneNo == "") {
      this.setData({
        newDeliveryPhoneNo: '未输入收货手机号',
        showDeliveryPhoneNo: '未输入收货手机号'
      })
    } else {
      this.setData({
        newDeliveryPhoneNo: this.data.deliveryPhoneNo,
        showDeliveryPhoneNo: this.data.deliveryPhoneNo
      })
    };
    if (this.data.deliveryRegion == "") {
      this.setData({
        newDeliveryRegion: '未输入收货地区',
        showDeliveryRegion: '未输入收货地区'
      })
    } else {
      this.setData({
        newDeliveryRegion: this.data.deliveryRegion,
        showDeliveryRegion: this.data.deliveryRegion
      })
    };
    if (this.data.deliverySheng == "") {
      this.setData({
        newDeliverySheng: '未输入收货省',
        showDeliverySheng: '未输入收货省'
      })
    } else {
      this.setData({
        newDeliverySheng: this.data.deliverySheng,
        showDeliverySheng: this.data.deliverySheng
      })
    };
    if (this.data.deliveryShi == "") {
      this.setData({
        newDeliveryShi: '未输入收货市',
        showDeliveryShi: '未输入收货市'
      })
    } else {
      this.setData({
        newDeliveryShi: this.data.deliveryShi,
        showDeliveryShi: this.data.deliveryShi
      })
    };
    if (this.data.deliveryQu == "") {
      this.setData({
        newDeliveryQu: '未输入收货区',
        showDeliveryQu: '未输入收货区'
      })
    } else {
      this.setData({
        newDeliveryQu: this.data.deliveryQu,
        showDeliveryQu: this.data.deliveryQu
      })
    };
    if (this.data.deliveryAddress == "") {
      this.setData({
        newDeliveryAddress: '未输入详细地址',
        showDeliveryAddress: '未输入详细地址'
      })
    } else {
      this.setData({
        newDeliveryAddress: this.data.deliveryAddress,
        showDeliveryAddress: this.data.deliveryAddress
      })
    };
  },

  haveChange: function () {
    if (this.data.newDeliveryName == this.data.deliveryName && this.data.newDeliveryPhoneNo == this.data.deliveryPhoneNo && this.data.newDeliverySheng == this.data.deliverySheng && this.data.newDeliveryShi == this.data.deliveryShi && this.data.newDeliveryQu == this.data.deliveryQu && this.data.newDeliveryAddress == this.data.deliveryAddress) {
      this.setData({
        status: "修改中"
      })
    } else {
      this.setData({
        status: "修改完成"
      })
    }
  },

  haveChangeName: function (e) {
    this.setData({
      newDeliveryName: e.detail.value
    })
    this.haveChange();
  },

  haveFocusName: function (e) {
    this.setData({
      newDeliveryName: " "
    })
  },

  haveChangePhoneNo: function (e) {
    this.setData({
      newDeliveryPhoneNo: e.detail.value
    })
    this.haveChange();
  },

  haveFocusPhoneNo: function (e) {
    this.setData({
      newDeliveryPhoneNo: " "
    })
  },

  haveChangeRegion: function (e) {
    this.setData({
      newDeliveryRegion: e.detail.value,
      newDeliverySheng: e.detail.value[0],
      newDeliveryShi: e.detail.value[1],
      newDeliveryQu: e.detail.value[2],
    })
    this.haveChange();
  },

  haveChangeAddress: function (e) {
    this.setData({
      newDeliveryAddress: e.detail.value
    })
    this.haveChange();
  },

  haveFocusAddress: function (e) {
    this.setData({
      newDeliveryAddress: " "
    })
  },

  submitChange: function () {
    wx.cloud.database().collection('buyerAddress')
      .where({
        identifyPhoneNo: getApp().globalData.phonenumber
      })
      .get()
      .then(res => {
        id = res.data[num]._id;
        console.log(id);
        wx.cloud.database().collection('buyerAddress')
          .doc(id)
          .update({
            data: {
              deliveryName: this.data.newDeliveryName,
              deliveryPhoneNo: this.data.newDeliveryPhoneNo,
              deliveryRegion: this.data.newDeliveryRegion,
              deliverySheng: this.data.newDeliverySheng,
              deliveryShi: this.data.newDeliveryShi,
              deliveryQu: this.data.newDeliveryQu,
              deliveryAddress: this.data.newDeliveryAddress
            }
          })
        this.onLoad();
        this.setData({
          status: "显示"
        })
      });
  },

  return: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  changeInfo: function () {
    this.setData({
      status: "修改中"
    })
  },

  cancelChange: function () {
    this.setData({
      status: "显示"
    })
  }
})