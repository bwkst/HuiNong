var oPrice;
var oAddress;
var oTime;
var newAmount;

Page({
  data: {
    submitStatus: "不可提交",

    showSellerNo: "",

    deliveryName: "",
    deliveryPhoneNo: "",
    deliveryRegion: "",
    deliverySheng: "",
    deliveryShi: "",
    deliveryQu: "",
    deliveryAddress: "",

    address: "",
    amount: "",
    goodsname: "",
    number: "",
    price: "",
    time: "",

    orderSellerPhoneNo: "",
    orderGoodsName: "",
    orderAmount: "",
    orderPrice: "",
    orderExpressNo: "",
    orderStatus: "",
    orderBuyerPhoneNo: "",
    orderDeliveryPhoneNo: "",
    orderTime: "",

    addressWarning: ""
  },

  checkAddress: function () {
    var that = this;
    if (this.data.deliveryName == "" || this.data.deliveryPhoneNo == "" || this.data.deliveryRegion == "" || this.data.deliverySheng == "" || this.data.deliveryShi == "" || this.data.deliveryQu == "" || this.data.deliveryAddress == "") {
      that.setData({
        addressWarning: "请使用有效地址下单"
      })
    } else {
      that.setData({
        addressWarning: ""
      })
    }
  },

  onLoad: function () {
    wx.showLoading({
      title: '创建订单中',
    });
    console.log(getApp().globalData.phonenumber);
    wx.cloud.database().collection('buyerAddress')
      .get()
      .then(res => {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].identifyPhoneNo == getApp().globalData.phonenumber) {
            this.setData({
              deliveryName: res.data[index].deliveryName,
              deliveryPhoneNo: res.data[index].deliveryPhoneNo,
              deliveryRegion: res.data[index].deliveryRegion,
              deliverySheng: res.data[index].deliverySheng,
              deliveryShi: res.data[index].deliveryShi,
              deliveryQu: res.data[index].deliveryQu,
              deliveryAddress: res.data[index].deliveryAddress,
            })
          }
        }
      })

    console.log(getApp().globalData.orderCloudId);
    wx.cloud.database().collection('orderform')
      .get()
      .then(res => {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index]._id == getApp().globalData.orderCloudId) {
            console.log("Test2")
            this.setData({
              address: res.data[index].address,
              amount: res.data[index].amount,
              goodsname: res.data[index].goodsname,
              number: res.data[index].number,
              price: res.data[index].price,
              time: res.data[index].time
            })
          }
        }
      })
    var that = this;
    setTimeout(function () {
      wx.hideLoading({
        success: () => {
          that.createOrder();
          that.checkAddress();
          that.getSellerNo();
        },
      })
    }, 2000);
    clearTimeout();
  },

  getSellerNo: function () {
    var getSellerNumber = this.data.number.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
    this.setData({
      showSellerNo: getSellerNumber
    })
  },

  createOrder: function () {
    this.setData({
      orderSellerPhoneNo: this.data.number,
      orderGoodsName: this.data.goodsname,
      orderAmount: "请输入购买数量",
      orderPrice: "",
      orderExpressNo: "",
      orderStatus: "未发货",
      orderBuyerPhoneNo: getApp().globalData.phonenumber,
      orderDeliveryAddress: "",
      orderDeliveryPhoneNo: this.data.deliveryPhoneNo,
      orderTime: "",
    })
    this.calPrice();
    this.setAddress();
  },

  setAddress: function () {
    oAddress = this.data.deliverySheng + this.data.deliveryShi + this.data.deliveryQu + this.data.deliveryAddress
  },

  calPrice: function () {
    oPrice = (this.data.orderAmount * this.data.price).toFixed(2);
    this.setData({
      orderPrice: oPrice,
    })
  },

  haveFocusNum: function () {
    this.setData({
      orderAmount: ""
    })
  },

  changeAmount: function (e) {
    var that = this;
    if (Number(e.detail.value) <= Number(this.data.amount) && e.detail.value > 0) {
      that.checkAddress()
      if (that.data.addressWarning == "") {
        that.setData({
          orderAmount: e.detail.value,
          submitStatus: "可提交"
        })
        that.calPrice();
      } else {
        wx.showModal({
          title: "请使用有效地址下单",
          content: '是否需要填写地址',
          showCancel: true,
          cancelText: "否",
          confirmText: "是",
          success: (res) => {
            if (res.confirm) {
              that.buyerAddress();
            }
          }
        })
      };
    } else if (e.detail.value == 0) {
      wx.showModal({
        title: '请输入有效数量',
        content: '请重新输入',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            that.setData({
              orderAmount: "请输入购买数量",
              submitStatus: "不可提交"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '卖家库存剩余' + this.data.amount,
        content: '请重新输入',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            that.setData({
              orderAmount: "请输入购买数量",
              submitStatus: "不可提交"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  onShow() {
    this.onLoad();
  },

  indexPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  updateAmount: function () {
    newAmount = this.data.amount - this.data.orderAmount;
    wx.cloud.database().collection('orderform')
      .doc(getApp().globalData.orderCloudId)
      .update({
        data: {
          amount: newAmount,
          time: oTime,
        }
      });
  },

  getTime: function () {
    oTime = String(new Date().getFullYear()) + "/" + String(new Date().getMonth() + 1) + "/" + String(new Date().getDate()) + " - " + String(new Date().getHours()) + ":" + String(new Date().getMinutes()) + ":" + String(new Date().getSeconds())
  },

  submitOrder: function () {
    var that = this;
    that.getTime();
    wx.showLoading({
      title: '下单中',
    });
    setTimeout(function () {
      that.addOrder();
    }, 2000);
    clearTimeout();
  },

  addOrder: function () {
    var that = this;
    console.log(that.data.orderSellerPhoneNo);
    console.log(that.data.orderGoodsName);
    console.log(that.data.orderAmount);
    console.log(that.data.orderPrice);
    console.log(that.data.orderExpressNo);
    console.log(that.data.orderStatus);
    console.log(that.data.orderBuyerPhoneNo);
    console.log(oAddress);
    console.log(that.data.orderDeliveryPhoneNo);
    console.log(oTime);
    wx.cloud.database().collection('buyerOrder')
      .add({
        data: {
          orderSellerPhoneNo: that.data.orderSellerPhoneNo,
          orderGoodsName: that.data.orderGoodsName,
          orderAmount: that.data.orderAmount,
          orderPrice: that.data.orderPrice,
          orderExpressNo: that.data.orderExpressNo,
          orderStatus: that.data.orderStatus,
          orderBuyerPhoneNo: that.data.orderBuyerPhoneNo,
          orderDeliveryAddress: oAddress,
          orderDeliveryPhoneNo: that.data.orderDeliveryPhoneNo,
          orderTime: oTime,
        }
      })
      .then(res => {
        console.log('添加成功')
        setTimeout(function () {
          that.updateAmount();
        }, 2000);
        clearTimeout();
        wx.hideLoading({
          success: () => {
            that.indexPage();
          },
        })
      })
      .catch(err => {
        console.log('添加失败', err)
      })
  },

  buyerAddress: function () {
    wx.navigateTo({
      url: '../buyerAddress/buyerAddress',
    })
  }
})