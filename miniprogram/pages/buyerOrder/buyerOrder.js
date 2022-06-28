var oPrice;
var oAddress;
var oTime;
var newAmount;

Page({
  data: {
    submitStatus: "不可提交",

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
        },
      })
    }, 2000);
    clearTimeout();
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
    oPrice = this.data.orderAmount * this.data.price;
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
    if (Number(e.detail.value) <= Number(this.data.amount) && e.detail.value > 0 && !isNaN(e.detail.value)) {
      that.setData({
        orderAmount: e.detail.value,
        submitStatus: "可提交"
      })
      that.calPrice();
    } else if (e.detail.value == 0 || isNaN(e.detail.value)) {
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

  centerPage: function () {
    wx.redirectTo({
      url: '../buyerCenter/buyerCenter',
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
    console.log(new Date().toLocaleDateString());
    console.log(new Date().toLocaleTimeString());
    oTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
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

  addOrder: function(){
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
            that.centerPage();
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