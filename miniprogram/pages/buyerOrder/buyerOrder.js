var no

Page({
  data: {
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
    identify: "",
    number: "",
    price: "",
    time: ""
  },

  onLoad: function () {
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
            no = index;
            this.setData({
              address: res.data[index].address,
              amount: res.data[index].amount,
              goodsname: res.data[index].goodsname,
              identify: res.data[index].identify,
              number: res.data[index].number,
              price: res.data[index].price,
              time: res.data[index].time
            })
          }
        }
      })
  },

  onShow(){
    this.onLoad();
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